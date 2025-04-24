const gameBoard = (function () {
  const gameBoard = [];
  let rows = 3;
  let columns = 3;

  const createNewGameBoard = function () {
    for (i = 0; i < rows; i++) {
      gameBoard[i] = [];
      for (j = 0; j < columns; j++) {
        gameBoard[i][j] = "";
      }
    }
  };

  const getGameBoard = function () {
    return gameBoard;
  };

  const getRows = function () {
    return rows;
  };

  const getColumns = function () {
    return columns;
  };

  const getSquareValue = function (row, column) {
    return gameBoard[i][j];
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
    gameBoard[row][column] = mark;
    console.log(gameBoard);
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

  return {
    createNewGameBoard,
    getGameBoard,
    getRows,
    getColumns,
    getSquareValue,
    checkSquarePlayable,
    playSquare,
    checkWin,
    checkTie,
  };
})();

function Player(name, mark) {
  return { name, mark };
}

const game = (function () {
  const player1 = Player("Player1", "X");
  const player2 = Player("Player2", "O");

  let round = 1;
  let currentPlayer = player1;
  let gameOver = false;

  const reset = function () {
    round = 1;
    currentPlayer = player1;
    gameOver = false;
    gameBoard.createNewGameBoard();
    sayRound();

    displayController.init();
  };

  const sayRound = function () {
    console.log(`Round ${round}. It is ${currentPlayer.name}'s turn.`);
    return `Round ${round}. It is ${currentPlayer.name}'s turn.`;
  };

  // const refresh = function () {
  //   sayRound();
  // };

  const playRound = function (row, column) {
    let mark = currentPlayer.mark;

    if (gameBoard.checkSquarePlayable(row, column)) {
      gameBoard.playSquare(row, column, mark);

      if (gameBoard.checkWin()) {
        gameOver = true;
        console.log(`${currentPlayer.name} has won!`);
        reset();
      } else if (gameBoard.checkTie()) {
        gameOver = true;
        console.log(`The game has ended in a tie`);
        reset();
      } else {
        displayController.init();
        switchRound();
      }
    }
  };

  const switchRound = function () {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }

    round++;
    sayRound();
  };

  return { playRound, reset };
})();

const displayController = (function () {
  const boardContainer = document.querySelector("#board-container");

  const init = function () {
    boardContainer.textContent = "";

    for (i = 0; i < gameBoard.getRows(); i++) {
      for (j = 0; j < gameBoard.getColumns(); j++) {
        const newSquare = document.createElement("button");
        newSquare.setAttribute("class", "square");
        newSquare.setAttribute("data-row", i);
        newSquare.setAttribute("data-column", j);
        newSquare.textContent = gameBoard.getSquareValue(i, j);
        if (newSquare.textContent !== "") {
          newSquare.disabled = true;
        }
        boardContainer.appendChild(newSquare);
      }
    }
  };

  return { init };
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

// gameBoard.createNewGameBoard();
// game.playRound(0, 0);
// game.playRound(0, 1);
// game.playRound(0, 2);
// game.playRound(1, 1);
// game.playRound(1, 0);
// game.playRound(1, 2);
// game.playRound(2, 1);
// game.playRound(2, 0);
// game.playRound(2, 2);

game.reset();
