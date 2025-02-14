let enemy_left = 1000;
let on_ground = true;
let gameOverScreen = document.getElementById('gameOver');
let restartButton = document.getElementById('restart');
let timerElement = document.getElementById('timer');
let gameRunning = false;
let countdown = 3;
let countdownInterval;
let gameOver = false; // New flag to track if the game is over
let timer = 0; // Timer-Variable in milliseconds

let jumpSound = new Audio('../sfx/jump.mp3');
let deathSound = new Audio('../sfx/death.mp3');
let backgroundMusic = new Audio('../sfx/music.mp3');

backgroundMusic.loop = true;
backgroundMusic.play();

function moveBg() {
    let pos = 0;
    const bgEl = document.getElementById('background');
    const bgSpeed = 2;

    function animate() {
        pos += bgSpeed;
        bgEl.style.backgroundPosition = pos + "px 0px";
        requestAnimationFrame(animate);
    }
    animate();
}

function startBackgroundMusic() {
    backgroundMusic.loop = true; 
    backgroundMusic.play();
}

function stopBackgroundMusic() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
}

//countdown function to redirect the html page to game.html after timer has run out 
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
// gametimer which should be running while game is active
// Timer-Intervall
const timerInterval = setInterval(() => {
    if (gameRunning) {
        timer += 100; // rate by which timer is increased 
        
        // calculating the time in minutes and seconds
        const minutes = Math.floor((timer / 1000) / 60);
        const seconds = Math.floor((timer / 1000) % 60);
        
        // formatting the time to "00:00"
        const formattedTime = String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
        
        // show timer
        document.getElementById('gametimer').textContent = formattedTime;
    } else {
        // Stop the timer
        clearInterval(timerInterval);

        // calculating the final time in minutes and seconds
        const minutes = Math.floor((timer / 1000) / 60);
        const seconds = Math.floor((timer / 1000) % 60);

        // formatting the final time to "00:00"
        const formattedTime = String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');

        // Display the final time (e.g., in console or on the page)
        console.log('Timer stopped! You survived for: ' + formattedTime);
        document.getElementById('gametimer').textContent = 'You survived for: ' + formattedTime;
    }
}, 100); // increase every 100 milliseconds

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
    jumpSound.play();
    document.getElementById("character").style.backgroundImage = "url('../img/erde_jump.png')";
    setTimeout(() => {
        document.getElementById("character").style.backgroundImage = "url('../img/erde_jump.png')";
        character.style.top = '500px';
    }, 200);
    setTimeout(() => {
        document.getElementById("character").style.backgroundImage = "url('../img/erde_ground.png')";
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
    document.getElementById("character").style.backgroundImage = "url('../img/erde_collision.png')";
    document.getElementById("enemy").style.backgroundImage = "url('../img/asteroid_collision.png')";
    gameOverScreen.style.display = 'block';
    restartButton.style.display = 'block';
    gameRunning = false;
    deathSound.play();
    stopBackgroundMusic();
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
        document.addEventListener("click", startBackgroundMusic, { once: true });
        document.addEventListener("keydown", startBackgroundMusic, { once: true });
        moveBg();
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
