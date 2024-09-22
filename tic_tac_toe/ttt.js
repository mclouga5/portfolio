let grid = document.getElementById('grid');
let msg = document.querySelector('.message');
let chooser = document.querySelector('form');
let mark;
let cells;

let resetTttButton = document.getElementById('reset-ttt-button');
// Add click listener to radio buttons
function setPlayer() {
  mark = this.value;
  msg.textContent = mark + ', click on a square to make your move!';
  chooser.classList.add('game-on');
  document.getElementById('reset-ttt-button').classList.remove('hidden');
  this.checked = false;
  buildGrid();
}

// Add click listener to each cell
function playerMove() {
  if (this.textContent == '') {
    this.textContent = mark;
    checkRow();
    switchMark();
    checkForTie();
    setTimeout(function () {
        if (!checkRow() && !isBoardFull()) { // Only make computer move if there's no winner/tie
          computerMove();
        }
      }, 600); // Wait 600ms for the computer move
  }
}

// Check if all the cells are filled
function isBoardFull() {
    return cells.every(cell => cell.textContent !== '');
  }

// Let the computer make the next move
function computerMove() {
  let emptyCells = [];

  cells.forEach(function(cell) {
    if (cell.textContent == '') {
      emptyCells.push(cell);
    }
  });

  // Try to block the player or make a random move
  if (!makeMoveToWin(emptyCells) && !makeMoveIfBlocking(emptyCells)) {
    let random = Math.floor(Math.random() * emptyCells.length);
    emptyCells[random].textContent = mark;
    checkRow();
    checkForTie();
    switchMark();
  }
}

// Try to win
function makeMoveToWin(emptyCells) {
  for (let i = 0; i < emptyCells.length; i++) {
     emptyCells[i].textContent = mark; // Simulate move

    // Check if this would win for the opponent
    if (checkRowWithMark(mark)) {
      emptyCells[i].textContent = mark;
      checkRow();
      checkForTie();
      switchMark();
      return true; // Return true if a blocking move is made
    }

    emptyCells[i].textContent = ''; // Reset the cell if no block is needed
  }

  return false; // Return false if no blocking move is possible
}

// Try to block the opponent if they are about to win
function makeMoveIfBlocking(emptyCells) {
  let opponentMark = mark === 'X' ? 'O' : 'X'; // Identify the opponent's mark

  for (let i = 0; i < emptyCells.length; i++) {
    emptyCells[i].textContent = opponentMark; // Simulate opponent's move

    // Check if this would win for the opponent
    if (checkRowWithMark(opponentMark)) {
      emptyCells[i].textContent = mark; // Block it with computer's mark
      checkRow();
      checkForTie();
      switchMark();
      return true; // Return true if a blocking move is made
    }

    emptyCells[i].textContent = ''; // Reset the cell if no block is needed
  }

  return false; // Return false if no blocking move is possible
}

// Switch player mark
function switchMark() {
  mark = mark === 'X' ? 'O' : 'X';
}

// Check if the provided mark has won
function checkRowWithMark(tempMark) {
  return (
    winnerWithMark(document.getElementById('c1'), document.getElementById('c2'), document.getElementById('c3'), tempMark) ||
    winnerWithMark(document.getElementById('c4'), document.getElementById('c5'), document.getElementById('c6'), tempMark) ||
    winnerWithMark(document.getElementById('c7'), document.getElementById('c8'), document.getElementById('c9'), tempMark) ||
    winnerWithMark(document.getElementById('c1'), document.getElementById('c4'), document.getElementById('c7'), tempMark) ||
    winnerWithMark(document.getElementById('c2'), document.getElementById('c5'), document.getElementById('c8'), tempMark) ||
    winnerWithMark(document.getElementById('c3'), document.getElementById('c6'), document.getElementById('c9'), tempMark) ||
    winnerWithMark(document.getElementById('c1'), document.getElementById('c5'), document.getElementById('c9'), tempMark) ||
    winnerWithMark(document.getElementById('c3'), document.getElementById('c5'), document.getElementById('c7'), tempMark)
  );
}

//Check if there's a winner and accept a temporary marker
function winnerWithMark(a, b, c, tempMark) {
  return a.textContent === tempMark && b.textContent === tempMark && c.textContent === tempMark;

}

function winner(a, b, c) {
  if (a.textContent == mark && b.textContent == mark && c.textContent == mark) {
    msg.textContent = mark + ' is the winner!';
    a.classList.add('winner');
    b.classList.add('winner');
    c.classList.add('winner');
    return true;
  } else {
    return false;
  }
}

// check cell combinations
function checkRow() {
  winner(document.getElementById('c1'), document.getElementById('c2'), document.getElementById('c3'));
  winner(document.getElementById('c4'), document.getElementById('c5'), document.getElementById('c6'));
  winner(document.getElementById('c7'), document.getElementById('c8'), document.getElementById('c9'));
  winner(document.getElementById('c1'), document.getElementById('c4'), document.getElementById('c7'));
  winner(document.getElementById('c2'), document.getElementById('c5'), document.getElementById('c8'));
  winner(document.getElementById('c3'), document.getElementById('c6'), document.getElementById('c9'));
  winner(document.getElementById('c1'), document.getElementById('c5'), document.getElementById('c9'));
  winner(document.getElementById('c3'), document.getElementById('c5'), document.getElementById('c7'));
}

// Check if it's a tie
function checkForTie() {
    if (isBoardFull()) {
      msg.textContent = "It's a tie!";
    }
    return false;
  }

// Clear the grid
function resetGrid() {
  mark = 'X';
  cells.forEach(function(cell) {
    cell.textContent = '';
    cell.classList.remove('winner');
  });
  msg.textContent = 'Choose your player:';
  chooser.classList.remove('game-on');
  document.getElementById('reset-ttt-button').classList.add('hidden');
  grid.innerHTML = '';
}

// Build the grid
function buildGrid() {
  for (let i = 1; i <= 9; i++) {
    let cell = document.createElement('li');
    cell.id = 'c' + i;
    cell.addEventListener('click', playerMove, false);
    grid.appendChild(cell);
  }
  cells = Array.prototype.slice.call(grid.getElementsByTagName('li'));
}

// Set up the player choice buttons
let players = Array.prototype.slice.call(document.querySelectorAll('input[name=player-choice]'));
players.forEach(function(choice) {
  choice.addEventListener('click', setPlayer, false);
});

// Set up the reset button
let resetButton = chooser.querySelector('button');
resetButton.addEventListener('click', function(e) {
  e.preventDefault();
  resetGrid();
});
