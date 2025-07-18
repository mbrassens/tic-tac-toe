let board = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;
let scoreX = 0;
let scoreO = 0;

const gameBoard = document.getElementById('game-board');
const gameStatus = document.getElementById('game-status');
const resetButton = document.getElementById('reset-button');
const scoreXElem = document.getElementById('score-x');
const scoreOElem = document.getElementById('score-o');
const resetScoresButton = document.getElementById('reset-scores-button');

function handleCellClick(cell, index) {
    if (!gameActive || board[index] !== '') {
        return;
    }
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    const winCombo = checkWin();
    if (winCombo) {
        gameStatus.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        // Highlight winning cells
        winCombo.forEach(i => {
            cells[i].classList.add('winner');
        });
        // Update score
        if (currentPlayer === 'X') {
            scoreX++;
            scoreXElem.textContent = scoreX;
        } else {
            scoreO++;
            scoreOElem.textContent = scoreO;
        }
    } else if (checkDraw()) {
        gameStatus.textContent = "It's a draw!";
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin() {
    const winCombos = [
        [0, 1, 2], // rows
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], // columns
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], // diagonals
        [2, 4, 6]
    ];
    for (let combo of winCombos) {
        const [a, b, c] = combo;
        if (
            board[a] !== '' &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            return combo; // Return the winning combo
        }
    }
    return null;
}

function checkDraw() {
    return board.every(cell => cell !== '') && !checkWin();
}


const cells = document.querySelectorAll('.cell');
cells.forEach(cell => {
    cell.addEventListener('click', function() {
        const index = parseInt(cell.getAttribute('data-cell-index'), 10);
        handleCellClick(cell, index);
    });
})

resetButton.addEventListener('click', resetGame);
resetScoresButton.addEventListener('click', function() {
    scoreX = 0;
    scoreO = 0;
    scoreXElem.textContent = scoreX;
    scoreOElem.textContent = scoreO;
});

function resetGame() {
    board = Array(9).fill('');
    currentPlayer = 'X';
    gameActive = true;
    gameStatus.textContent = 'Player X\'s turn';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winner'); // Remove winner highlight
    });
}
;

