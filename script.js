document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const playerMode = document.getElementById('playerMode');
    const modeSwitchBtn = document.getElementById('modeSwitchBtn');
    let currentPlayer = 'X';
    let winner = null;
    let moves = 0;
    let scoreX = 0;
    let scoreO = 0;
    let scoreDraw = 0;
    let isOnePlayerMode = false;

    const updateScore = () => {
        document.getElementById('scoreX').innerText = `X: ${scoreX}`;
        document.getElementById('scoreO').innerText = `O: ${scoreO}`;
        document.getElementById('scoreDraw').innerText = `Draws: ${scoreDraw}`;
    };

    const checkWinner = () => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const line of lines) {
            const [a, b, c] = line;
            if (cells[a].innerText && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText) {
                return cells[a].innerText;
            }
        }

        return null;
    };

    const checkDraw = () => {
        return moves === 9;
    };

    const resetGame = () => {
        cells.forEach(cell => {
            cell.innerText = '';
        });

        winner = null;
        currentPlayer = 'X';
        moves = 0;
        playerMode.innerText = isOnePlayerMode ? '1 V PC' : '1 V 1';

        if (isOnePlayerMode && currentPlayer === 'O') {
            // In one-player mode, trigger computer move
            makeComputerMove();
        }
    };

    const makeComputerMove = () => {
        // Look for a winning move
        const winningMove = findWinningMove('O');
        if (winningMove !== null) {
            handleClick(winningMove);
            return;
        }
    
        // Block the opponent from winning
        const blockingMove = findWinningMove('X');
        if (blockingMove !== null) {
            handleClick(blockingMove);
            return;
        }
    
        // Prioritize center and corners, then random move
        const priorityMoves = [4, 0, 2, 6, 8];
        for (const move of priorityMoves) {
            if (cells[move].innerText === '') {
                handleClick(move);
                return;
            }
        }
    
        // If no priority moves, make a random move
        const emptyCells = Array.from(cells).filter(cell => !cell.innerText);
        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const computerMove = emptyCells[randomIndex];
            handleClick(Number(computerMove.dataset.index));
        }
    };
    
    const findWinningMove = (symbol) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
    
        for (const line of lines) {
            const [a, b, c] = line;
            if (cells[a].innerText === symbol && cells[b].innerText === symbol && cells[c].innerText === '') {
                return c;
            } else if (cells[a].innerText === symbol && cells[c].innerText === symbol && cells[b].innerText === '') {
                return b;
            } else if (cells[b].innerText === symbol && cells[c].innerText === symbol && cells[a].innerText === '') {
                return a;
            }
        }
    
        return null;
    };

    const handleClick = (index) => {
        if (!cells[index].innerText && !winner) {
            cells[index].innerText = currentPlayer;
            moves++;
    
            winner = checkWinner();
    
            if (winner) {
                updateScore();
                setTimeout(() => {
                    alert(`Player ${winner} wins!`);
                    resetGame();
                }, 100); // Delay the alert
            } else if (checkDraw()) {
                updateScore();
                setTimeout(() => {
                    alert('It\'s a draw!');
                    resetGame();
                }, 100); // Delay the alert
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                playerMode.innerText = isOnePlayerMode ? '1 V PC' : '1 V 1';
    
                if (isOnePlayerMode && currentPlayer === 'O') {
                    // In one-player mode, trigger computer move
                    makeComputerMove();
                }
            }
        }
    };

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleClick(index));
    });

    modeSwitchBtn.addEventListener('click', () => {
        isOnePlayerMode = !isOnePlayerMode;
        if (isOnePlayerMode) {
            playerMode.innerText = '1 V PC';
        } else {
            playerMode.innerText = '1 V 1';
        }
        resetGame();
    });

    // Initial score update
    updateScore();
});
