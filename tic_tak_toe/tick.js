const container = document.querySelector(".game_board");
function GameBoard() {
  const ROWS = 3;
  const COLS = 3;

  let board = [];
  for (i = 0; i < ROWS * COLS; i++) {
    board[i] = Cell();
  }

  const displayBoard = (pl1, pl2) => {
    let table = "";
    let cell = 0;
    for (r = 0; r < ROWS; r++) {
      table += `${board[cell].getValue()} | ${board[cell + 1].getValue()} | ${board[
        cell + 2
      ].getValue()}\n`;
      if (r !== ROWS - 1) {
        table += "---------\n";
      }
      cell += 3;
    }
    console.log(`\n\n${pl1.getName()}: ${pl1.getScore()} | ${pl2.getName()}: ${pl2.getScore()}`);
    console.log("--------------------");
    console.log(table);
  };

  const drawBoard = () => {
    container.innerHTML = "";
    for (i = 0; i < board.length; i++) {
      let cell = document.createElement("div");
      cell.classList.add(`cell`);
      cell.setAttribute("id", i);
      content = document.createElement("p");
      // content.textContent = board[i].getValue();
      if (board[i].getValue() === "-") {
        content.textContent = "";
      } else {
        content.textContent = board[i].getValue();
      }
      cell.appendChild(content);
      container.appendChild(cell);
      console.log(cell);
    }
  };

  const resetBoard = () => {
    board.forEach((cell) => {
      cell.setValue("-");
    });
  };
  return { board, displayBoard, resetBoard, drawBoard };
}

function Cell() {
  let value = "-";
  const setValue = (token) => {
    value = token;
  };
  const getValue = () => value;
  return {
    getValue,
    setValue,
  };
}

function Player(name, token) {
  const getName = () => name;
  const getToken = () => token;
  let score = 0;
  const addToScore = () => {
    score += 1;
  };
  const getScore = () => score;

  return { getName, getToken, addToScore, getScore };
}

function GameController(pl1, pl2) {
  const Players = [Player(pl1, "X"), Player(pl2, "O")];
  let activePlayer = Players[0];
  var isPlaying = true;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer == Players[0] ? Players[1] : Players[0];
  };

  board = GameBoard();
  board.drawBoard();
  const playTurn = async (spot) => {
    spot = spot - 1; // makes it easier for user input
    console.log(
      `\n\n${activePlayer.getName()} is playing... ${activePlayer.getToken()} on tile ${spot + 1}`
    );
    if (board.board[spot] && board.board[spot].getValue() === "-") {
      board.board[spot].setValue(activePlayer.getToken());

      console.log(board.displayBoard(Players[0], Players[1]));
      board.drawBoard();
      await checkRoundStatus(); // check for wins and tie
      switchPlayerTurn();

    } else {
      console.log("invalid move");
      board.drawBoard();
    }
  };

  const isroundWon = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (i = 0; i < winConditions.length; i++) {
      if (
        board.board[winConditions[i][0]].getValue() ===
        board.board[winConditions[i][1]].getValue() &&
        board.board[winConditions[i][0]].getValue() ===
        board.board[winConditions[i][2]].getValue() &&
        board.board[winConditions[i][0]].getValue() !== "-"
      ) {
        return true;
      }
    }
    return false;
  };
  const isFreeCells = () => {
    EmptyCells = board.board.some((cell) => cell.getValue() === "-");
    return EmptyCells;
  };
  const displayScore = () => {
    console.log(activePlayer.getName())
    console.log(activePlayer == Players[0])
    if (activePlayer == Players[0]) {
      console.log("score", Players[0].getScore())
      document.querySelector('#player1_score').textContent = Players[0].getScore()
    } else {
      document.querySelector('#player2_score').textContent = Players[1].getScore()
    }
  }
  const checkRoundStatus = async () => {
    // check for a win
    if (isroundWon()) {
      activePlayer.addToScore();
      displayScore()
      board.drawBoard()
      //returns true if there is a win
      isPlaying = false;
      console.log(`Player ${activePlayer.getName()} wins!`);
      await new Promise((resolve) => setTimeout(resolve, 100));
      alert(`Player ${activePlayer.getName()} wins!`);
      board.resetBoard();
      board.drawBoard()

      // display the score

    } else if (!isFreeCells()) {
      isPlaying = false;
      console.log("Tie game");
      await new Promise((resolve) => setTimeout(resolve, 100));
      alert("Tie game");
      board.resetBoard();
      board.drawBoard()
    }
  };

  const startnewRound = () => {
    board.resetBoard();
    board.drawBoard();
    isPlaying = true;
  };
  const getRoundStatus = () => isPlaying;
  const getActivePlayer = () => activePlayer;
  const getCurrentBoard = () => board;
  const draw = () => board.drawBoard();

  return {
    playTurn,
    getRoundStatus,
    getActivePlayer,
    startnewRound,
    getCurrentBoard,
    draw,
  };
}

/** run automated console game **/
// game = GameController('willis', 'x', 'tony', 'o');
// while (game.getRoundStatus()) {
// 	num = Math.floor(Math.random() * (10 - 1) + 1);
// 	game.playTurn(num);
// }

/** run interactive game with popups and dev panel */
var pl1_name;
var pl2_name;
var game;

start_btn = document.querySelector("#startBtn");
start_btn.addEventListener("click", (e) => {
  pl1_name = document.querySelector("#pl1").value;
  pl2_name = document.querySelector("#pl2").value;
  if (pl1_name !== "" && pl2_name !== "") {
    start_btn.disabled = true;
    startGame();
    e.target.disabled = true;
    e.target.style.cursor = "default";
    e.target.style.backgroundColor = "grey";
  }
});
const startGame = () => {
  let playingGame = true;
  game = GameController(pl1_name, pl2_name);
  initDomListners();
};
function initDomListners() {
  const board = document.querySelector(".game_board"); // Parent element containing cells
  board.addEventListener("click", handleclick);
}

function handleclick(event) {
  // Ensure the clicked element is a cell
  if (event.target.classList.contains("cell")) {
    game.playTurn(parseInt(event.target.id) + 1);
  }
}