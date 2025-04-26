const gameBoard = (function () {
  const gameBoard = [];
  let rows = 3;
  let columns = 3;
  let winningSquares = [];

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
  const setName = function (newName) {
    this.name = newName;
  };

  return { name, mark, setName };
}

const game = (function () {
  let player1 = Player("", "X");
  let player2 = Player("", "O");

  let round = 1;
  let currentPlayer = player1;
  let statusMessage = "";
  let active = false;

  const init = function () {
    round = 1;
    currentPlayer = player1;
    setStatusMessage();
    gameBoard.createNewGameBoard();
    displayController.showGameStart();
  };

  const start = function () {
    active = true;
    let playerOneName = displayController.getPlayerOneName();
    let playerTwoName = displayController.getPlayerTwoName();
    player1.setName(playerOneName);
    player2.setName(playerTwoName);
    setStatusMessage();
    displayController.reload();
  };

  const getStatusMessage = function () {
    console.log(statusMessage);
    return statusMessage;
  };

  const setStatusMessage = function () {
    if (round === 1 && active === false) {
      statusMessage = `Please Enter Names`;
    } else if (
      round !== 1 &&
      active === false &&
      gameBoard.checkWin() === true
    ) {
      statusMessage = `Game Over! ${currentPlayer.name} has won!`;
    } else if (
      round !== 1 &&
      active === false &&
      gameBoard.checkTie() === true
    ) {
      statusMessage = `The game has ended in a tie.`;
    } else {
      statusMessage = `Move ${round}. It is ${currentPlayer.name}'s (${currentPlayer.mark}) turn.`;
    }
  };

  const playRound = function (row, column) {
    let mark = currentPlayer.mark;

    if (gameBoard.checkSquarePlayable(row, column)) {
      gameBoard.playSquare(row, column, mark);

      if (gameBoard.checkWin()) {
        active = false;
        console.log(`${currentPlayer.name} has won!`);
        setStatusMessage();
        displayController.reload();
        displayController.showGameEnd();
      } else if (gameBoard.checkTie()) {
        active = false;
        console.log(`The game has ended in a tie.`);
        setStatusMessage();
        displayController.reload();
        displayController.showGameEnd();
      } else {
        switchRound();
        displayController.reload();
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
    setStatusMessage();
  };

  return { playRound, init, start, getStatusMessage };
})();

const displayController = (function () {
  const boardContainer = document.querySelector("#board-container");
  const resetButton = document.querySelector("#restart-button");
  const nameFormContainer = document.querySelector("#name-form-container");
  const playerNameForm = document.querySelector("#name-form");
  const restartButton = document.querySelector("#restart-button");
  let playerOneName = "";
  let playerTwoName = "";

  const showGameStart = function () {
    nameFormContainer.setAttribute("style", "display:block");
    resetButton.setAttribute("style", "display:none");
    updateBoard();
    updateStatus();
    disableBoard();
  };

  const reload = function () {
    nameFormContainer.setAttribute("style", "display:none");
    updateBoard();
    clickEventToSquares();
    updateStatus();
  };

  const showGameEnd = function () {
    nameFormContainer.setAttribute("style", "display:none");
    resetButton.setAttribute("style", "display:block");
    disableBoard();
  };

  const disableBoard = function () {
    const squareList = document.querySelectorAll(".square");

    squareList.forEach(function (square) {
      console.log(square);
      square.disabled = true;
    });
  };

  // const enableBoard = function () {
  //   const squareList = document.querySelectorAll(".square");

  //   squareList.forEach(function (square) {
  //     console.log(square);
  //     square.disabled = false;
  //   });
  // };

  const updateBoard = function () {
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

  const clickEventToSquares = function () {
    const squareList = document.querySelectorAll(".square");

    squareList.forEach(function (square) {
      let row = square.getAttribute("data-row");
      let column = square.getAttribute("data-column");

      square.addEventListener("click", function () {
        game.playRound(row, column);
      });
    });
  };

  const updateStatus = function () {
    const statusContainer = document.querySelector("#status-container");

    statusContainer.textContent = "";
    statusContainer.textContent = game.getStatusMessage();
  };

  const startButton = document.querySelector("#start-button");

  startButton.addEventListener("click", (event) => {
    event.preventDefault();

    if (playerNameForm.reportValidity()) {
      playerOneName = document.querySelector("#player-one-name").value;
      playerTwoName = document.querySelector("#player-two-name").value;
      game.start();
    } else {
    }
  });

  restartButton.addEventListener("click", () => {
    game.init();
  });

  const getPlayerOneName = function () {
    return playerOneName;
  };

  const getPlayerTwoName = function () {
    return playerTwoName;
  };

  return {
    showGameStart,
    showGameEnd,
    reload,
    getPlayerOneName,
    getPlayerTwoName,
  };
})();

game.init();
