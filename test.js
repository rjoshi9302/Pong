class Game {
    constructor(windowWidth, windowHeight, centerX, centerY, gameNumber) {

        //window
        this.windowHeight = windowHeight;
        this.windowWidth = windowWidth;
        this.centerX = centerX;
        this.centerY = centerY;
        this.gameNumber = gameNumber;
        this.brain = null;
        this.reset();

    }

    setBrain(newBrain) {
        this.brain = newBrain;
    }

    randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }


    update(isDrawing) {

        //update physics

        
        if(!this.isDead) {

            if(this.brain != null) {
                var inputs = [];

                //TODO: Pass in a value into the neural network that 
                //will allow the AI to decide to move to the left or right
                inputs.push(0.5);

                var output = this.brain.activate(inputs);

                //TODO: set a value below. Remember that the output will normally be between 0 and 1, 
                //so something in between might work. This is called the output threshold.
                if(output[0] > 0.7) {
                    this.moveSlider(false)
                } else {
                    this.moveSlider(true)
                }
            }

            // Ball bounces off walls
            this.xBall += this.xBallChange;
            this.yBall += this.yBallChange;

            if (this.xBall < this.centerX - this.windowWidth/2 + 0.5*this.diameter || 
                this.xBall > this.centerX + this.windowWidth/2 - 0.5*this.diameter) {
                this.xBallChange *= -1;
            }
            
            if (this.yBall < this.centerY - this.windowHeight/2 + 0.5*this.diameter) {
                    this.yBallChange *= -1;
            } else if(this.yBall > this.centerY + this.windowHeight/2 - 0.5*this.diameter) {
                //game over
                this.isDead = true;
                this.brain.score = this.fitness;
            }

            // Detect collision with paddle
            if ((this.xBall > this.xPaddle &&
                this.xBall < this.xPaddle + this.paddleWidth) &&
            (this.yBall + (this.diameter/2) >= this.yPaddle && 
            this.yBall + (this.diameter/2) <= this.yPaddle + this.paddleHeight
            
            )
            
            ) {
                this.yBallChange *= -1;
                this.score++;
                //TODO: Give the AI bonus points for hitting the ball
                //(hint - this.fitness represent's the AI's points)
                this.fitness ++;
                
            }

            //TODO: Give the AI points for staying alive. 
            //The amount of points you give can be inversely proportional to the x-distance between
            //the ball and the paddle. This encourages the AI to stay as close to the ball as 
            //possible. 

            var xDistance = Math.abs(this.xPaddle - this.xBallChange);
            xDistance = (this.windowWidth - xDistance) / this.windowWidth;
            this.fitness += xDistance * 5;


        }



        fill(0, 0, 0);
        noStroke();
        rect(this.centerX - this.windowWidth/2, this.centerY - this.windowHeight/2, this.windowWidth, this.windowHeight);
        
        noFill();
        stroke(255, 0, 0);
        rect(this.centerX - this.windowWidth/2, this.centerY - this.windowHeight/2, this.windowWidth, this.windowHeight);


        //draw everything

        if(isDrawing) {

            // Draw ball
            fill(255, 0, 255);
            noStroke();
            ellipse(this.xBall, this.yBall, this.diameter, this.diameter);

            // Draw paddle
            fill(0, 255, 255);
            noStroke();
            rect(this.xPaddle, this.yPaddle, this.paddleWidth, this.paddleHeight);

            // Draw score
            fill(0, 255, 255);
            textSize(24);
            text("Score for Game " + this.gameNumber + ": " + this.score, this.centerX - this.windowWidth/2 + 10, this.centerY - this.windowHeight/2 + 25);
        }

    }

    moveSlider(moveLeft) {
        if(moveLeft && this.xPaddle > this.centerX - this.windowWidth/2 + this.paddleWidth/2 - 15) {
            this.xPaddle -= 5;
        } else if (this.xPaddle < this.centerX + this.windowWidth/2 - 2 * this.paddleWidth + 40) {
            this.xPaddle += 5;
        } else {
            //TODO: make the AI lost points for staying in one place
            this.fitness --;
        }
    }

    moveSliderByFactor(moveLeft, factor) {
        if(moveLeft && this.xPaddle > this.centerX - this.windowWidth/2 + this.paddleWidth/2 - 15) {
            this.xPaddle -= factor;
        } else if (this.xPaddle < this.centerX + this.windowWidth/2 - 2 * this.paddleWidth + 40) {
            this.xPaddle += factor;
        } else {
            //TODO: make the AI lost points for staying in one place
            this.fitness --;
        }
    }

    reset() {
        
        // Variables for the paddle
        this.paddleWidth = 50;
        this.paddleHeight = 10;

        this.xPaddle = this.centerX - this.paddleWidth/2;
        this.yPaddle = this.centerY + this.windowHeight/2 - this.paddleHeight - 50;

        // Variables for the ball
        this.diameter = 25;

        this.xBall = this.centerX;
        this.yBall = this.centerY;

        this.xBallChange = (Math.random() < 0.5) && this.randomNumber(-3.5, -2.5) || this.randomNumber(2.5, 3.5);

        this.yBallChange = -Math.sqrt(25 - Math.pow(this.xBallChange, 2));

        //game
        this.score = 0;
        this.fitness = 0;
        this.isDead = false;
    }

}