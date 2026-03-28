const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const startMenu = document.querySelector('.start-menu');
const startBtn = document.querySelector('#start-btn');

let isJumping = false;
let isGameOver = false;
let isGameStarted = false;
let loop = null;


const soundManager = {
    jump: new Audio('./sounds/jump.wav'),
    die: new Audio('./sounds/mario_die.wav'),
    music: new Audio('./sounds/Athletic.mp3'),

    play(name){
        this[name].currentTime = 0;
        this[name].play();
    },

    stop(name){
        this[name].pause();
        this[name].currentTime = 0;
    }
};

soundManager.music.loop = true;

soundManager.jump.volume = 0.3;
soundManager.die.volume = 0.3;
soundManager.music.volume = 1;


const jump = (event) => {
    if (!isGameStarted) return;
    if (isGameOver) return;

    if (event?.type === 'keydown' && event.repeat) return;
    if (isJumping) return;

    soundManager.play('jump');
    isJumping = true;
    mario.classList.add('jump');
};

mario.addEventListener('animationend', () => {
    mario.classList.remove('jump');
    isJumping = false;
});

const startGame = () => {
    if (isGameStarted) return;

    isGameStarted = true;
    isGameOver = false;

    startMenu.classList.add('hidden');

    pipe.style.animationPlayState = 'running';
    clouds.style.animationPlayState = 'running';

    soundManager.play('music');

    loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
            isGameOver = true;

            soundManager.play('die');
            soundManager.stop('music');

            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;

            mario.src = './Imagens/game-over.png';
            mario.style.width = '80px';
            mario.style.marginLeft = '50px';

            clouds.style.animationPlayState = 'paused';

            clearInterval(loop);
        }
    }, 10);
};

startBtn.addEventListener('click', startGame);

document.addEventListener('keydown', jump);
document.addEventListener('click', (event) => {
    if (!isGameStarted) return;
    if (event.target.id === 'start-btn') return;
    jump(event);
});