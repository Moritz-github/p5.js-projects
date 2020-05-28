let resolutionScale = 40;

let gravity = 15;

let debug = true;

let downMom = 0;


function setup() {
  createCanvas(400, 880);

  tetris = new Tetris();

  background(0);

  noStroke();
}


function draw() {
  scale(resolutionScale);
  background(0);

  if (tetris.gameOver) {
    gameOver();
    return;
  }

  drawBackground();

  //!!!!!!!!!!!!!
  if (keyIsDown(83)) {
    downMom += 1;
    if (downMom % 3 == 0) {
      velY = 1;
      tetris.updateY();
    }
  }
  //!!!!!!!!!!!!!

  // update the position of the blocks every x frames
  if (frameCount % gravity == 0) {
    tetris.updateY();
  }

  drawFormationBlocks();
  drawPlacedBlocks();
}


function keyPressed() {
  if (key == 'a') {
    tetris.velX = -1;
  } else if (key == "d") {
    tetris.velX = 1;
  } else if (key == "w" && debug) {
    tetris.velY = -2;
  }

  tetris.updateX();
}


function drawBackground() {
  fill(100, 100, 100);

  for (let row = 0; row <= tetris.playfieldSize.x + 1; row += 1) {
    rect(row, 0, 1, 1);
    rect(row, 21, 1, 1);
  }
}


function drawBlock(x, y) {
  fill(10, 200, 200);
  rect(x, y, 1, 1);
}


function drawPlacedBlocks() {
  for (let column = 0; column < tetris.placedBlocks.length; column += 1) {
    for (let index = 0; index < tetris.placedBlocks[column].length; index += 1) {
      drawBlock(tetris.placedBlocks[column][index], column);
    }
  }
}


function drawFormationBlocks() {
  for (let row = 0; row < tetris.blockFormation.length; row += 1) {
    for (let column = 0; column < tetris.blockFormation[row].length; column += 1) {
      if (tetris.blockFormation[row][column]) {
        posX = tetris.blockLocation.x - 1 + column;
        posY = tetris.blockLocation.y + row;
        drawBlock(posX, posY);
      }
    }
  }
}


function gameOver() {
  background(220, 10, 10);
}