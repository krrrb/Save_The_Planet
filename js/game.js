//Diese Funktion ist der Timer und leitet nach Ablauf auf die game.html weiter.
window.onload = function() {
    let countdown = 4;
    const timerElement = document.getElementById("timer");

    const interval = setInterval(function() {
        countdown--;
        timerElement.textContent = countdown;

        if (countdown <= 0) {
            clearInterval(interval);
            window.location.href = "../html/game.html"
        }
    }, 1000);
};
let enemy_left = 1000;
let on_ground = true;
setInterval(() => {
    enemy.style.left = enemy_left + 'px';
    enemy_left -= 10;
    if(enemy_left < 150 && on_ground) {
        alert('Game over');
    }

    if(enemy_left < 0) {
        enemy_left = 1000;
    }
}, 10);


function jump() {
    character.style.top = '250px';
    on_ground = false;
    setTimeout(() => {
        character.style.top = '500px';
    }, 200);
    setTimeout(() => {
        on_ground = true;
    }, 400);
}
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