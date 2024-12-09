const container = document.querySelector('.game_board');
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

	const drawBoard = () => {
		container.innerHTML = '';
		for (i = 0; i < board.length; i++) {
			let cell = document.createElement('div');
			cell.classList.add(`cell`);
			cell.setAttribute('id', i);
			content = document.createElement('p');
			// content.textContent = board[i].getValue();
			if (board[i].getValue() === '-') {
				content.textContent = '';
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
			cell.setValue('-');
		});
	};
	return { board, displayBoard, resetBoard, drawBoard };
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

function GameController(pl1, pl2) {
	const Players = [Player(pl1, 'X'), Player(pl2, 'O')];
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
		board.drawBoard();
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
			alert(`Player ${activePlayer.getName()} wins!`);
			board.resetBoard();
		} else if (!isFreeCells()) {
			isPlaying = false;
			console.log('Tie game');
			alert('Tie game');
			board.resetBoard();
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

/** run automated game **/
// game = GameController('willis', 'x', 'tony', 'o');
// while (game.getRoundStatus()) {
// 	num = Math.floor(Math.random() * (10 - 1) + 1);
// 	game.playTurn(num);
// }

/** run interactive game with popups and dev panel */
var pl1_name;
var pl2_name;
var game;

start_btn = document.querySelector('#startBtn');
start_btn.addEventListener('click', () => {
	pl1_name = document.querySelector('#pl1').value;
	pl2_name = document.querySelector('#pl2').value;
	if (pl1_name !== '' && pl2_name !== '') {
		start_btn.disabled = true;
		startGame();
	}
});
var startGame = () => {
	let playingGame = true;
	console.log(pl1_name, pl2_name);
	game = GameController(pl1_name, pl2_name);
	console.log(game);
};

// const grid_container = document.querySelector('.game_board');

// document.querySelector('#startBtn').addEventListener('click', (e) => {
// 	console.log('clicked me');
// 	pl1_name = document.querySelector('#player1').value;
// 	pl1_token = document.querySelector('#player1_token').value;

// 	pl2_name = document.querySelector('#player2').value;
// 	pl2_token = document.querySelector('#player2_token').value;
// 	if (
// 		pl1_name !== '' &&
// 		pl1_token !== '' &&
// 		pl2_name !== '' &&
// 		pl2_token !== ''
// 	) {
// 		console.log(pl1_name, pl1_token, pl2_name, pl2_token);
// 		e.target.disabled = true;
// 		startGame(pl1_name, pl1_token, pl2_name, pl2_token);
// 	} else {
// 		alert('Please enter player names and tokens');
// 	}
// 	startGame();
// });
// function startGame(name1, token1, name2, token2) {
// 	game = GameController(name1, token1, name2, token2);
// 	let playingGame = true;
// 	game.draw();

// 	spaces = document.querySelectorAll('.cell');
// 	spaces.forEach((space) => {
// 		space.addEventListener('click', (e) => {
// 			if (playingGame) {
// 				let choice = Number(e.target.id);
// 				game.playTurn(choice);
// 			}
// 		});
// 	});

// 	// while (playingGame) {
// 	// 	while (game.getRoundStatus()) {
// 	// 		let choice = Number(
// 	// 			prompt(
// 	// 				`${game.getActivePlayer().getName()}'Please eneter select a spot 1-9 `
// 	// 			)
// 	// 		);
// 	// 		if (choice === 'exit') {
// 	// 			break;
// 	// 		}
// 	// 		game.playTurn(choice);
// 	// 	}
// 	// 	let response = prompt('Do you want to continue? (y/n)');
// 	// 	if (response.toLowerCase() === 'n' || response.toLowerCase() === 'no') {
// 	// 		playingGame = false;
// 	// 	} else if (
// 	// 		response.toLowerCase() === 'y' ||
// 	// 		response.toLowerCase() === 'yes'
// 	// 	) {
// 	// 		game.startnewRound();
// 	// 	}
// 	// }
// }
