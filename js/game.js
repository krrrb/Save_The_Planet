function randSpeed(min, max) {
    return Math.random() * (max - min) + min;
}

function handleKeyDown(event) {
    const code = event.code;
    if (code === "F2") {
        deleteLastHighscore();
    } else if ((code === "Space" || code === "KeyW" || code === "ArrowUp") && !countdownInProgress && !newHighscoreInput) {
        if (gameStarted) {
            jump();
        } else if (!countdownDone) {
            startCountdown();
        } else {
            startGame();
        }
    } else if ((code === "Enter" || code === "NumpadEnter") && newHighscoreInput) {
        saveHighscorePlayerName();
        newHighscoreInput = false;
    }
}

function startGame() {
    sfx_music.play();
    gameStarted = true;
    gameOver = false;
    score = 0;
    enemyPos = window.innerWidth;
    enemySpeed = randSpeed(speedMin, speedMax);
    startMenuEl.style.display = "none";
    countdownEl.style.fontSize = "1.5vw";
    playerEl.style.backgroundImage = "var(--player-ground)";
    enemyEl.style.backgroundImage = "var(--enemy)";
    updateScores();
    moveBg();
    moveEnemy();
}

function jump() {
    if (gameOver || !onGround) return;
    sfx_jump.play();
    playerEl.classList.add("jump");
    playerEl.style.backgroundImage = "var(--player-jump)";
    onGround = false;
    setTimeout(() => {
        playerEl.classList.remove("jump");
        playerEl.style.backgroundImage = "var(--player-ground)";
        onGround = true;
    }, jumpDuration);
}

function moveEnemy() {
    if (gameOver) return;
    if (enemyPos < altertDistance + playerXPos && onGround) {
        playerEl.style.backgroundImage = "var(--player-alert)";
        enemyEl.style.backgroundImage = "var(--enemy-alert)";
    }
    enemyEl.style.left = (enemyPos -= enemySpeed) + "px";
    if (enemyPos < playerWidth + playerXPos && onGround) {    // vereinfachte kollisionsabfrage möglich, da der enemy sich nur eindimensional bewegt und die 2te deimension des players in onGround gespeichert wird. 
        handleGameOver();
    } else if (enemyPos < -enemyWidth/3) { // durch 3 sodass nur dar asteroid (der schweif ist ca 2/3) kollisionen auslöst. dirty fix, kollision wird eigentlich weiter geprüft aber nach 1/3 wird der asteroid zurückgesetzt.
        enemyPos = window.innerWidth;
        score++;
        updateScores();
        enemyEl.style.backgroundImage = "var(--enemy)";
        enemySpeed = randSpeed(speedMin, speedMax);
    }
    requestAnimationFrame(moveEnemy);
}

function handleGameOver() {
    const newHighscoreMessage = `
        <span id="inputPrompt1">Du hast zwar über 8 Milliarden Menschen auf dem Gewissen,<br><br>
        aber zumindest hast du einen neuen Highscore von ${score} aufgestellt!<br><br>
        Verewige dich in den Trümmern und bestätige mit <span style="color: red;">Enter</span>.<br><br></span>
        <span id="inputPrompt2" style="display: none"><br>Um es nochmals zu versuchen, drücke die <span style="color: orange;">Leertaste</span>.</span>`;
    const noNewHighscoreMessage = `
        <span><br>Du hast über 8 Milliarden Menschen auf dem Gewissen!<br><br>
        Um es nochmals zu versuchen, drücke die <span style="color: orange;">Leertaste</span>.</span>`;

    sfx_music.pause();
    sfx_music.currentTime = 0;
    sfx_dead.play();
    playerEl.style.backgroundImage = "var(--player-collision)";
    enemyEl.style.backgroundImage = "var(--enemy-collision)";
    gameOver = true;

    if (isNewHighscore(score)) {
        countdownEl.innerHTML = newHighscoreMessage;
        inputFieldEl.style.display = "block";
        inputFieldEl.value = "";
        setTimeout(() => {
            startMenuEl.style.display = "flex";
            gameStarted = false;
            countdownDone = false;
            inputFieldEl.focus();
        }, 1000);
        newHighscoreInput = true;
    } else {
        highscoresEl.style.display = "block";
        newHighscoreInput = false;
        startMenuEl.style.display = "flex";
        countdownEl.innerHTML = noNewHighscoreMessage;
        gameStarted = false;
        countdownDone = false;
        inputFieldEl.style.display = "none";
    }
}
