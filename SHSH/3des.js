function encrypt_3DES(textToencrypt, key, iv, mode, padding, hexkey, hexiv, hextext, hexresult) {
    if (typeof(mode) == "undefined") {
        mode = 0;
    }
    if (typeof(mode) == "string") {
        if (mode == "") {
            mode = 0
        } else {
            mode = parseInt(mode);
        }
    }
    if (mode >= 6) {
        mode = 0;
    }
    if (mode <= -1) {
        mode = 0;
    }
    if (typeof(padding) == "undefined") {
        padding = 0;
    }
    if (typeof(padding) == "string") {
        if (padding == "") {
            padding = 0
        } else {
            padding = parseInt(padding);
        }
    }
    if (padding > 5) {
        padding = 0;
    }
    if (padding < 0) {
        padding = 0;
    }
    if (typeof(hexkey) == "undefined") {
        hexkey = 0;
    }
    if (typeof(hexkey) == "string") {
        if (hexkey == "") {
            hexkey = 0
        } else {
            hexkey = parseInt(hexkey);
        }
    }
    if (hexkey) {
        key = CryptoJS.enc.Hex.parse(key)
    } else {
        key = CryptoJS.enc.Utf8.parse(key)
    }
    if (typeof(hexiv) == "undefined") {
        hexiv = 0;
    }
    if (typeof(hexiv) == "string") {
        if (hexiv == "") {
            hexiv = 0
        } else {
            hexiv = parseInt(hexiv);
        }
    }
    if (hexiv) {
        iv = CryptoJS.enc.Hex.parse(iv)
    } else {
        iv = CryptoJS.enc.Utf8.parse(iv)
    }
    if (typeof(hextext) == "undefined") {
        hextext = 0;
    }
    if (typeof(hextext) == "string") {
        if (hextext == "") {
            hextext = 0
        } else {
            hextext = parseInt(hextext);
        }
    }
    if (hextext) {
        textToencrypt = Base64Encode(HexDecode(textToencrypt))
    }
    switch (mode) {
    case 0:
        switch (padding) {
        case 0:
            var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            break;
        case 1:
            var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.NoPadding
            });
            break;
        case 2:
            var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.ZeroPadding
            });
            break;
        case 3:
            var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Iso10126
            });
            break;
        case 4:
            var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Iso97971
            });
            break;
        case 5:
            var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.AnsiX923
            });
            break;
        }
        break;
    case 1:
        switch (padding) {
        case 0:
            var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            break;
        case 1:
            var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.NoPadding
            });
            break;
            case 2 : var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.ZeroPadding
            });
            break;
        case 3:
            var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Iso10126
            });
            break;
        case 4:
            var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Iso97971
            });
            break;
        case 5:
            var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.AnsiX923
            });
            break;
        }
        break;
    case 2:
        switch (padding) {
        case 0:
            var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CFB,
                padding: CryptoJS.pad.Pkcs7
            });
            break;
        case 1:
            var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CFB,
                padding: CryptoJS.pad.NoPadding
            });
            break;
        case 2:
            var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CFB,
                padding: CryptoJS.pad.ZeroPadding
            });
            break;
        case 3:
            var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CFB,
                padding: CryptoJS.pad.Iso10126
            });
            break;
        case 4:
            var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CFB,
                padding: CryptoJS.pad.Iso97971
            });
            break;
        case 5:
            var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CFB,
                padding: CryptoJS.pad.AnsiX923
            });
            break;
        }
        break;
    case 3:
        switch (padding) {
        case 0:
            var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.OFB,
                padding: CryptoJS.pad.Pkcs7
            });
            break;
        case 1:
            var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.OFB,
                padding: CryptoJS.pad.NoPadding
            });
            break;
        case 2:
            var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.OFB,
                padding: CryptoJS.pad.ZeroPadding
            });
            break;
        case 3:
            var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.OFB,
                padding: CryptoJS.pad.Iso10126
            });
            break;
        case 4:
            var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.OFB,
                padding: CryptoJS.pad.Iso97971
            });
            break;
        case 5:
            var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.OFB,
                padding: CryptoJS.pad.AnsiX923
            });
            break;
        }
        break;
    case 4:
        switch (padding) {
        case 0:
            var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CTR,
                padding: CryptoJS.pad.Pkcs7
            });
            break;
        case 1:
            var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CTR,
                padding: CryptoJS.pad.NoPadding
            });
            break;
        case 2:
            var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CTR,
                padding: CryptoJS.pad.ZeroPadding
            });
            break;
        case 3:
            var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CTR,
                padding: CryptoJS.pad.Iso10126
            });
            break;
        case 4:
            var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CTR,
                padding: CryptoJS.pad.Iso97971
            });
            break;
        case 5:
            var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CTR,
                padding: CryptoJS.pad.AnsiX923
            });
            break;
        }
        break;
    case 5:
        switch (padding) {
        case 0:
            var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CTRGladman,
                padding: CryptoJS.pad.Pkcs7
            });
            break;
        case 1:
            var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CTRGladman,
                padding: CryptoJS.pad.NoPadding
            });
            break;
        case 2:
            var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CTRGladman,
                padding: CryptoJS.pad.ZeroPadding
            });
            break;
        case 3:
            var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CTRGladman,
                padding: CryptoJS.pad.Iso10126
            });
            break;
        case 4:
            var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CTRGladman,
                padding: CryptoJS.pad.Iso97971
            });
            break;
        case 5:
            var encrypted = CryptoJS.TripleDES.encrypt(textToencrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CTRGladman,
                padding: CryptoJS.pad.AnsiX923
            });
            break;
        }
        break;
    }
    if (typeof(encrypted) == "undefined") {
        return mode + "  " + padding
    }
    if (typeof(hexresult) == "undefined") {
        hexresult = 0;
    }
    if (typeof(hexresult) == "string") {
        if (hexresult == "") {
            hexresult = 0
        } else {
            hexresult = parseInt(hexresult);
        }
    }
    if (hexresult) {
        return HexEncode(Base64Decode(encrypted.toString()))
    } else {
        return encrypted.toString()
    }
}
function decrypt_3DES(textTodecrypt, key, iv, mode, padding, hexkey, hexiv, hextext) {
    if (typeof(mode) == "undefined") {
        mode = 0;
    }
    if (typeof(mode) == "string") {
        if (mode == "") {
            mode = 0
        } else {
            mode = parseInt(mode);
        }
    }
    if (mode >= 6) {
        mode = 0;
    }
    if (mode <= -1) {
        mode = 0;
    }
    if (typeof(padding) == "undefined") {
        padding = 0;
    }
    if (typeof(padding) == "string") {
        if (padding == "") {
            padding = 0
        } else {
            padding = parseInt(padding);
        }
    }
    if (padding > 5) {
        padding = 0;
    }
    if (padding < 0) {
        padding = 0;
    }
    if (typeof(hexkey) == "undefined") {
        hexkey = 0;
    }
    if (typeof(hexkey) == "string") {
        if (hexkey == "") {
            hexkey = 0
        } else {
            hexkey = parseInt(hexkey);
        }
    }
    if (hexkey) {
        key = CryptoJS.enc.Hex.parse(key)
    } else {
        key = CryptoJS.enc.Utf8.parse(key)
    }
    if (typeof(hexiv) == "undefined") {
        hexiv = 0;
    }
    if (typeof(hexiv) == "string") {
        if (hexiv == "") {
            hexiv = 0
        } else {
            hexiv = parseInt(hexiv);
        }
    }
    if (hexiv) {
        iv = CryptoJS.enc.Hex.parse(iv)
    } else {
        iv = CryptoJS.enc.Utf8.parse(iv)
    }
    if (typeof(hextext) == "undefined") {
        hextext = 0;
    }
    if (typeof(hextext) == "string") {
        if (hextext == "") {
            hextext = 0
        } else {
            hextext = parseInt(hextext);
        }
    }
    if (hextext) {
        textToencrypt = Base64Encode(HexDecode(textTodecrypt))
    }
    switch (mode) {
    case 0:
        switch (padding) {
        case 0:
            var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            break;
        case 1:
            var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.NoPadding
            });
            break;
        case 2:
            var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.ZeroPadding
            });
            break;
        case 3:
            var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Iso10126
            });
            break;
        case 4:
            var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Iso97971
            });
            break;
        case 5:
            var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.AnsiX923
            });
            break;
        }
        break;
    case 1:
        switch (padding) {
        case 0:
            var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            break;
        case 1:
            var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.NoPadding
            });
            break;
            case 2 : var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.ZeroPadding
            });
            break;
        case 3:
            var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Iso10126
            });
            break;
        case 4:
            var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Iso97971
            });
            break;
        case 5:
            var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.AnsiX923
            });
            break;
        }
        break;
    case 2:
        switch (padding) {
        case 0:
            var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CFB,
                padding: CryptoJS.pad.Pkcs7
            });
            break;
        case 1:
            var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CFB,
                padding: CryptoJS.pad.NoPadding
            });
            break;
        case 2:
            var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CFB,
                padding: CryptoJS.pad.ZeroPadding
            });
            break;
        case 3:
            var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CFB,
                padding: CryptoJS.pad.Iso10126
            });
            break;
        case 4:
            var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CFB,
                padding: CryptoJS.pad.Iso97971
            });
            break;
        case 5:
            var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CFB,
                padding: CryptoJS.pad.AnsiX923
            });
            break;
        }
        break;
    case 3:
        switch (padding) {
        case 0:
            var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.OFB,
                padding: CryptoJS.pad.Pkcs7
            });
            break;
        case 1:
            var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.OFB,
                padding: CryptoJS.pad.NoPadding
            });
            break;
        case 2:
            var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.OFB,
                padding: CryptoJS.pad.ZeroPadding
            });
            break;
        case 3:
            var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.OFB,
                padding: CryptoJS.pad.Iso10126
            });
            break;
        case 4:
            var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.OFB,
                padding: CryptoJS.pad.Iso97971
            });
            break;
        case 5:
            var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.OFB,
                padding: CryptoJS.pad.AnsiX923
            });
            break;
        }
        break;
    case 4:
        switch (padding) {
        case 0:
            var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CTR,
                padding: CryptoJS.pad.Pkcs7
            });
            break;
        case 1:
            var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CTR,
                padding: CryptoJS.pad.NoPadding
            });
            break;
        case 2:
            var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CTR,
                padding: CryptoJS.pad.ZeroPadding
            });
            break;
        case 3:
            var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CTR,
                padding: CryptoJS.pad.Iso10126
            });
            break;
        case 4:
            var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CTR,
                padding: CryptoJS.pad.Iso97971
            });
            break;
        case 5:
            var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CTR,
                padding: CryptoJS.pad.AnsiX923
            });
            break;
        }
        break;
    case 5:
        switch (padding) {
        case 0:
            var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CTRGladman,
                padding: CryptoJS.pad.Pkcs7
            });
            break;
        case 1:
            var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CTRGladman,
                padding: CryptoJS.pad.NoPadding
            });
            break;
        case 2:
            var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CTRGladman,
                padding: CryptoJS.pad.ZeroPadding
            });
            break;
        case 3:
            var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CTRGladman,
                padding: CryptoJS.pad.Iso10126
            });
            break;
        case 4:
            var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CTRGladman,
                padding: CryptoJS.pad.Iso97971
            });
            break;
        case 5:
            var decrypted = CryptoJS.TripleDES.decrypt(textTodecrypt, key, {
                iv: iv,
                mode: CryptoJS.mode.CTRGladman,
                padding: CryptoJS.pad.AnsiX923
            });
            break;
        }
        break;
    }
    if (typeof(decrypted) == "undefined") {
        return mode + "  " + padding
    }
    return decrypted.toString(CryptoJS.enc.Utf8);
}
function HexEncode(str) {
    if (str === "") return "";
    var hexCharCode = [];
    for (var i = 0; i < str.length; i++) {
        hexCharCode.push((str.charCodeAt(i)).toString(16));
    }
    return hexCharCode.join("");
}
function HexDecode(hexCharCodeStr) {
    var rawStr = hexCharCodeStr.substr(0, 2).toLowerCase() === "0x" ? hexCharCodeStr.substr(2) : hexCharCodeStr;
    var len = rawStr.length;
    if (len % 2 !== 0) {
        return "";
    }
    var curCharCode;
    var resultStr = [];
    for (var i = 0; i < len; i = i + 2) {
        curCharCode = parseInt(rawStr.substr(i, 2), 16);
        resultStr.push(String.fromCharCode(curCharCode));
    }
    return resultStr.join("");
}
function Base64Encode(str) {
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}
function Base64Decode(str) {
    var base64DecodeChars = new Array( - 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
    var c1, c2, c3, c4;
    var i, len, out;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while ( i < len && c1 == - 1 );
        if (c1 == -1) break;
        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while ( i < len && c2 == - 1 );
        if (c2 == -1) break;
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if(c3 == 61) return out;
            c3 = base64DecodeChars[c3];
        } while ( i < len && c3 == - 1 );
        if (c3 == -1) break;
        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61) return out;
            c4 = base64DecodeChars[c4];
        } while ( i < len && c4 == - 1 );
        if (c4 == -1) break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}