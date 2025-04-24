const gameBoard = (function () {
  const gameBoard = [];
  let rows = 3;
  let columns = 3;

  for (i = 0; i < rows; i++) {
    gameBoard[i] = [];
    for (j = 0; j < columns; j++) {
      gameBoard[i][j] = `${i}${j}`;
    }
  }

  const getBoard = function () {
    console.log(gameBoard);
    return gameBoard;
  };

  const playSquare = function (row, column, mark) {
    gameBoard[row][column] = mark;
    console.log(gameBoard);
    console.log(this.checkWin());
  };

  const checkWin = function () {
    // First Row
    if (
      gameBoard[0][0] === gameBoard[0][1] &&
      gameBoard[0][0] === gameBoard[0][2]
    ) {
      return true;
    }
    // Second Row
    else if (
      gameBoard[1][0] === gameBoard[1][1] &&
      gameBoard[1][0] === gameBoard[1][2]
    ) {
      return true;
    }
    // Third Row
    else if (
      gameBoard[2][0] === gameBoard[2][1] &&
      gameBoard[2][0] === gameBoard[2][2]
    ) {
      return true;
    }
    // First Column
    else if (
      gameBoard[0][0] === gameBoard[1][0] &&
      gameBoard[0][0] === gameBoard[2][0]
    ) {
      return true;
    }
    // Second Column
    else if (
      gameBoard[0][1] === gameBoard[1][1] &&
      gameBoard[0][1] === gameBoard[2][1]
    ) {
      return true;
    }
    // Third Column
    else if (
      gameBoard[0][2] === gameBoard[1][2] &&
      gameBoard[0][2] === gameBoard[2][2]
    ) {
      return true;
    }
    // Top-Left -> Bottom-Right Diagonal
    else if (
      gameBoard[0][0] === gameBoard[1][1] &&
      gameBoard[0][0] === gameBoard[2][2]
    ) {
      return true;
    }
    // Bottom-Left -> Top-Right Diagonal
    else if (
      gameBoard[2][0] === gameBoard[1][1] &&
      gameBoard[2][0] === gameBoard[0][2]
    ) {
      return true;
    } else {
      return false;
    }
  };

  return { getBoard, playSquare, checkWin };
})();

// function Player(name, mark) {
//   return { name, mark };
// }

// function Game() {
//   const player1 = Player("Player1", "X");
//   const player2 = Player("Player2", "O");

//   let turn = 1;

//   const playTurn = function () {};
// }

gameBoard.getBoard();
gameBoard.playSquare(2, 0, "X");
gameBoard.playSquare(1, 1, "X");
gameBoard.playSquare(0, 2, "X");
