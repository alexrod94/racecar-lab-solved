class Game {
  constructor() {
    this.startScreen = document.querySelector("#game-intro");
    this.gameScreen = document.querySelector("#game-screen");
    this.endScreen = document.querySelector("#game-end");
    this.height = 600;
    this.width = 500;
    this.obstacles = [];
    this.score = 0;
    this.lives = 3;
    this.gameIsOver = false;
    this.gameIntervalId;
    this.counter = 0;
    this.gameLoopFrequency = 1000 / 60;
    this.generationSpeed = 150;
    this.player = new Player(
      this.gameScreen,
      200,
      500,
      100,
      150,
      "./images/car.png"
    );
  }

  start() {
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";

    // Cambiar tamaño de pantalla
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    // Empezar intervalo
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }

  gameLoop() {
    this.update();
    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId);
      this.gameScreen.style.display = "none";
      this.endScreen.style.display = "block";
    }
  }
  update() {
    this.counter++;
    this.obstacles.forEach((obstacle, index) => {
      obstacle.move();
      if (obstacle.top === this.gameScreen.offsetHeight - 10) {
        this.obstacles.splice(index, 1);
        obstacle.element.remove();
        this.score++;
        const scoreCounter =
          this.gameScreen.parentElement.querySelector("#score");
        scoreCounter.innerText = this.score;
        console.log(this.obstacles);
      }

      if (this.player.didCollide(obstacle)) {
        // Remove the obstacle element from the DOM
        obstacle.element.remove();
        // Remove obstacle object from the array
        this.obstacles.splice(index, 1);
        // Reduce player's lives by 1
        this.lives--;
        const livesCounter =
          this.gameScreen.parentElement.querySelector("#lives");
        livesCounter.innerText = this.lives;
        if (this.lives === 0) this.gameIsOver = true;
      }
    });
    this.player.move();
    if (this.counter % this.generationSpeed === 0) {
      this.obstacles.push(new Obstacle(this.gameScreen));
    }
  }
}
