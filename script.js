let board = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;

const gameBoard = document.getElementById('game-board');
const gameStatus = document.getElementById('game-status');
const resetButton = document.getElementById('reset-button');

function handleCellClick(cell, index) {
    if (!gameActive || board[index] !== '') {
        return;
    }
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        gameStatus.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
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
            return true;
        }
    }
    return false;
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

function resetGame() {
    board = Array(9).fill('');
    currentPlayer = 'X';
    gameActive = true;
    gameStatus.textContent = 'Player X\'s turn';
    cells.forEach(cell => {
        cell.textContent = '';
    });
}
;

