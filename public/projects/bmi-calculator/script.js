
const calcular=document.getElementById('calcular');
const limpar=document.getElementById('limpar');

function imc() {

    LimparResultadoAnterior()

    let peso=document.getElementById('peso').value;
    let altura=document.getElementById('altura').value;

    let resultado=document.getElementById('resultado');
    let caixaResultado = document.querySelector('.result_box');

    peso = Number(peso)
    altura = Number(altura) / 100;
    
    const validacao=ValidarCampos(peso,altura)

    if (!validacao.status) {
        resultado.textContent = validacao.mensagem;
        return;
    }

    let resultadoIMC = (peso / (altura * altura));

    const classificacao = classificarIMC(resultadoIMC);

    let msg = `IMC: ${resultadoIMC.toFixed(2)}  ${classificacao.label}`;

    caixaResultado.className = 'result_box';
    caixaResultado.classList.add(classificacao.class);

    if (resultadoIMC > 60) {
        return
    }

    resultado.textContent = msg;
}

function ValidarCampos(peso,altura) {

    if (peso <= 0) {
        return {
            status: false,
            mensagem: 'Peso inválido'
        }
    }
    if ( altura <= 0) {
        return {
            status: false,
            mensagem: 'Altura inválida'
        }
    }
    return {
        status: true,
        mensagem: 'Ok'
    };
}

function classificarIMC(valorIMC) {

    const tabelaIMC = [
        { min: 0, max: 16, class: "severe_thinness", label: "Magreza grave" },
        { min: 16, max: 17, class: "moderate_thinness", label: "Magreza moderada" },
        { min: 17, max: 18.5, class: "mild_thinness", label: "Magreza leve" },
        { min: 18.5, max: 25, class: "normal_weight", label: "Saudável" },
        { min: 25, max: 30, class: "overweight", label: "Sobrepeso" },
        { min: 30, max: 35, class: "obesity_class_1", label: "Obesidade grau I" },
        { min: 35, max: 40, class: "obesity_class_2", label: "Obesidade grau II" },
        { min: 40, max: 60, class: "obesity_class_3", label: "Obesidade grau III" },
        { min: 60, max: Infinity, class: "obesity_max_level", label: "" }
    ];

    for (const item of tabelaIMC) {
        if (valorIMC >= item.min && valorIMC < item.max) {
            return item;
        }
    }

}

function LimparResultadoAnterior() {
    document.getElementById('resultado').textContent = '';

    const caixaResultado = document.querySelector('.result_box');
    caixaResultado.className = 'result_box default';

}

function limparCampos() {
    document.getElementById('peso').value = '';
    document.getElementById('altura').value = '';
    document.getElementById('resultado').textContent = '';

    const caixaResultado = document.querySelector('.result_box');
    caixaResultado.className = 'result_box default';
}

calcular.addEventListener('click', imc);
limpar.addEventListener('click', limparCampos)