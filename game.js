let turn = 'X';
let scoreX = 0;
let scoreO = 0;

function createBoard() {
  let board = document.createElement('table');
  for (let i = 0; i < 3; i++) {
    let row = document.createElement('tr');
    for (let j = 0; j < 3; j++) {
      let square = document.createElement('td');
      square.onclick = function () {
        addX(this);
      };
      row.appendChild(square);
    }
    board.appendChild(row);
  }
  // get reference to the board div
  let boardDiv = document.getElementById('board');
  boardDiv.appendChild(board);
  displayScore();
  updateTurnIndicator();
}

function addX(square) {
  if (square.innerHTML === '') {
    square.innerHTML = turn;
    checkForWinner();
  }
}

function checkForWinner() {
  let squares = [...document.getElementsByTagName('td')];
  if (hasWinner(squares)) return declareWinner();
  if (isTie(squares)) return declareTie();
  alternateTurn();
}

function declareWinner() {
  console.log('declareWinner called');
  alert(turn + ' wins!');
  if (turn === 'X') scoreX++;
  else scoreO++;
  displayScore();
  reset();
}
function declareTie() {
  alert('Tie game!');
  displayScore();
  reset();
}
function hasWinner(squares) {
  let rows = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];
  let columns = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];
  let diagonals = [
    [0, 4, 8],
    [2, 4, 6],
  ];
  let winningPositions = [...rows, ...columns, ...diagonals];
  return winningPositions.some((pos) =>
    pos.every((i) => squares[i].innerHTML === turn)
  );
}

function isTie(squares) {
  return squares.every((s) => s.innerHTML !== '');
}

function alternateTurn() {
  turn = turn === 'X' ? 'O' : 'X';
  updateTurnIndicator();
}

function updateTurnIndicator() {
  let turnIndicator = document.getElementById('turn');
  turnIndicator.innerHTML = `It's ${turn}'s turn`;
}

function getSquare(i, j) {
  return document.getElementsByTagName('td')[i * 3 + j].innerHTML;
}

function reset() {
  let squares = document.getElementsByTagName('td');
  for (let i = 0; i < squares.length; i++) {
    squares[i].innerHTML = '';
  }
  // whoever won the last game goes first
  turn = turn === 'X' ? 'O' : 'X';
  updateTurnIndicator();
}

function displayScore() {
  let scoreElementX = document.getElementById('scoreX');
  let scoreElementO = document.getElementById('scoreO');
  scoreElementX.innerHTML = `X: ${scoreX}`;
  scoreElementO.innerHTML = `O: ${scoreO}`;
}

window.onload = createBoard;
