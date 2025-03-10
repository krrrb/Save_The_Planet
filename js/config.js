const noEntryYet ="(╯°□°）╯︵ ┻━┻",
    countdownText = ["3", "2", "1", "LOS"],
    countdownColors = ["white", "yellow", "orange", "red"],
    maxTopEntries = 4,
    countdownInterval = 420,
    altertDistance = 777,
    speedMin = 15,
    speedMax = 35,
    bgSpeed = 3;

let countdownInProgress = false,
    newHighscoreInput = false,
    gameOver = false,
    onGround = true,
    gameStarted = false,
    countdownDone = false,
    score = 0,
    enemyPos = 0,
    enemySpeed = 0;

const enemyEl = getEl("enemyCharacter"),
    playerEl = getEl("playerCharacter"),
    startMenuEl = getEl("startMenu"),
    bgEl = getEl("gameBackground"),
    scoreEl = getEl("currentScoreDisplay"),
    countdownEl = getEl("startMenuContent"),
    inputFieldEl = getEl("inputField"),
    playerXPos = +getComputedStyle(document.documentElement).getPropertyValue("--player-xpos"), // + ist die kurzversion von parseInt()
    jumpDuration = +getComputedStyle(document.documentElement).getPropertyValue("--jump-duration"),
    playerWidth = +getComputedStyle(document.documentElement).getPropertyValue("--player-width"),
    enemyWidth = +getComputedStyle(document.documentElement).getPropertyValue("--enemy-width"),
    highscoresEl = getEl("topHighscores"),
    sfx_jump = new Audio("sfx/jump.mp3"),
    sfx_dead = new Audio("sfx/death.mp3"),
    sfx_music = new Audio("sfx/music_p.mp3");

sfx_music.loop = true;

function getEl(id) {
    return document.getElementById(id);
}
