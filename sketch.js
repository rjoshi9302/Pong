class Game {

  constructor(windowWidth, windowHeight) {
    this.windowHeight = windowHeight;
    this.windowWidth = windowWidth;

    //ball variables
    this.xBall = Math.floor(Math.random() * 300) + 50;
    this.yBall = 50;
    this.diameter = 50;
    this.xBallChange = 5;
    this.yBallChange = 5;

    //paddle variables
    this.xPaddle;
    this.yPaddle;
    this.paddleWidth = 100;
    this.paddleHeight = 25;
    //general variables
    this.started = false;
    this.gameOver = false;
    this.score = 0;
  }

  update() {
    //ball movement
    this.xBall += this.xBallChange;
    this.yBall += this.yBallChange;

    //wall collision
    if (this.xBall < this.diameter / 2 ||
      this.xBall > this.windowWidth - 0.5 * this.diameter) {
        this.xBallChange *= -1;
    }
    if (this.yBall < this.diameter / 2 ||
      this.yBall > this.windowHeight - this.diameter) {
        this.yBallChange *= -1;
    }
    if (this.yBall > this.windowHeight - this.diameter) {
        this.gameOver = true;
      }

    //paddle collision
    if ((this.xBall > this.xPaddle &&
      this.xBall < this.xPaddle + this.paddleWidth) &&
      (this.yBall + (this.diameter / 2) >= this.yPaddle)) {
        this.xBallChange *= -1;
        this.yBallChange *= -1;
        this.score++;
    }

    //ball
    fill(0, 70, 100);
    noStroke();
    ellipse(this.xBall, this.yBall, this.diameter, this.diameter);

    //game control
    if (!this.started) {
      this.xPaddle = this.windowWidth / 2;
      this.yPaddle = this.windowHeight - 100;
      this.started = true;
    }
    fill(0, 255, 255);
    noStroke();
    rect(this.xPaddle, this.yPaddle, this.paddleWidth, this.paddleHeight);
    
    //display score
    fill(0, 255, 255);
    textSize(24);
    text("Score: " + this.score, 10, 25);
    
    //GAMEOVER
    if (this.gameOver == true) {
      this.xBall = 50000;
      this.xPaddle = 70000;
      fill(0, 255, 255);
      textSize(40);
      text("GAME OVER", this.windowWidth/2 - 100, this.windowHeight/2);
    }
  }

  //paddle side-to-side movement
  move(moveLeft) {
    if (moveLeft) {
      this.xPaddle -= 50;
    } else {
      this.xPaddle += 50;
    }
  }

}

var game1;

function setup() {
  createCanvas(windowWidth, windowHeight);

  game1 = new Game(windowWidth, windowHeight);
}

function draw() {
  background(0);

  game1.update()
;}

//controls
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    game1.move(true);
  } else if (keyCode === RIGHT_ARROW) {
    game1.move(false);
  }
}

//these are just tips for the next step
//center x and center y, if you change center x and center y to a different value it moves the spac eto another place
 