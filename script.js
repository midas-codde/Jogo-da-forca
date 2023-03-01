
const colors = [
  { cor1: '#39a4fc', cor2: '#018cfd' }, //azul
  { cor1: '#e50e0e', cor2: '#ce0c0c' }, //vermelho
  { cor1: '#ebe54d', cor2: '#d3ce45' }, //amarelo
  { cor1: '#be80ff', cor2: '#ab73e5' }, //lilas
  { cor1: '#63d3ff', cor2: '#59bde5' }, //azul claro
  { cor1: '#ff548f', cor2: '#e54b80' }, //rosa
  { cor1: '#aee239', cor2: '#9ccb33' }, //verde
  { cor1: '#9061c2', cor2: '#8157ae' }, //roxo
  { cor1: '#f3450f', cor2: '#da3e0d' }, //laranja
  { cor1: '#411612', cor2: '#542823' }, //marrom
]

function resetColor() {
  const rndColor = colors[colors.length * Math.random() | 0];
  document.documentElement.style.setProperty('--cor1', rndColor.cor1);
  document.documentElement.style.setProperty('--cor2', rndColor.cor2);
}

let tentativas = 6;
let listaDinamica = [];
let palavraSecretaCategoria;
let palavraSecretaSorteada;

const palavras =
  fetch('./palavras.json')
  .then((pedacos) => pedacos.json())
  .then((resultado) => {
    criarPalavraSecreta(resultado);
    montarPalavraNaTela(resultado);
    return resultado;
  })

function criarPalavraSecreta(palavras) {
  const indexPalavra = parseInt(Math.random() * palavras.length);

  palavraSecretaSorteada = palavras[indexPalavra].nome;
  palavraSecretaCategoria = palavras[indexPalavra].categoria; 
}

function montarPalavraNaTela(palavras) {
  const categoria = document.getElementById("categories");
  categoria.innerHTML = palavraSecretaCategoria;

  const palavraTela = document.getElementById("secret-word");
  palavraTela.innerHTML = "";

  for (i = 0; i < palavraSecretaSorteada.length; i++) {
    if (listaDinamica[i] == undefined) {
      if (palavraSecretaSorteada[i] == " ") {
        listaDinamica[i] = " ";
        palavraTela.innerHTML =
          palavraTela.innerHTML +
          "<div class='letter-spacing'>" +
          listaDinamica[i] +
          "</div>";
      } else {
        listaDinamica[i] = "&nbsp;";
        palavraTela.innerHTML =
          palavraTela.innerHTML +
          "<div class='letter'>" +
          listaDinamica[i] +
          "</div>";
      }
    } else {
      if (palavraSecretaSorteada[i] == " ") {
        listaDinamica[i] = " ";
        palavraTela.innerHTML =
          palavraTela.innerHTML +
          "<div class='letter-spacing'>" +
          listaDinamica[i] +
          "</div>";
      } else {
        palavraTela.innerHTML =
          palavraTela.innerHTML +
          "<div class='letter'>" +
          listaDinamica[i] +
          "</div>";
      }
    }
  }
}

function verificaLetraEscolhida(letra) {
  if (document.getElementById("tecla-" + letra).classList.contains("active"))
    return;
  if (tentativas <= 0) return;
  mudarStyleLetra("tecla-" + letra);
  comparaListas(letra);
  montarPalavraNaTela();
}

function mudarStyleLetra(tecla) {
  document.getElementById(tecla).classList.add("active");
}

function comparaListas(letra) {
  const pos = palavraSecretaSorteada.indexOf(letra);
  if (pos < 0) {
    tentativas--;
    carregaImagemForca();
  } else {
    for (i = 0; i < palavraSecretaSorteada.length; i++) {
      if (palavraSecretaSorteada[i] == letra) {
        listaDinamica[i] = letra;
      }
    }
  }

  let vitoria = true;
  for (i = 0; i < palavraSecretaSorteada.length; i++) {
    if (palavraSecretaSorteada[i] != listaDinamica[i]) {
      vitoria = false;
    }
  }

  if (vitoria == true) {
    telaVitoria();
  }
}

function carregaImagemForca() {
  const div = document.createElement("div");

  const selectedDiv = document.querySelector(".force-itens");

  if (tentativas == 5) {
    div.setAttribute("id", "head");

    selectedDiv.appendChild(div);
    piscarErro();
  }

  if (tentativas == 4) {
    div.setAttribute("id", "body");

    selectedDiv.appendChild(div);
    piscarErro();
  }

  if (tentativas == 3) {
    div.setAttribute("id", "hand-left");

    selectedDiv.appendChild(div);
    piscarErro();
  }

  if (tentativas == 2) {
    div.setAttribute("id", "hand-right");

    selectedDiv.appendChild(div);
    piscarErro();
  }

  if (tentativas == 1) {
    div.setAttribute("id", "leg-left");

    selectedDiv.appendChild(div);
    piscarErro();
  }

  if (tentativas == 0) {
    div.setAttribute("id", "leg-right");

    selectedDiv.appendChild(div);
    piscarErro();

    telaDerrota();
  }
}


function piscarErro() {
  const divLeft = document.createElement('div');
  const divRight = document.createElement('div')

  const selectedDiv = document.querySelector("body");

  selectedDiv.appendChild(divLeft);
  selectedDiv.appendChild(divRight);

  divLeft.setAttribute("class", "lose-circle-left");
  divRight.setAttribute("class", "lose-circle-right");

}

function telaDerrota() {
  const textFrase = document.getElementById("loser-word");
  const telaObjeto = document.querySelector(".loser");
  telaObjeto.classList.add("show");

  textFrase.innerHTML = palavraSecretaSorteada;
}

function telaVitoria() {
  const textFrase = document.getElementById("win-word");
  const telaObjeto = document.querySelector(".win");
  telaObjeto.classList.add("show");

  textFrase.innerHTML = palavraSecretaSorteada;
}