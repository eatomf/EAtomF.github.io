const body = document.querySelector('body');
let deg = 0;
setInterval(() => {
    body.style.background = `linear-gradient(${deg}deg, blue, red)`;
    deg = (deg + 1) % 360;
}, 15)
