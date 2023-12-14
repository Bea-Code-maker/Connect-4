const gameBoard = document.getElementById('gameBoard');
const cells = document.querySelectorAll('.cell');

let currentPlayer = 'red';
let gameActive = true;

const checkWinner = (board, row, col, player) => {
  const directions = [
    [+1, 0], [-1, 0], [0, +1], [0, -1], // vertical and horizontal
    [+1, +1], [-1, -1], [+1, -1], [-1, +1] // diagonals
  ];

  for (const [dx, dy] of directions) {
    let count = 1; // Starting cell already occupied
    let x = row + dx;
    let y = col + dy;

    while (x >= 0 && x < 6 && y >= 0 && y < 7 && board[x][y] === player) {
      count++;
      x += dx;
      y += dy;
    }

    x = row - dx;
    y = col - dy;

    while (x >= 0 && x < 6 && y >= 0 && y < 7 && board[x][y] === player) {
      count++;
      x -= dx;
      y -= dy;
    }

    if (count >= 4) {
      return true;
    }
  }
  return false;
};

const startNewGame = () => {
  gameActive = true;
  currentPlayer = 'red';
  cells.forEach(cell => {
    cell.style.backgroundColor = '';
    cell.addEventListener('click', handleCellClick);
  });
};

const handleCellClick = (e) => {
  const cell = e.target;
  const col = parseInt(cell.id) % 7;

  if (!gameActive) {
    return; 
  }

  for (let row = 5; row >= 0; row--) {
    const index = row * 7 + col;
    const bottomCell = cells[index];
    if (!bottomCell.style.backgroundColor) {
      bottomCell.style.backgroundColor = currentPlayer;
      const win = checkWinner(getBoard(), row, col, currentPlayer);
      if (win) {
        gameActive = false;
        alert(`${currentPlayer.toUpperCase()} wins!`);
        break;
      }
      currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
      break;
    }
  }

  const isFull = Array.from({ length: 7 }, (_, col) => {
    const index = 35 + col; 
    return cells[index].style.backgroundColor;
  }).every(color => color); 

  if (isFull && gameActive) {
    gameActive = false;
    alert('It\'s a tie!');
  }
};

const getBoard = () => {
  const board = Array.from({ length: 6 }, () => Array(7).fill(null));
  for (let i = 0; i < cells.length; i++) {
    const row = Math.floor(i / 7);
    const col = i % 7;
    board[row][col] = cells[i].style.backgroundColor;
  }
  return board;
};

startNewGame();
