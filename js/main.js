 /*----- constants -----*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/*----- app's state (variables) -----*/
let board;
let turn = 'X';
let win;
let xScore = 0;
let oScore = 0;

/*----- cached element references -----*/
const squares = Array.from(document.querySelectorAll('#board div'));
const messages = document.querySelector('h2');
const xScoreboard = document.getElementById('x-score');
const oScoreboard = document.getElementById('o-score');

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleTurn);
document.getElementById('reset-button').addEventListener('click', init);
document.getElementById('choose-x').addEventListener('click', () => setTurn('X'));
document.getElementById('choose-o').addEventListener('click', () => setTurn('O'));

/*----- functions -----*/
function getWinner() {
    let winner = null;
    winningCombos.forEach(function(combo) {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
            winner = board[combo[0]];
        }
    });
    return winner ? winner : board.includes('') ? null : 'T';
}

function handleTurn(event) {
    let idx = squares.findIndex(square => square === event.target);
    if (board[idx] || win) return; // Prevent overwriting and continue after game ends
    board[idx] = turn;
    turn = turn === 'X' ? 'O' : 'X';
    win = getWinner();
    if (win === 'X') xScore++;
    if (win === 'O') oScore++;
    render();
}

function init() {
    board = ['', '', '', '', '', '', '', '', ''];
    win = null;
    render();
}

function render() {
    board.forEach((mark, index) => {
        squares[index].textContent = mark;
    });
    messages.textContent = win === 'T' ? `That's a tie, queen!` : win ? `${win} wins the game!` : `It's ${turn}'s turn!`;
    xScoreboard.textContent = `X: ${xScore}`;
    oScoreboard.textContent = `O: ${oScore}`;
}

function setTurn(player) {
    turn = player;
    init();
}

init();
