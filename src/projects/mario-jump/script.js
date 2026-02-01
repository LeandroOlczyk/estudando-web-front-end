const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');

const jump = () => {  
    // Adiciona a classe 'jump' na classe 'mario' para efetuar o pulo.
    mario.classList.add('jump');
   
    // Timeout para remover a classe, permitindo saltar várias vezes no jogo.
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 700);
};

const loop = setInterval(() =>{

    // Captura a posição atual do tubo.
    const pipePositon = pipe.offsetLeft;

    // Captura a variável de ambiente 'bottom' do personagem no momento do salto.
    // "replace" adicionado para remover o 'px' da String retornada pelo metodo getComputedStyle.
    // Foi utilizado o "+window" na função "window" para converter a String em número (O Caché utiliza o mesmo princípio).
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px',""); 

    const cloudsPosition = +window.getComputedStyle(clouds).bottom.replace('px',""); 


   if (pipePositon <= 120 && pipePositon > 0 && marioPosition < 80 ) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePositon}px`;
 
        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`

        mario.src = './Imagens/game-over.png';
        mario.style.width = '80px';
        mario.style.marginLeft = '50px'

        // Pausa a animação das nuvens.
        clouds.style.animationPlayState = "paused";

        clearInterval(loop);
    };


}, 10);


// Evento que aguarda o jogador pressionar qualquer tecla.
document.addEventListener('keydown', jump);