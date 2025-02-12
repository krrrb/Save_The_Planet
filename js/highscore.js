function updateScores() {
    scoreEl.textContent = "Score: " + score;
    highscoreEl.textContent = "Highscore: " + highscore;
}

function saveHighscore() {
    if (score > highscore) {
        highscore = score;
        localStorage.setItem("highscore", highscore);
        updateScores();
    }
}
/* die funktion resetHighscore kann später auch entfernt werden, dient nur zu debugging zwecken, spart das tippen in der console */
function resetHighscore() {
    highscore = 0;
    localStorage.removeItem("highscore");
    updateScores();
}
