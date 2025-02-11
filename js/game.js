let enemy_left = 1000;
let on_ground = true;
let gameOverScreen = document.getElementById('gameOver');
let restartButton = document.getElementById('restart');
let timerElement = document.getElementById('timer');
let gameRunning = false;
let countdown = 3;
let countdownInterval;
let gameOver = false; // New flag to track if the game is over


//Diese Funktion ist der Timer und leitet nach Ablauf auf die game.html weiter.
window.onload = function() {
    let countdown = 4;
    const timerElement = document.getElementById("timer");

    countdownInterval = setInterval(function() {
        countdown--;
        timerElement.textContent = countdown;

        if (countdown <= 0) {
            clearInterval(countdownInterval);
            gameRunning = true;
            window.location.href = "game.html"; // Redirect to game page when countdown ends
        }
    }, 1000);
};
// Dies ist der Gametimer, welcher während des Spiels kontinuierlich mitlaufen soll.
let timer = 0; // Timer-Variable in Millisekunden
let gameActive = true; // Flag, um den Spielstatus zu verfolgen

// Timer-Intervall
const timerInterval = setInterval(() => {
    if (gameActive) {
        timer += 100; // Timer um 100 Millisekunden erhöhen
        
        // Zeit in Minuten und Sekunden umrechnen
        const minutes = Math.floor((timer / 1000) / 60);
        const seconds = Math.floor((timer / 1000) % 60);
        
        // Formatieren der Zeit im Format "00:00"
        const formattedTime = String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
        
        // Timer anzeigen
        document.getElementById('gametimer').textContent = formattedTime;
    }
}, 100); // Alle 100 Millisekunden erhöhen

function updateGame() {
    if (!gameRunning) return;

    enemy.style.left = enemy_left + 'px';
    enemy_left -= 10;
    if (enemy_left < 150 && on_ground) {
        endGame();
    }
    if (enemy_left < 0) {
        enemy_left = 1000;
    }
    requestAnimationFrame(updateGame);
}

function jump() {
    if (!gameRunning || gameOver) return; // Prevent jumping after game is over
    character.style.top = '250px';
    on_ground = false;
    setTimeout(() => {
        character.style.top = '500px';
    }, 200);
    setTimeout(() => {
        on_ground = true;
    }, 900);
}

function handleKeyPress(event) {
    if (gameOver) {
        resetGame(); // Reset the game after it is over
    } else {
        jump(); // Jump if the game is running and not over
    }
}

function endGame() {
    gameOver = true; // Set game over flag
    gameOverScreen.style.display = 'block';
    restartButton.style.display = 'block';
    gameRunning = false;
}

function resetGame() {
    // Hide the gameOver screen and button
    gameOverScreen.style.display = 'none';
    restartButton.style.display = 'none';
    gameOver = false; // Reset game over flag
    window.location.href = "index.html"; // Redirect to countdown screen (index.html)
}

// Handle game page load
if (window.location.pathname.endsWith("game.html")) {
    window.onload = function() {
        gameRunning = true;
        updateGame(); // Start the game loop
    };
}

// Handle index page load
if (window.location.pathname.endsWith("index.html")) {
    window.onload = startCountdown; // Start countdown when page loads
}

// Restart game on any key press after game is over, or jump otherwise
document.addEventListener("keydown", handleKeyPress);
document.addEventListener("click", handleKeyPress); // Ensure mouse click also works to jump
