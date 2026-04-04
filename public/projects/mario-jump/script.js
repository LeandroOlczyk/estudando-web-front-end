// ----------------- Seleção de elementos -----------------

const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const startMenu = document.querySelector('.start-menu');
const startBtn = document.querySelector('#start-btn');
const restartBtn = document.querySelector('#restart-btn');
const menuTitle = document.querySelector('#menu-title');

// ----------------- Variáveis de estado -----------------

let isJumping = false;
let isGameOver = false;
let isGameStarted = false;
let loop = null;

// ----------------- Controle de audio -----------------
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

// ----------------- Controle de jogo -----------------

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

// ----------------- Lógica de início e fim de jogo -----------------

const endGame = () => {
    isGameOver = true;
    isJumping = false;
    mario.classList.remove('jump');

    soundManager.play('die');
    soundManager.stop('music');

    clearInterval(loop);
    
    startMenu.classList.remove('hidden');
    menuTitle.innerText = 'Game Over';

    startBtn.style.display = 'none';
    restartBtn.style.display = 'block';
}

const restartGame = () => {
    isGameOver = false;
    isGameStarted = false;
    isJumping = false;

    mario.classList.remove('jump');

    mario.src = './Imagens/mario.gif';
    mario.style.width = '150px';
    mario.style.marginLeft = '0';
    mario.style.bottom = '0';
    mario.style.animation = '';

    pipe.style.animation = '';
    pipe.style.left = '';

    clouds.style.animationPlayState = 'running';

    startMenu.classList.remove('hidden');
    menuTitle.innerText = "Mario Jump";

    startBtn.style.display = "block";
    restartBtn.style.display = "none";
};

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
        
        const marioWidth = mario.offsetWidth;
        const pipeWidth = pipe.offsetWidth;

        if (pipePosition <= marioWidth * 0.8 && pipePosition > 0 && marioPosition < pipeWidth) {

            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;

            mario.src = './Imagens/game-over.png';
            mario.style.width = '80px';
            mario.style.marginLeft = '50px';

            clouds.style.animationPlayState = 'paused';

            endGame();
        }
    }, 10);
};

// ----------------- Eventos -----------------

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);

document.addEventListener('keydown', jump);

document.addEventListener('click', (event) => {
    if (!isGameStarted) return;
    if (event.target.id === 'start-btn') return;
    jump(event);
});