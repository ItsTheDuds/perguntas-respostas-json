// main.js
import { Quiz } from './Quiz.js';

const elementosDOM = {
    telaQuiz: document.querySelector('#tela-quiz'),
    telaFinal: document.querySelector('#tela-final'),
    temaTitulo: document.querySelector('#tema-titulo'),
    contador: document.querySelector('#contador'),
    perguntaTexto: document.querySelector('#pergunta-texto'),
    alternativas: document.querySelector('#alternativas'),
    placar: document.querySelector('#placar'),
    btnProxima: document.querySelector('#btn-proxima'),
    btnReiniciar: document.querySelector('#btn-reiniciar'),
    resultadoFinal: document.querySelector('#resultado-final')
};

const meuQuiz = new Quiz(elementosDOM);
meuQuiz.carregar('perguntas-respostas.json');