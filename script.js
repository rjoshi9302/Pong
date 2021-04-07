//rename variables
var Neat  = window.neataptic.Neat;
var Methods = window.neataptic.Methods;
var Config  = window.neataptic.Config;
var Architect = window.neataptic.architect;

//variables

var gameArray = [];

var neat;


//GAME AI SETTINGS

//TODO: Set an amount of AI

var PLAYER_AMOUNT = 4;
var MUTATION_RATE = 0.5;
var ELITISM_PERCENT = 0.15;
var NUM_INPUTS = 1;
var START_HIDDEN_SIZE = 0;
var NUM_OUTPUTS = 1;


function setup() {
  createCanvas(windowWidth, windowHeight);

    //create the ai

    neat = new Neat(
        NUM_INPUTS,
        NUM_OUTPUTS,
        null,
        {
          popsize: PLAYER_AMOUNT,
          mutationRate: MUTATION_RATE,
          elitism: Math.round(ELITISM_PERCENT * PLAYER_AMOUNT),
          network: new Architect.Random(NUM_INPUTS, START_HIDDEN_SIZE, NUM_OUTPUTS)
        }
      )



    //we have to create 1 game for each of our ai


    //TODO: replace {i_bound} and {j_bound} based on the number of AI
    //hint: i_bound * j_bound = PLAYER_AMOUNT

    for(var i = 0; i < 2; i++) {
        for(var j = 0; j < 2; j++) {
          //TODO: push to gameArray
            gameArray.push(new Game(windowWidth/2, windowHeight/2, windowWidth/4 + i * windowWidth/2, windowHeight/4 + j * windowHeight/2, i*2 + j + 1))
        }
    }

    var c = 0;
    for(var genome in neat.population){
        genome = neat.population[genome];
        //TODO: use the setBrain function to make the genome above the brain of the AI at the cth position in  gameArray
        gameArray[c].setBrain(genome);
        c += 1;
    }
}

function draw() {
  background(256);

  //inside draw, there are two things that we can be doing:
  //1: have the AI play the game
  //2: reset the population since all of the AI are dead
    
    var allDead = true; //assume all of the AI are dead
    var isDrawing = true;

  for(var i = 0; i < gameArray.length; i++ ) {
      if(!gameArray[i].isDead) {
          allDead = false;
          isDrawing = false;
      }

      gameArray[i].update(!gameArray[i].isDead);
      //TODO: pass !gameArray[i].isDead into the update method for 
      //the game at the ith position in gameArray
      
  }

  //all of the AI are dead so we now have to reset the population
  if(allDead) {

    //TODO: write code below for the creation of a new population
    //hint: https://wagenaartje.github.io/neataptic/docs/neat/
      
    console.log('Generation:', neat.generation, '- average score:', neat.getAverage());

    //TODO: sort the current population of AI
    neat.sort();
    var newPopulation = [];

    // TODO: Elitism - pass in a certain percentage of the ai into the newPopulation
    for(var i = 0; i < neat.elitism; i++){
      newPopulation.push(neat.population[i]);
    }

    // TODO: Breed the next individuals
    for(var i = 0; i < neat.popsize - neat.elitism; i++){
      newPopulation.push(neat.getOffspring());
    }

    // TODO: Replace the old population with the new population
    neat.population = newPopulation;

    // TODO: mutate the AI
    neat.mutate();

    neat.generation++;
    //update all of the games

    var c = 0;

    for(var genome in neat.population){
        genome = neat.population[genome];
        //TODO: use the setBrain function to make the genome above the 
        //brain of the game AI at the cth position in  gameArray
        gameArray[c].setBrain(genome)

        //TODO: reset the game AI
        c += 1;
    }

  }

  if(keyIsDown(LEFT_ARROW)) {
    gameArray[0].moveSlider(true)
  } else if(keyIsDown(RIGHT_ARROW)) {
    gameArray[0].moveSlider(false)
  }
  
}