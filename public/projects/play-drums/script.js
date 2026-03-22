const sons = {
    '1': 'boom.wav',
    '2': 'clap.wav',
    '3': 'hihat.wav',
    '4': 'kick.wav',
    '5': 'openhat.wav',
    '6': 'ride.wav',
    '7': 'snare.wav',
    '8': 'tink.wav',
    '9': 'tom.wav'
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