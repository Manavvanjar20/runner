var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
//create a variable gameState and set it to the "play" state
var gameState = "play";

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  //add code to load the ghost image
  ghostImg = loadImage("ghost-jumping.png");
  ghostImg2 = loadImage("ghost-standing.png");
  //add code to load the sound
  spookySound = loadSound("spooky.wav");

}

function setup() {
  createCanvas(600, 600);
  //write the code to loop the spooky sound
  spookySound.loop();
  //create a sprite called tower at the x position 300 and y position 300
  tower = createSprite(300, 300);
  //add the tower image to the sprite called tower
  tower.addImage(towerImg);
  //make the tower image move up with velocity 1
  tower.velocityY = 1;
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(200, 200, 50, 50);
  ghost.scale = 0.3;
  ghost.addImage(ghostImg);
}

function draw() {
  background(0);
  if (gameState === "play") {
    //write the code to move the ghost left using the left arrow key
    if (keyDown(LEFT_ARROW)) {
      ghost.x = ghost.x - 2;
    }
    //write the code to move the ghost right using the right arrow key
    if (keyDown(RIGHT_ARROW)) {
      ghost.x = ghost.x + 2;
    }
    //write the code to make the ghost jump when you press the space key
    if (keyDown("space")) {
      ghost.velocityY = ghost.velocityY - 2;
    }

    ghost.velocityY = ghost.velocityY + 0.8

    if (tower.y > 400) {
      tower.y = 300
    }
    spawnDoors();


    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }
    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "end"
    }

    drawSprites();
  }

  if (gameState === "end") {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230, 250)
  }

}

function spawnDoors() {

  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200, 10);
    var invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;

    //spawn the door at a random x position on the tower
    door.x = Math.round(random(10, 50));
    //assign the x position of climber as x position of the door
    climber.x = door.x
    //assign the x position of invisibleBlock as x position of the door
    invisibleBlock.x = door.x;
    door.addImage(doorImg);
    climber.addImage(climberImg);

    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    ghost.depth = door.depth;
    ghost.depth += 1;

    //assign lifetime to the door
    door.lifetime = 600;
    //assign lifetime to the climber
    climber.lifetime = 600;
    //assign lifetime to the invisibleBlock
    invisibleBlock.lifetime = 600;


    //add each door to the group
    doorsGroup.add(door);
    invisibleBlock.debug = true;

    //add each climber to the group
    climbersGroup.add(climber);
    // each invisibleBlock to the group
    invisibleBlockGroup.add(invisibleBlock);
  }
}

