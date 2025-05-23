document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const gameStatus = document.getElementById('gameStatus');
    const restartButton = document.getElementById('restartButton');

    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.dataset.cellIndex);

        if (board[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        board[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer); // Add X/O class for styling and animation

        checkGameResult();
    }

    function checkGameResult() {
        let roundWon = false;
        let winningCells = [];

        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = board[winCondition[0]];
            let b = board[winCondition[1]];
            let c = board[winCondition[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                winningCells = winCondition; // Store winning cells
                break;
            }
        }

        if (roundWon) {
            gameStatus.textContent = `Player ${currentPlayer} Wins!`;
            gameActive = false;
            // Add 'win' class to winning cells for animation
            winningCells.forEach(index => {
                cells[index].classList.add('win');
            });
            return;
        }

        let roundDraw = !board.includes('');
        if (roundDraw) {
            gameStatus.textContent = `It's a Draw!`;
            gameActive = false;
            // Optionally, add a slight shake or fade for a draw
            cells.forEach(cell => cell.style.animation = 'shake 0.5s ease-in-out');
            setTimeout(() => {
                cells.forEach(cell => cell.style.animation = '');
            }, 500); // Remove animation after it plays
            return;
        }

        // Switch players
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.textContent = `Player ${currentPlayer}'s Turn`;
    }

    function restartGame() {
        currentPlayer = 'X';
        board = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        gameStatus.textContent = `Player ${currentPlayer}'s Turn`;

        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('X', 'O', 'win'); // Remove all player and win classes
            cell.style.animation = ''; // Clear any individual cell animations
        });
    }

    // Add event listeners
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);

    // Initial status display
    gameStatus.textContent = `Player ${currentPlayer}'s Turn`;
});