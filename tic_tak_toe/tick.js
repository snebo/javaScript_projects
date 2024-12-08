function GameBoard() {
	const ROWS = 3;
	const COLS = 3;

	let board = [];
	for (i = 0; i < ROWS * COLS; i++) {
		board[i] = Cell();
	}

	const displayBoard = (pl1, pl2) => {
		let table = '';
		let cell = 0;
		for (r = 0; r < ROWS; r++) {
			table += `${board[cell].getValue()} | ${board[
				cell + 1
			].getValue()} | ${board[cell + 2].getValue()}\n`;
			if (r !== ROWS - 1) {
				table += '---------\n';
			}
			cell += 3;
		}
		console.log(
			`\n\n${pl1.getName()}: ${pl1.getScore()} | ${pl2.getName()}: ${pl2.getScore()}`
		);
		console.log('--------------------');
		console.log(table);
	};

	const resetBoard = () => {
		board.forEach((cell) => {
			cell.setValue(0);
		});
		displayBoard();
	};
	return { board, displayBoard, resetBoard };
}

function Cell() {
	let value = '-';
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
		score++;
	};
	const getScore = () => score;

	return { getName, getToken, addToScore, getScore };
}

function GameController() {
	const Players = [Player('Willis', 'x'), Player('Tony', 'o')];
	let activePlayer = Players[0];
	var isPlaying = true;

	const switchPlayerTurn = () => {
		activePlayer = activePlayer == Players[0] ? Players[1] : Players[0];
	};

	board = GameBoard();

	const playTurn = (spot) => {
		spot = spot - 1; // makes it easier for user input
		console.log(
			`\n\n${activePlayer.getName()} is playing... ${activePlayer.getToken()} on tile ${
				spot + 1
			}`
		);
		if (board.board[spot] && board.board[spot].getValue() === '-') {
			board.board[spot].setValue(activePlayer.getToken());
			checkRoundStatus(); // check for wins and tie
			switchPlayerTurn();
		} else {
			console.log('invalid move');
		}

		console.log(board.displayBoard(Players[0], Players[1]));
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
				board.board[winConditions[i][0]].getValue() !== '-'
			) {
				return true;
			}
		}
		return false;
	};
	const isFreeCells = () => {
		EmptyCells = board.board.some((cell) => cell.getValue() === '-');
		return EmptyCells;
	};
	const checkRoundStatus = () => {
		// check for a win
		if (isroundWon()) {
			//returns true if there is a win
			isPlaying = false;
			console.log(`Player ${activePlayer.getName()} wins!`);
			activePlayer.addToScore();
		} else if (!isFreeCells()) {
			isPlaying = false;
			console.log('Tie game');
		}
	};
	const getRoundStatus = () => isPlaying;

	return {
		playTurn,
		getRoundStatus,
	};
}
game = GameController();
while (game.getRoundStatus()) {
	num = Math.floor(Math.random() * (10 - 1) + 1);
	game.playTurn(num);
}
