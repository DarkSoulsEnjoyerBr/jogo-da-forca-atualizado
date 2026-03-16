// Lista de palavras disponíveis para o jogo
const listaDePalavras = [
    "abacaxi",
    "banana",
    "laranja",
    "manga",
    "morango",
    "uva",
    "pera",
    "kiwi",
    "caju",
    "coco"
];

// Variáveis globais do estado do jogo
let palavraSecreta = '';
let letrasErradas = [];
let letrasAcertadas = [];
let tentativasRestantes = 6;

// Referências aos elementos do DOM
const elementoPalavra = document.getElementById('palavra');
const elementoLetrasErradas = document.getElementById('letras');
const elementoTentativas = document.getElementById('tentativas');
const elementoMensagem = document.getElementById('mensagem');
const entrada = document.getElementById('entrada');

// Partes da forca que serão exibidas conforme erros
const partesForca = [
    document.querySelector('.cabeca'),
    document.querySelector('.tronco'),
    document.querySelector('.braco-esq'),
    document.querySelector('.braco-dir'),
    document.querySelector('.perna-esq'),
    document.querySelector('.perna-dir')
];

/**
 * Seleciona uma palavra aleatória da lista e a converte para maiúsculo
 * @returns {string} A palavra secreta em maiúsculo
 */
function selecionarPalavraAleatoria() {
    const indice = Math.floor(Math.random() * listaDePalavras.length);
    return listaDePalavras[indice].toUpperCase(); // Converte para maiúsculo para consistência com entrada do usuário
}

/**
 * Inicia um novo jogo, resetando todas as variáveis e atualizando a interface
 */
function iniciarJogo() {
    palavraSecreta = selecionarPalavraAleatoria();
    letrasErradas = [];
    letrasAcertadas = [];
    tentativasRestantes = 6;
    entrada.disabled = false;
    elementoMensagem.textContent = '';
    atualizarInterface();
}

/**
 * Atualiza a interface do jogo com base no estado atual
 */
function atualizarInterface() {
    // Exibe a palavra com letras acertadas reveladas e outras ocultas
    elementoPalavra.textContent = palavraSecreta
        .split('')
        .map(letra => letrasAcertadas.includes(letra) ? letra : '_')
        .join('');

    // Exibe as letras erradas digitadas
    elementoLetrasErradas.textContent = letrasErradas.join(', ');

    // Exibe o número de tentativas restantes
    elementoTentativas.textContent = tentativasRestantes;

    // Mostra as partes da forca conforme o número de erros
    partesForca.forEach((parte, indice) => {
        parte.style.display = indice < letrasErradas.length ? 'block' : 'none';
    });

    // Verifica se o jogador venceu
    if (!elementoPalavra.textContent.includes('_')) {
        elementoMensagem.textContent = 'Parabéns! Você acertou a palavra!';
        entrada.disabled = true;
    }

    // Verifica se o jogador perdeu
    if (tentativasRestantes <= 0) {
        elementoMensagem.textContent = `Você perdeu! A palavra era: ${palavraSecreta}`;
        entrada.disabled = true;
    }
}

/**
 * Processa a entrada de uma letra pelo jogador
 * @param {string} letra - A letra digitada
 */
function processarEntrada(letra) {
    letra = letra.toUpperCase(); // Padroniza para maiúsculo para comparação com palavra secreta

    // Valida se é uma letra válida e não repetida
    if (!letra.match(/^[A-Z]$/) || letrasAcertadas.includes(letra) || letrasErradas.includes(letra)) {
        return; // Ignora entrada inválida ou repetida
    }

    // Verifica se a letra está na palavra secreta
    if (palavraSecreta.includes(letra)) {
        letrasAcertadas.push(letra);
    } else {
        letrasErradas.push(letra);
        tentativasRestantes--;
    }

    atualizarInterface();
}

// Event listener para capturar entrada do usuário
entrada.addEventListener('input', (evento) => {
    const letra = evento.target.value;
    evento.target.value = ''; // Limpa o campo imediatamente após capturar a letra para permitir nova entrada rápida
    processarEntrada(letra);
});

// Inicia o jogo ao carregar a página
iniciarJogo();