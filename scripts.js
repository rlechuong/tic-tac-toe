const gameBoard = (function () {
  const gameBoard = [];
  let rows = 3;
  let columns = 3;
  let win = false;
  let tie = false;
  let winningSquares = [];

  const createNewGameBoard = function () {
    win = false;
    tie = false;
    winningSquares = [];
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

  // Primarily used for the console version
  const checkSquarePlayable = function (row, column) {
    if (gameBoard[row][column] === "") {
      console.log(`Valid Square`);
      return true;
    } else {
      console.log(`Invalid Square. Try Again.`);
      return false;
    }
  };

  const fillSquare = function (row, column, mark) {
    gameBoard[row][column] = mark;
    checkWin();
    checkTie();
  };

  const checkWin = function () {
    // First Row
    if (
      gameBoard[0][0] === gameBoard[0][1] &&
      gameBoard[0][0] === gameBoard[0][2] &&
      gameBoard[0][0] !== ""
    ) {
      winningSquares.push([0, 0]);
      winningSquares.push([0, 1]);
      winningSquares.push([0, 2]);
      win = true;
    }
    // Second Row
    else if (
      gameBoard[1][0] === gameBoard[1][1] &&
      gameBoard[1][0] === gameBoard[1][2] &&
      gameBoard[1][0] !== ""
    ) {
      winningSquares.push([1, 0]);
      winningSquares.push([1, 1]);
      winningSquares.push([1, 2]);
      win = true;
    }
    // Third Row
    else if (
      gameBoard[2][0] === gameBoard[2][1] &&
      gameBoard[2][0] === gameBoard[2][2] &&
      gameBoard[2][0] !== ""
    ) {
      winningSquares.push([2, 0]);
      winningSquares.push([2, 1]);
      winningSquares.push([2, 2]);
      win = true;
    }
    // First Column
    else if (
      gameBoard[0][0] === gameBoard[1][0] &&
      gameBoard[0][0] === gameBoard[2][0] &&
      gameBoard[0][0] !== ""
    ) {
      winningSquares.push([0, 0]);
      winningSquares.push([1, 0]);
      winningSquares.push([2, 2]);
      win = true;
    }
    // Second Column
    else if (
      gameBoard[0][1] === gameBoard[1][1] &&
      gameBoard[0][1] === gameBoard[2][1] &&
      gameBoard[0][1] !== ""
    ) {
      winningSquares.push([0, 1]);
      winningSquares.push([1, 1]);
      winningSquares.push([2, 1]);
      win = true;
    }
    // Third Column
    else if (
      gameBoard[0][2] === gameBoard[1][2] &&
      gameBoard[0][2] === gameBoard[2][2] &&
      gameBoard[0][2] !== ""
    ) {
      winningSquares.push([0, 2]);
      winningSquares.push([1, 2]);
      winningSquares.push([2, 2]);
      win = true;
    }
    // Top-Left -> Bottom-Right Diagonal
    else if (
      gameBoard[0][0] === gameBoard[1][1] &&
      gameBoard[0][0] === gameBoard[2][2] &&
      gameBoard[0][0] !== ""
    ) {
      winningSquares.push([0, 0]);
      winningSquares.push([1, 1]);
      winningSquares.push([2, 2]);
      win = true;
    }
    // Bottom-Left -> Top-Right Diagonal
    else if (
      gameBoard[2][0] === gameBoard[1][1] &&
      gameBoard[2][0] === gameBoard[0][2] &&
      gameBoard[2][0] !== ""
    ) {
      winningSquares.push([2, 0]);
      winningSquares.push([1, 1]);
      winningSquares.push([0, 2]);
      win = true;
    } else {
      win = false;
    }
  };

  const checkTie = function () {
    for (i = 0; i < rows; i++) {
      for (j = 0; j < columns; j++) {
        if (gameBoard[i][j] === "") {
          tie = false;
          return;
        }
      }
    }
    tie = true;
  };

  const getWin = function () {
    return win;
  };

  const getTie = function () {
    return tie;
  };

  const getWinningSquares = function () {
    return winningSquares;
  };

  return {
    createNewGameBoard,
    getGameBoard,
    getRows,
    getColumns,
    getSquareValue,
    checkSquarePlayable,
    fillSquare,
    getWin,
    getTie,
    getWinningSquares,
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
    active = false;
    gameBoard.createNewGameBoard();
    setStatusMessage();
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
    return statusMessage;
  };

  const setStatusMessage = function () {
    if (round === 1 && active === false) {
      statusMessage = `Please Enter Names`;
    } else if (round !== 1 && active === false && gameBoard.getWin() === true) {
      statusMessage = `Game Over! ${currentPlayer.name} has won!`;
    } else if (round !== 1 && active === false && gameBoard.getTie() === true) {
      statusMessage = `The game has ended in a tie.`;
    } else {
      statusMessage = `Move ${round}. It is ${currentPlayer.name}'s (${currentPlayer.mark}) turn.`;
    }
  };

  const playRound = function (row, column) {
    let mark = currentPlayer.mark;

    // First if statement primarily used for the console version
    if (gameBoard.checkSquarePlayable(row, column)) {
      gameBoard.fillSquare(row, column, mark);

      if (gameBoard.getWin() || gameBoard.getTie()) {
        active = false;
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

  return { init, start, playRound, getStatusMessage };
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
    resetButton.setAttribute("style", "display:none");
    nameFormContainer.setAttribute("style", "display:block");
    updateBoard();
    updateStatus();
    disableBoard();
  };

  const reload = function () {
    resetButton.setAttribute("style", "display:block");
    nameFormContainer.setAttribute("style", "display:none");
    updateBoard();
    clickEventToSquares();
    updateStatus();
  };

  const showGameEnd = function () {
    resetButton.setAttribute("style", "display:block");
    nameFormContainer.setAttribute("style", "display:none");
    colorWinningSquares();
    disableBoard();
  };

  const disableBoard = function () {
    const squareList = document.querySelectorAll(".square");

    squareList.forEach(function (square) {
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

  const colorWinningSquares = function () {
    const squareList = document.querySelectorAll(".square");

    squareList.forEach(function (square) {
      let row = square.getAttribute("data-row");
      let column = square.getAttribute("data-column");

      gameBoard.getWinningSquares().forEach(function (winningSquare) {
        if (
          winningSquare[0] === Number(row) &&
          winningSquare[1] === Number(column)
        ) {
          square.setAttribute("style", "background-color: #EBFFEB");
        }
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
    reload,
    showGameEnd,
    getPlayerOneName,
    getPlayerTwoName,
  };
})();

game.init();
