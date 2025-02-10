function moveBackground() {
    let position = 0;
    function animate() {
        position += 2;
        gameBackgroundElement.style.backgroundPosition = `${position}px 0`;
        requestAnimationFrame(animate);
    }
    animate();
}
