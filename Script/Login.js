const body = document.querySelector('body');
let deg = 0;
setInterval(() => {
    body.style.background = `linear-gradient(${deg}deg, aqua,blue)`;
    body.style.backgroundSize = '100% 100%';
    deg = (deg + 1) % 360;
}, 15);
