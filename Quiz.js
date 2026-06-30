import { Pergunta } from './Pergunta.js';

export class Quiz {
    constructor(elementos) {
        this.el = elementos;
        this.perguntas = [];
        this.indiceAtual = 0;
        this.pontuacao = 0;
        this.jaRespondeu = false;

        this.registrarEventos();
    }

    registrarEventos() {
        this.el.btnProxima.addEventListener('click', () => this.avancar());
        this.el.btnReiniciar.addEventListener('click', () => this.iniciar());
    }

    async carregar(caminhoJson) {
    try {
        const resposta = await fetch(caminhoJson);
        const dados = await resposta.json();

        this.el.temaTitulo.textContent = dados.tema;

        this.perguntas = dados.perguntas.map(
            p => new Pergunta(
                p.pergunta,
                p.alternativas,
                p.respostaCorreta
            )
        );

        this.iniciar();
    } catch (erro) {
        console.error("Erro ao carregar o arquivo JSON:", erro);
    }
}

    iniciar() {
        this.indiceAtual = 0;
        this.pontuacao = 0;

        this.el.telaQuiz.classList.remove('escondido');
        this.el.telaFinal.classList.add('escondido');

        this.renderizarPergunta();
    }

    renderizarPergunta() {
        this.jaRespondeu = false;
        this.el.btnProxima.disabled = true;

        const perguntaAtual = this.perguntas[this.indiceAtual];

        this.el.perguntaTexto.textContent = perguntaAtual.texto;
        this.el.contador.textContent = `${this.indiceAtual + 1} de ${this.perguntas.length}`;
        this.el.placar.textContent = `Pontuação: ${this.pontuacao}`;

        this.el.alternativas.innerHTML = '';

        perguntaAtual.alternativas.forEach((alternativa, indice) => {
            const botao = document.createElement('button');
            botao.type = 'button';
            botao.className = 'alternativa-btn';
            botao.textContent = alternativa;

            botao.addEventListener('click', () => this.responder(indice, botao));
            this.el.alternativas.appendChild(botao);
        });
    }

    responder(indiceEscolhido, botaoClicado) {
        if (this.jaRespondeu) return; 
        this.jaRespondeu = true;

        const perguntaAtual = this.perguntas[this.indiceAtual];
        const botoes = this.el.alternativas.querySelectorAll('button');

        if (perguntaAtual.estaCorreta(indiceEscolhido)) {
            botaoClicado.classList.add('correta');
            this.pontuacao++;
            this.el.placar.textContent = `Pontuação: ${this.pontuacao}`;
        } else {
            botaoClicado.classList.add('errada');
            botoes[perguntaAtual.respostaCorreta].classList.add('correta');
        }

        this.el.btnProxima.disabled = false; 
    }

    avancar() {
        this.indiceAtual++;

        if (this.indiceAtual < this.perguntas.length) {
            this.renderizarPergunta();
        } else {
            this.finalizar();
        }
    }

    finalizar() {
        this.el.telaQuiz.classList.add('escondido');
        this.el.telaFinal.classList.remove('escondido');

        this.el.resultadoFinal.textContent = `${this.pontuacao} de ${this.perguntas.length} perguntas!`;
    }
}