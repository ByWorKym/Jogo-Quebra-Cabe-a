var rows = 5;
var columns = 5;

var currTile;
var otherTile;

var turns = 0;

// Variáveis para controle de rolagem
var scrollInterval;
var scrollSpeed = 10; // Ajuste a velocidade da rolagem

window.onload = function() {
    // Inicialize o tabuleiro 5x5
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.src = "./img_qc/azul.png"; // Peça azul com opacidade

            // Funções de arrastar
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
        }
    }

    // Peças do quebra-cabeça
    let pieces = [];
    for (let i = 1; i <= rows * columns; i++) {
        pieces.push(i.toString());
    }
    pieces.reverse();
    for (let i = 0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length);
        // Trocar
        let tmp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = tmp;
    }

    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = "./img_qc/" + pieces[i] + ".jpg";

        // Funções de arrastar
        tile.addEventListener("dragstart", dragStart);
        tile.addEventListener("dragover", dragOver);
        tile.addEventListener("dragenter", dragEnter);
        tile.addEventListener("dragleave", dragLeave);
        tile.addEventListener("drop", dragDrop);
        tile.addEventListener("dragend", dragEnd);

        document.getElementById("pieces").append(tile);
    }

    // Verificar quebra-cabeça
    document.getElementById("verificar").addEventListener("click", function() {
        if (checkWin()) {
            showParabensModal();
        } else {
            showFalhaModal();
        }
    });
};

// Funções de arrastar
function dragStart(e) {
    currTile = this;
    // Inicia rolagem
    startScrolling(e);
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    stopScrolling(); // Para a rolagem ao soltar a peça
    if (currTile.src.includes("azul")) {
        return;
    }
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;
}

// Inicia a rolagem
function startScrolling(e) {
    scrollInterval = setInterval(function() {
        var mouseY = e.clientY; // Posição do mouse
        var windowHeight = window.innerHeight;

        if (mouseY < 30) { // Se o mouse estiver próximo do topo
            window.scrollBy(0, -scrollSpeed); // Rolagem para cima
        } else if (mouseY > windowHeight - 30) { // Se o mouse estiver próximo da parte inferior
            window.scrollBy(0, scrollSpeed); // Rolagem para baixo
        }
    }, 100); // Ajuste o intervalo de tempo se necessário
}

// Para a rolagem
function stopScrolling() {
    clearInterval(scrollInterval);
}

// Função para verificar se o quebra-cabeça está completo
function checkWin() {
    let tiles = document.querySelectorAll("#board img");
    for (let i = 0; i < tiles.length; i++) {
        let tileSrc = tiles[i].src;
        // Verifica se o nome da imagem corresponde à posição esperada
        if (!tileSrc.includes((i + 1).toString())) {
            return false; // Se alguma peça não estiver no lugar certo, o quebra-cabeça não está completo
        }
    }
    return true; // Se todas as peças estiverem no lugar, quebra-cabeça completo
}

// Função para mostrar o modal de parabéns
function showParabensModal() {
    const modal = document.getElementById("parabensModal");
    modal.style.display = "block";
}

// Função para mostrar o modal de falha
function showFalhaModal() {
    const modal = document.getElementById("falhaModal");
    modal.style.display = "block";
}

// Fechar o modal de parabéns
function closeParabensModal() {
    const modal = document.getElementById("parabensModal");
    modal.style.display = "none";
}

// Fechar o modal de falha
function closeFalhaModal() {
    const modal = document.getElementById("falhaModal");
    modal.style.display = "none";
}

// Função para reembaralhar as peças
function shufflePuzzle() {
    document.getElementById("board").innerHTML = ''; // Limpa o tabuleiro
    document.getElementById("pieces").innerHTML = ''; // Limpa as peças

    turns = 0;
    document.getElementById("turns").innerText = turns;

    window.onload(); // Recarrega o quebra-cabeça embaralhado
}
