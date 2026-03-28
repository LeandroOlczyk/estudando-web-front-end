const sons = {
    '0': 'skegs.mp3',
    '1': 'kick.wav',
    '2': 'snare.wav',
    '3': 'snare.mp3',
    '4': 'hihat.wav',
    '5': 'openhat.wav',
    '6': 'ride.wav',
    '7': 'clap.wav',
    '8': 'crash.mp3',
    '9': 'tick.mp3'
}

const reenderizarDivNumeros = (texto) => {
    const div = document.createElement('div');
    div.classList.add('key');
    div.textContent = (texto);
    div.id = texto;
    document.getElementById('conteiner').appendChild(div);
}

const exibir = (sons) => Object.keys(sons).forEach(reenderizarDivNumeros)


const adicionarEfeito = (numero) => {
    document.getElementById(numero)
    .classList.add('active');
}

const removerEfeito = (numero) => {
    const div = document.getElementById(numero)
    const removeClasseActive = () => div.classList.remove('active');
    div.addEventListener('transitionend',removeClasseActive)
}

const ativarSom = (evento) => {
    console.log(evento)

    if (evento.type == 'click') {
        numero = evento.target.id;
    }

    if (evento.type == 'keydown') {
        numero = evento.key;
    }
    
    console.log('numero ',numero)
    const numeroListado = sons.hasOwnProperty(numero);

    if (numeroListado) {
        adicionarEfeito(numero);
        tocarSom(numero);
        removerEfeito(numero);
    }
}

const tocarSom = (numero) => {
    const audio = new Audio(`./sounds/${sons[numero]}`)
    audio.play();
}

exibir(sons);
document.getElementById('conteiner')
        .addEventListener('click', ativarSom)

window.addEventListener('keydown',ativarSom)