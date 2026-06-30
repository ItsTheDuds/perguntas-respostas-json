export class Pergunta {
    constructor(texto, alternativas, respostaCorreta){
        this.texto = texto;
        this.alternativas = alternativas;
        this.respostaCorreta = respostaCorreta;
    }

    estaCorreta(indiceEscolhido){
        return indiceEscolhido === this.respostaCorreta;
    }
}