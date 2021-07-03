let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = applyDifficulty();
let highscore = 0;
let gameIsOver = false;

const answerDisplayArea = document.querySelector(".number-display");
const messageArea = document.querySelector(".message");
const scoreDisplayArea = document.querySelector(".score");
const inputBox = document.querySelector(".input-box");
const checkButton = document.querySelector(".btn-check");
const playAgainButton = document.querySelector(".btn-play-again");
const playButton = document.querySelector(".btn-play");

function displayMessage(message) {
	messageArea.textContent = message;
}

function displayScore() {
	scoreDisplayArea.textContent = score;
}

function displayHighscore() {
	document.querySelector(".highscore").textContent = score;
}

function displaySecretNumber() {
	answerDisplayArea.textContent = `Secret Number: ${secretNumber}`;
}

function checkGuess() {
	const userGuess = Number(inputBox.value);

	if (gameIsOver) return;

	// checking if the guess is valid or not
	if (!userGuess || userGuess < 1 || userGuess > 20) {
		return displayMessage("Please enter a valid guess.");
	}
	// checking if the user guessed correctly
	if (userGuess === secretNumber) {
		gameIsOver = true;
		displayMessage("🎉 Correct Number!");
		displaySecretNumber();
		// update high score if score is greater than current high score
		score > highscore && displayHighscore();
		return;
	}

	// at this point, user has guessed incorrectly

	// checking if the user has any guesses left
	if (score <= 1) {
		score = 0;
		displayScore();
		displaySecretNumber();
		displayMessage("☹ You lost the game");
		return;
	}

	// deducting user's score
	score -= 1;
	displayScore();
	displayMessage(userGuess > secretNumber ? "❌ Too high" : "❌ Too low");
}

function applyDifficulty() {
	const difficulty = sessionStorage.getItem("difficulty");
	if (difficulty === "easy") return 15;
	if (difficulty === "hard") return 5;
	// normal difficulty
	return 10;
}

function reset() {
	gameIsOver = false;
	secretNumber = Math.trunc(Math.random() * 20) + 1;
	inputBox.value = "";
	answerDisplayArea.textContent = "Secret Number: ??";
	messageArea.textContent = "Start guessing...";
	score = applyDifficulty();
	displayScore();
}

displayScore();
checkButton.addEventListener("click", checkGuess);
playAgainButton.addEventListener("click", reset);
