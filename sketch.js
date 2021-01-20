class Game {
  constructor(windowHeight, windowWidth) {
    
    /*
    TODO: add two parameters above - windowHeight and windowWidth.
    Then, set them equal to this.windowHeight and this.windowWidth
    */
    
    this.windowHeight =windowHeight
    this.windowWidth = windowWidth
    
    
      //General game stuff
  this.score = 0;

  //paddle stuff
  //hi rohit
  this.xPaddle = this.windowWidth / 2
  this.yPaddle = this.windowHeight - 100;
  this.paddleWidth = 100;
  this.paddleHeight = 55;

  //ball change
  this.xBallChange = 5;
  this.yBallChange = 5;

  //ball code
  this.xBall = Math.floor(Math.random() * 300) + 50;
  this.yBall = 50;
  this.diameter = 50;
  }
  // hello this is rohit
  play() {
    /*
    TODO: Add a this. in front of all of the variables
    */
    this.xBall += this.xBallChange;
  this.yBall += this.yBallChange;
  if (this.xBall < this.diameter / 2 ||
    this.xBall > this.windowWidth - 0.5 * this.diameter) {
    this.xBallChange *= -1;
  }
  if (this.yBall < this.diameter / 2 ||
    this.yBall > this.windowHeight - this.diameter) {
    this.yBallChange *= -1;
  }
  //ball detection against paddle
  if ((this.xBall > this.xPaddle &&
      this.xBall < this.xPaddle + this.paddleWidth) &&
    (this.yBall + (this.diameter / 2) >= this.yPaddle)) {
    this.xBallChange *= -1;
    this.xBallChange = this.xBallChange - 0.2;
    this.yBallChange *= -1;
    this.yBallChange = this.xBallChange - 0.2;
    this.score++;
  }
  fill(5, 255, 20);
  noStroke();
  ellipse(this.xBall, this.yBall, this.diameter, this.diameter);
 
  fill(0, 255, 255);
  noStroke();
    
  rect(this.xPaddle, this.yPaddle-300, this.paddleWidth, this.paddleHeight);
  fill(0, 255, 255);
  textSize(24);
  text("Score: " + this.score, 10, 25);
  }
  
  
  movePaddle(moveLeft) {
    //add a conditional that will determine if the paddle should be shifted left or right
  }
  
}
// hello
var game;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //TODO: pass in the windowWidth and windowHeight
  game = new Game(this.windowWidth,this.windowHeight); 
}

function draw() {
  background(0);
  game.play();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    game.movePaddle(true)
  } else if (keyCode === RIGHT_ARROW) {
    game.movePaddle(false)
  }
}

 

