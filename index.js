const gameBoard = (function () {
    let board = ['', '', '', '', '', '', '', '', ''];
    let winner = '';
    let numTurns = 0;
    let XTurn = true;

    let player1 = 'X';
    let player2 = 'O';

    const getBoard = () => board;
    const get = (x, y) => board[x + y * 3];
    const set = (x, y) => {
        const value = XTurn ? 'X' : 'O';
        board[x + y * 3] = value;
        numTurns++;
        XTurn = !XTurn;
        // Check if the game is over
        if (get(x, 0) === value && get(x, 1) === value && get(x, 2) === value) {
            winner = value;
            return true;
        }
        if (get(0, y) === value && get(1, y) === value && get(2, y) === value) {
            winner = value;
            return true;
        }
        if (x === y && get(0, 0) === value && get(1, 1) === value && get(2, 2) === value) {
            winner = value;
            return true;
        }
        if (x + y === 2 && get(0, 2) === value && get(1, 1) === value && get(2, 0) === value) {
            winner = value;
            return true;
        }
        return false;
    }
    const reset = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        winner = '';
        numTurns = 0;
        XTurn = true;
    }
    const getWinner = () => playerName(winner);
    const hasWon = () => winner !== '';
    const gameOver = () => numTurns === 9 || hasWon();
    const currentPlayer = () => XTurn ? playerName('X') : playerName('O');
    const playerName = player => {
        if (player === 'X') {
            return player1 === 'X' ? player1 : player1 + " (X)";;
        } else if (player === 'O') {
            return player2 === 'O' ? player2 : player2 + " (O)";
        }
    }
    const setPlayer1 = (name) => player1 = name;
    const setPlayer2 = (name) => player2 = name;
    return { getBoard, get, set, reset, getWinner, hasWon, gameOver, XTurn, currentPlayer, setPlayer1, setPlayer2 };
})();

(function () {
    function writeTurn() {
        document.getElementById('status').innerText = gameBoard.currentPlayer() + " (" + (gameBoard.XTurn ? 'X' : 'O') + ") to go"
    }

    const board = document.getElementById('board');
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', () => {
                if (gameBoard.get(i, j) === '' && !gameBoard.gameOver()) {
                    gameBoard.set(i, j);
                    cell.innerText = gameBoard.get(i, j);
                    document.getElementById('status').innerText = gameBoard.currentPlayer() + " to go";
                    if (gameBoard.gameOver()) {
                        document.getElementById('status').innerText = 
                            gameBoard.hasWon() ? gameBoard.getWinner() + " wins!" : "It's a draw!";
                        document.getElementById('restart').classList.remove('hidden');
                    }
                }
            });
            board.appendChild(cell);
        }
    }
    document.getElementById('restart').addEventListener('click', () => {
        gameBoard.reset();
        document.getElementById('status').innerText = gameBoard.currentPlayer() + " to go";
        document.getElementById('restart').classList.add('hidden');
        const cells = document.getElementsByClassName('cell');
        for (let i = 0; i < cells.length; i++) {
            cells[i].innerText = '';
        }
    });

    document.getElementById('menu-btn').addEventListener('click', () => {
        document.getElementById('menu-background').classList.toggle('hidden');
    });

    document.getElementById('settings').addEventListener('submit', e => {
        gameBoard.setPlayer1(document.getElementById('player1').value);
        gameBoard.setPlayer2(document.getElementById('player2').value);
        document.getElementById('menu-background').classList.add('hidden');
        document.getElementById('status').innerText = gameBoard.currentPlayer() + " to go";
        
        e.preventDefault();
    });
})();