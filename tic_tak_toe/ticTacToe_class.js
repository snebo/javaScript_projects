const container = document.querySelector(".game_board");
class GameBoard {

	constructor() {
		this.ROWS = 3;
		this.COLS = 3;
		this.board = []

		for (let i = 0; i < this.ROWS * this.COLS; i++) {
			this.board[i] = new Cell();
		}
	}

	displayBoard(pl1, pl2) {
		let table = "";
		let cell = 0;
		for (let r = 0; r < this.ROWS; r++) {
			table += `${this.board[cell].getValue()} | ${this.board[cell + 1].getValue()} | ${this.board[
				cell + 2
			].getValue()}\n`;
			if (r !== this.ROWS - 1) {
				table += "---------\n";
			}
			cell += 3;
		}
		console.log(`\n\n${pl1.getName()}: ${pl1.getScore()} | ${pl2.getName()}: ${pl2.getScore()}`);
		console.log("--------------------");
		console.log(table);
	};

	drawBoard() {
		container.innerHTML = "";
		for (let i = 0; i < this.board.length; i++) {
			let cell = document.createElement("div");
			cell.classList.add(`cell`);
			cell.setAttribute("id", i);
			const content = document.createElement("p");
			// content.textContent = board[i].getValue();
			if (this.board[i].getValue() === "-") {
				content.textContent = "";
			} else {
				content.textContent = this.board[i].getValue();
			}
			cell.appendChild(content);
			container.appendChild(cell);
			console.log(cell);
		}
	};

	resetBoard() {
		this.board.forEach((cell) => {
			cell.setValue("-");
		});
	};
}

class Cell {
	constructor() {
		this.value = '-'
	}

	setValue(token) {
		this.value = token;
	};
	getValue() { return this.value };
}

class Player {
	constructor(name, token) {
		this.name = name;
		this.token = token
		this.score = 0
	}
	getName() { return this.name };
	getToken() { return this.token };

	addToScore() {
		this.score += 1;
	}
	getScore() { return this.score };
}

class GameController {
	constructor(pl1, pl2) {
		this.Players = [new Player(pl1, "X"), new Player(pl2, "O")]
		this.activePlayer = this.Players[0]
		this.isPlaying = true
		this.board = new GameBoard();
		this.board.drawBoard(); // draw the baord on game start
	}

	switchPlayerTurn() {
		this.activePlayer = this.activePlayer == this.Players[0] ? this.Players[1] : this.Players[0];
	};



	async playTurn(spot) {
		spot = spot - 1; // makes it easier for user input
		console.log(
			`\n\n${this.activePlayer.getName()} is playing... ${this.activePlayer.getToken()} on tile ${spot + 1}`
		);
		if (this.board.board[spot] && this.board.board[spot].getValue() === "-") {
			this.board.board[spot].setValue(this.activePlayer.getToken());

			console.log(this.board.displayBoard(this.Players[0], this.Players[1]));
			this.board.drawBoard();
			await this.checkRoundStatus(); // check for wins and tie
			this.switchPlayerTurn();

		} else {
			console.log("invalid move");
			this.board.drawBoard();
		}
	};

	isroundWon() {
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
		for (let i = 0; i < winConditions.length; i++) {
			if (
				this.board.board[winConditions[i][0]].getValue() ===
				this.board.board[winConditions[i][1]].getValue() &&
				this.board.board[winConditions[i][0]].getValue() ===
				this.board.board[winConditions[i][2]].getValue() &&
				this.board.board[winConditions[i][0]].getValue() !== "-"
			) {
				return true;
			}
		}
		return false;
	};
	isFreeCells() {
		const EmptyCells = this.board.board.some((cell) => cell.getValue() === "-");
		return EmptyCells;
	};
	displayScore() {
		console.log(this.activePlayer.getName())
		console.log(this.activePlayer == this.Players[0])
		if (this.activePlayer == this.Players[0]) {
			console.log("score", this.Players[0].getScore())
			document.querySelector('#player1_score').textContent = this.Players[0].getScore()
		} else {
			document.querySelector('#player2_score').textContent = this.Players[1].getScore()
		}
	}
	async checkRoundStatus() {
		// check for a win
		if (this.isroundWon()) {
			this.activePlayer.addToScore();
			this.displayScore()
			this.board.drawBoard()
			//returns true if there is a win
			this.isPlaying = false;
			console.log(`Player ${this.activePlayer.getName()} wins!`);
			await new Promise((resolve) => setTimeout(resolve, 100));
			alert(`Player ${this.activePlayer.getName()} wins!`);
			this.board.resetBoard();
			this.board.drawBoard()

			// display the score

		} else if (!this.isFreeCells()) {
			this.isPlaying = false;
			console.log("Tie game");
			await new Promise((resolve) => setTimeout(resolve, 100));
			alert("Tie game");
			this.board.resetBoard();
			this.board.drawBoard()
		}
	};

	startnewRound() {
		this.board.resetBoard();
		this.board.drawBoard();
		this.isPlaying = true;
	};
	getRoundStatus() { this.isPlaying }
	getActivePlayer() { this.activePlayer }
	getCurrentBoard() { return this.board };
	draw() { this.board.drawBoard() }
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
	game = new GameController(pl1_name, pl2_name);
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