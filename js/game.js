window.onload = function() {
    let countdown = 3;
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