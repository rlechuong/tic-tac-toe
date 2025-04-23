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

  return { getBoard };
})();

function Player() {}

function Game() {}

gameBoard.getBoard();
