const gameBoard = (function () {
  const gameBoard = [];
  let rows = 3;
  let columns = 3;

  for (i = 0; i < rows; i++) {
    gameBoard[i] = [];
    for (j = 0; j < columns; j++) {
      gameBoard[i][j] = "";
    }
  }

  const getBoard = function () {
    return gameBoard;
  };

  const checkSquarePlayable = function (row, column) {
    if (gameBoard[row][column] === "") {
      console.log(`Valid Square`);
      return true;
    } else {
      console.log(`Invalid Square. Try Again.`);
      return false;
    }
  };

  const playSquare = function (row, column, mark) {
    if (checkSquarePlayable(row, column)) {
      gameBoard[row][column] = mark;
      console.log(gameBoard);
      console.log(`Win? ${checkWin()}`);
      console.log(`Tie? ${checkTie()}`);
    } else {
    }
  };

  const checkWin = function () {
    // First Row
    if (
      gameBoard[0][0] === gameBoard[0][1] &&
      gameBoard[0][0] === gameBoard[0][2] &&
      gameBoard[0][0] !== ""
    ) {
      return true;
    }
    // Second Row
    else if (
      gameBoard[1][0] === gameBoard[1][1] &&
      gameBoard[1][0] === gameBoard[1][2] &&
      gameBoard[1][0] !== ""
    ) {
      return true;
    }
    // Third Row
    else if (
      gameBoard[2][0] === gameBoard[2][1] &&
      gameBoard[2][0] === gameBoard[2][2] &&
      gameBoard[2][0] !== ""
    ) {
      return true;
    }
    // First Column
    else if (
      gameBoard[0][0] === gameBoard[1][0] &&
      gameBoard[0][0] === gameBoard[2][0] &&
      gameBoard[0][0] !== ""
    ) {
      return true;
    }
    // Second Column
    else if (
      gameBoard[0][1] === gameBoard[1][1] &&
      gameBoard[0][1] === gameBoard[2][1] &&
      gameBoard[0][1] !== ""
    ) {
      return true;
    }
    // Third Column
    else if (
      gameBoard[0][2] === gameBoard[1][2] &&
      gameBoard[0][2] === gameBoard[2][2] &&
      gameBoard[0][2] !== ""
    ) {
      return true;
    }
    // Top-Left -> Bottom-Right Diagonal
    else if (
      gameBoard[0][0] === gameBoard[1][1] &&
      gameBoard[0][0] === gameBoard[2][2] &&
      gameBoard[0][0] !== ""
    ) {
      return true;
    }
    // Bottom-Left -> Top-Right Diagonal
    else if (
      gameBoard[2][0] === gameBoard[1][1] &&
      gameBoard[2][0] === gameBoard[0][2] &&
      gameBoard[2][0] !== ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checkTie = function () {
    for (i = 0; i < rows; i++) {
      for (j = 0; j < columns; j++) {
        if (gameBoard[i][j] === "") {
          return false;
        }
      }
    }

    return true;
  };

  return { getBoard, checkSquarePlayable, playSquare, checkWin, checkTie };
})();

function Player(name, mark) {
  return { name, mark };
}

const game = (function () {
  const player1 = Player("Player1", "X");
  const player2 = Player("Player2", "O");

  let round = 1;
  let currentPlayer = player1;

  const sayRound = function () {
    console.log(`Round ${round}. It is ${currentPlayer.name}'s turn.`);
    return `Round ${round}. It is ${currentPlayer.name}'s turn.`;
  };

  const refresh = function () {
    sayRound();
  };

  const playRound = function (row, column) {
    let mark = currentPlayer.mark;

    gameBoard.playSquare(row, column, mark);

    switchRound();
  };

  const switchRound = function () {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }

    round++;
    refresh();
  };

  return { playRound, refresh };
})();

// // Check Win
// gameBoard.getBoard();
// gameBoard.playSquare(2, 0, "X");
// gameBoard.playSquare(1, 1, "X");
// gameBoard.playSquare(0, 2, "X");

// // Check Tie
// gameBoard.getBoard();
// gameBoard.playSquare(0, 0, "X");
// gameBoard.playSquare(0, 1, "O");
// gameBoard.playSquare(0, 2, "X");
// gameBoard.playSquare(1, 0, "O");
// gameBoard.playSquare(1, 1, "X");
// gameBoard.playSquare(1, 2, "O");
// gameBoard.playSquare(2, 0, "X");
// gameBoard.playSquare(2, 1, "O");
// gameBoard.playSquare(2, 2, "X");

// game.playRound();

// game.refresh();
