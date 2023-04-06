const board = Array.from({ length: 6 }, () => Array(7).fill(null));


let currentPlayer = 'red';

function dropDisc(col) {
  for (let row = board.length - 1; row >= 0; row--) {
    if (board[row][col] === null) {
      board[row][col] = currentPlayer;
      const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
      cell.classList.add(currentPlayer);
      if (checkForWin(row, col)) {
        alert(`${currentPlayer} wins!`);
      } else {
        switchPlayer();
      }
      return;
    }
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
}

function checkForWin(row, col) {
  // Check for horizontal win
  let count = 0;
  for (let i = Math.max(col - 3, 0); i <= Math.min(col + 3, board[0].length - 1); i++) {
    if (board[row][i] === currentPlayer) {
      count++;
      if (count === 4) {
        return true;
      }
    } else {
      count = 0;
    }
  }

  // Check for vertical win
  count = 0;
  for (let i = Math.max(row - 3, 0); i <= Math.min(row + 3, board.length - 1); i++) {
    if (board[i][col] === currentPlayer) {
      count++;
      if (count === 4) {
        return true;
      }
    } else {
      count = 0;
    }
  }

  // Check for diagonal win (top-left to bottom-right)
  count = 0;
  let i = row - Math.min(row, col);
  let j = col - Math.min(row, col);
  while (i <= Math.min(row + (board[0].length - 1 - col), board.length - 1) && j <= Math.min(col + (board.length - 1 - row), board[0].length - 1)) {
    if (board[i][j] === currentPlayer) {
      count++;
      if (count === 4) {
        return true;
      }
    } else {
      count = 0;
    }
    i++;
    j++;
  }

  // Check for diagonal win (bottom-left to top-right)
  count = 0;
  i = row + Math.min(board.length - 1 - row, col);
  j = col - Math.min(board.length - 1 - row, col);
  while (i >= Math.max(row - (board[0].length - 1 - col), 0) && j <= Math.min(col + (board.length - 1 - row), board[0].length - 1)) {
    if (board[i][j] === currentPlayer) {
      count++;
      if (count === 4) {
        return true;
      }
    } else {
      count = 0;
    }
    i--;
    j++;
  }

  return false;
}

      
      // Add event listeners to each cell
      const cells = document.querySelectorAll('.cell');
      cells.forEach(cell => {
      cell.addEventListener('click', () => {
      const col = cell.dataset.col;
      dropDisc(col);
      });
      });
      
      // Add reset button functionality
      const resetButton = document.querySelector('#reset-button');
      resetButton.addEventListener('click', () => {
      resetBoard();
      });
      
      function resetBoard() {
      board.forEach((row, rowIndex) => {
      row.forEach((_, colIndex) => {
      board[rowIndex][colIndex] = null;
      const cell = document.querySelector(`[data-row="${rowIndex}"][data-col="${colIndex}"]`);
      cell.classList.remove('red', 'yellow');
      });
      });
      currentPlayer = 'red';
      }