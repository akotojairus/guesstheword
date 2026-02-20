// Array of possible secret words
const words = ["apple", "banana", "grape", "orange", "mango", "peach", "kiwi"];

// Game variables
let secretWord;
let attempts;
const maxAttempts = 5;

// Start the game
function startGame() {
    secretWord = words[Math.floor(Math.random() * words.length)];
    attempts = maxAttempts;

    console.log("Secret word (for testing):", secretWord);

    document.getElementById("message").textContent = 
        `You have ${attempts} attempts. Start guessing!`;

    document.getElementById("hint").textContent = 
        `Hint: The word starts with '${secretWord[0].toUpperCase()}'`;

    document.body.classList.remove("win", "lose");
}

startGame();

// Check guess
function checkGuess() {
    const input = document.getElementById("guessInput");
    let guess = input.value.trim().toLowerCase();

    if (guess === "") {
        attempts--;
        updateMessage(false);
        return;
    }

    if (guess === secretWord) {
        document.getElementById("message").textContent =
            "Congratulations! You guessed the secret word!";
        document.body.classList.add("win");
        disableInput();
        return;
    }

    attempts--;
    updateMessage(false);
}

// Update message after wrong guess
function updateMessage() {
    if (attempts > 0) {
        document.getElementById("message").textContent =
            `Incorrect guess. You have ${attempts} attempts left. Try again!`;
    } else {
        document.getElementById("message").textContent =
            `Game over! The secret word was '${secretWord}'.`;
        document.body.classList.add("lose");
        disableInput();
    }
}

// Disable input when game ends
function disableInput() {
    document.getElementById("guessInput").disabled = true;
}

// Restart game
function restartGame() {
    document.getElementById("guessInput").disabled = false;
    document.getElementById("guessInput").value = "";
    startGame();
}

// Allow Enter key submission
document.getElementById("guessInput").addEventListener("keypress", function(e){
    if (e.key === "Enter") checkGuess();
});