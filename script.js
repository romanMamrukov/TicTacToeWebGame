document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    let currentPlayer = 'X';
    let winner = null;
    let moves = 0;
    let scoreX = 0;
    let scoreO = 0;
    let scoreDraw = 0;

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
    };

    const handleClick = (index) => {
        if (!cells[index].innerText && !winner) {
            cells[index].innerText = currentPlayer;
            moves++;

            winner = checkWinner();

            if (winner) {
                alert(`Player ${winner} wins!`);
                winner === 'X' ? scoreX++ : scoreO++;
                updateScore();
                resetGame();
            } else if (checkDraw()) {
                alert('It\'s a draw!');
                scoreDraw++;
                updateScore();
                resetGame();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    };

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleClick(index));
    });

    // Initial score update
    updateScore();
});
