let countdownInProgress = false, newHighscoreInput = false,
    countdownText = ["3", "2", "1", "LOS"], countdownColors = ["white", "yellow", "orange", "red"],
    gameOver = false, onGround = true, gameStarted = false, countdownDone = false,
    speedMin = 15, speedMax = 35, score = 0, enemyPos = 0, enemySpeed = 0, bgSpeed = 3,
    highscore = localStorage.getItem("highscore") ? +localStorage.getItem("highscore") : 0;

const countdownInterval = 420,
    enemyEl = getEl("enemyCharacter"),
    playerEl = getEl("playerCharacter"),
    startMenuEl = getEl("startMenu"),
    bgEl = getEl("gameBackground"),
    scoreEl = getEl("currentScoreDisplay"),
    highscoreEl = getEl("highscoreDisplay"),
    countdownEl = getEl("startMenuContent"),
    inputFieldEl = document.getElementById("inputField"),
    playerXPos = +getComputedStyle(document.documentElement).getPropertyValue("--player-xpos"), //+ entspricht parseInt()
    sfx_jump = new Audio("sfx/jump.mp3"),
    sfx_dead = new Audio("sfx/death.mp3"),
    sfx_music = new Audio("sfx/music_p.mp3");

sfx_music.loop = true;

function getEl(id) {
    return document.getElementById(id);
}

function randSpeed(min, max) {
    return Math.random() * (max - min) + min;
}