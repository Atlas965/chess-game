// Create the chessboard
const board = document.getElementById('chessboard');
const pieces = {
  r: 'Rook_black.png',
  n: 'Knight_black.png',
  b: 'Bishop_black.png',
  q: 'Queen_black.png',
  k: 'king_black.png',
  p: 'Pawn_black.png',
  R: 'Rook_white.png',
  N: 'Knight_white.png',
  B: 'Bishop_white.png',
  Q: 'Queen_white.png',
  K: 'King_white.png',
  P: 'Pawn_white.png'
};

// Initial chessboard layout
const initialPosition = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

// Function to create chessboard
function createBoard() {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.classList.add((row + col) % 2 === 0 ? 'light' : 'dark');
      square.dataset.row = row;
      square.dataset.col = col;

      const piece = initialPosition[row][col];
      if (piece) {
        const img = document.createElement('img');
        img.src = `images/${pieces[piece]}`;
        img.dataset.piece = piece;
        square.appendChild(img);
      }

      board.appendChild(square);
    }
  }
}

// Track selected piece
let selectedPiece = null;

// Add event listeners for interaction
function addListeners() {
  document.querySelectorAll('.square').forEach(square => {
    square.addEventListener('click', () => handleSquareClick(square));
  });
}

// Handle square click
function handleSquareClick(square) {
  if (selectedPiece) {
    // Move selected piece
    movePiece(selectedPiece, square);
    selectedPiece = null;
    clearHighlights();
  } else if (square.querySelector('img')) {
    // Select piece
    selectedPiece = square;
    highlightMoves(square);
  }
}

// Highlight possible moves (basic example, expand for actual chess rules)
function highlightMoves(square) {
  clearHighlights();
  square.classList.add('highlight');

  const row = parseInt(square.dataset.row);
  const col = parseInt(square.dataset.col);

  // Highlight adjacent squares for demo (replace with valid moves logic)
  const possibleMoves = [
    { row: row + 1, col },
    { row: row - 1, col },
    { row, col: col + 1 },
    { row, col: col - 1 }
  ];

  possibleMoves.forEach(move => {
    const target = document.querySelector(
      `.square[data-row="${move.row}"][data-col="${move.col}"]`
    );
    if (target) target.classList.add('highlight');
  });
}

// Move piece to new square
function movePiece(fromSquare, toSquare) {
  if (toSquare.classList.contains('highlight')) {
    const piece = fromSquare.querySelector('img');
    if (piece) {
      toSquare.appendChild(piece);
      fromSquare.innerHTML = '';
    }
  }
}
// rotaional functionality
let currentRotation = 0;

function rotateBoard() {
  const chessboard = document.getElementById('chessboard');
  const pieces = document.querySelectorAll('.chess-piece');

  // Increment rotation
  currentRotation += 180;
  chessboard.style.transform = `rotate(${180}deg)`;

  // Apply flipping effect to pieces
  pieces.forEach((piece) => {
    piece.style.transform = `rotateY(${180}deg)`; // Flips in sync with the board
  });
}

// Add event listener to the button
document.getElementById('rotate-button').addEventListener('click', rotateBoard);
// each chess pieces moves on the board
// Define the chessboard as an 8x8 array

// Store the selected piece and valid moves
let currentPiece = null;
let highlightedSquares = [];

// Initialize pieces (e.g., pawns, rooks, etc.)
const currentPiecepieces = {
  rook: (row, col) => {
    const moves = [];
    for (let i = 0; i < 8; i++) {
      if (i !== row) moves.push({ row: i, col }); // Vertical moves
      if (i !== col) moves.push({ row, col: i }); // Horizontal moves
    }
    return moves;
  },
  bishop: (row, col) => {
    const moves = [];
    for (let i = 1; i < 8; i++) {
      if (row + i < 8 && col + i < 8) moves.push({ row: row + i, col: col + i });
      if (row - i >= 0 && col - i >= 0) moves.push({ row: row - i, col: col - i });
      if (row + i < 8 && col - i >= 0) moves.push({ row: row + i, col: col - i });
      if (row - i >= 0 && col + i < 8) moves.push({ row: row - i, col: col + i });
    }
    return moves;
  },
  // Add logic for king, queen, knight, pawn here...
};

// swapping function
// Function to swap pieces
function swapPieces(fromRow, fromCol, toRow, toCol) {
  // Validate positions
  if (
    fromRow < 0 || fromRow >= 8 ||
    fromCol < 0 || fromCol >= 8 ||
    toRow < 0 || toRow >= 8 ||
    toCol < 0 || toCol >= 8
  ) {
    console.error("Invalid board coordinates!");
    return;
  }

  // Perform the swap
  const temp = chessboard[fromRow][fromCol];
  chessboard[fromRow][fromCol] = chessboard[toRow][toCol];
  chessboard[toRow][toCol] = temp;

  console.log("Pieces swapped!");
  displayBoard(); // Call a function to display the updated board
}

// Debugging: Display the board in the console
function displayBoard() {
  console.clear();
  console.table(chessboard);
}




// Clear highlights
function clearHighlights() {
  document.querySelectorAll('.highlight').forEach(square => {
    square.classList.remove('highlight');
  });
}

// Initialize game
createBoard();
addListeners();
