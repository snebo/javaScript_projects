function gameBoard() {
	const rows = 3;
	const cols = 3;
	var board = [];

	// ['00', '01', '02',
	//  '10', '11', '12',
	//  '20', '21', '22'];
	for (i = 0; i < rows; i++) {
		for (j = 0; j < cols; j++) {
			board.push(cell());
		}
	}
	const drawBoard = () => {
		let i = 0;
		let console_board = '';
		board.forEach((cell) => {
			if (i < 3) {
				console_board += `|${cell.getToken()}|`;
				i++;
			} else {
				console_board += `\n|${cell.getToken()}|`;
				i = 1;
			}
		});
		console.log(console_board);
	};

	const resetBoard = () => {
		board.forEach((cell) => {
			cell = cell();
		});
	};

	return {
		board,
		drawBoard,
		resetBoard,
	};
}

function cell() {
	let value = 0;
	const setToken = (playerToken) => {
		value = playerToken;
	};
	const getToken = () => value;
	return {
		setToken,
		getToken,
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

	return {
		getName,
		getToken,
		addToScore,
		getScore,
	};
}

function Game(Player("willis", 'x')(), Player("tony", 'o')()) {
	const board = gameBoard();
	let players = [pl1, pl2];
	let activePlayer = players[0];
	const switchPlayerTurn = () => {
		activePlayer = activePlayer[0] === players[0] ? players[1] : players[0];
	};
	const getActivePlayer = () => activePlayer;

	const printNewRound = () => {
		board.resetBoard();
	};

	const checkPlayerWin = () => {
        //win conditions for either side
		if (
			(board[0][0].getToken() === board[0][1].getToken()) ===
				board[0][2].getToken() ||
			(board[1][0].getToken() === board[1][1].getToken()) ===
				board[1][2].getToken() ||
			(board[2][0].getToken() === board[2][1].getToken()) ===
				board[2][2].getToken() ||
			(board[0][0].getToken() === board[1][1].getToken()) ===
				board[2][2].getToken() ||
			(board[0][2].getToken() === board[1][1].getToken()) ===
				board[2][0].getToken() ||
			(board[0][0].getToken() === board[1][0].getToken()) ===
				board[2][0].getToken() ||
			(board[0][1].getToken() === board[1][1].getToken()) ===
				board[2][1].getToken() ||
			(board[0][2].getToken() === board[1][1].getToken()) ===
				board[2][2].getToken()
		) {
			return true;
		} else {
			return false;
		}
	};
	const playRound = (getActivePlayer, a, b) => {
		if (board[a][b]) {
			board[a][b].setToken(activePlayer.getToken());
			board.drawBoard();

			// check for win
			if (checkPlayerWin()) {
				activePlayer.addToScore();
			}
			if (activePlayer.getScore >= 3) {
				return ' Game Won';
			}
		}
	};
}
Game.playRound;
