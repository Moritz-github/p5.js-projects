class Tetris {
  constructor() {
    this.velY = 1;
    this.velX = 0;
    this.gameOver = false;

    this.playfieldSize = createVector(10, 20);

    this.placedBlocks = [];

    for (let i = 0; i < 21; i += 1) {
      this.placedBlocks[i] = [];
    }

    this.spawnNewForm(false);
  }


  updateY() {
    this.updatePos(0, this.velY);
  }


  updateX() {
    this.updatePos(this.velX, 0);
    this.velX = 0;
  }


  updatePos(velX, velY) {
    for (let row = 0; row < this.blockFormation.length; row += 1) {
      for (let column = 0; column < this.blockFormation[row].length; column += 1) {
        if (!this.blockFormation[row][column]) {
          continue;
        }

        let nextPosX = tetris.blockLocation.x - 1 + column + velX;
        let nextPosY = tetris.blockLocation.y + row + velY;

        let nextPos = createVector(nextPosX, nextPosY);

        if (this.isColliding(nextPos)) {
          if (nextPos.y == 2) {
            this.gameOver = true;
            return;
          }

          // if the block lands ON another block
          if (velY != 0) {
            this.spawnNewForm(true);
          }
          return true;
        }

        if (nextPos.x < 0 || nextPos.x >= 10) {
          return;
        }
      }
    }

    this.blockLocation.x += velX;
    this.blockLocation.y += velY;
  }


  spawnNewForm(saveOldBlock) {
    if (saveOldBlock) {
      for (let row = 0; row < this.blockFormation.length; row += 1) {
        for (let column = 0; column < this.blockFormation[row].length; column += 1) {
          if (!this.blockFormation[row][column]) {
            continue;
          }
          let posX = tetris.blockLocation.x - 1 + column;
          let posY = tetris.blockLocation.y + row;

          append(this.placedBlocks[posY], posX);
        }
      }
    }

    this.checkFullRowsAndMoveDown();

    this.blockLocation = createVector(5, 1);
    this.blockFormation = [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ];
  }

  
  checkFullRowsAndMoveDown() {
    for (let row = 0; row < this.placedBlocks.length; row += 1) {
      if (this.placedBlocks[row].length >= 10) {
        this.removeRow(row);
        this.moveBlocksDown(row);
      }
    }
  }


  removeRow(row) {
    print("removing row " + row);
    this.placedBlocks[row] = [];
  }

  
  moveBlocksDown(underHeight) {
    print("Moving rows under " + underHeight + " down!");
    for (let row = underHeight - 1; row > 1; row -= 1) {
      this.placedBlocks[row + 1] = this.placedBlocks[row];
    }
  }
  

  isColliding(nextPos) {
    if (nextPos.y < 1) {
      return false;
    }

    // if the block is touching the floor
    if (nextPos.y > this.playfieldSize.y) {
      return true;
    }

    // check through all the blocks - if they are touching
    for (let i = 0; i < this.placedBlocks[nextPos.y].length; i += 1) {
      if (this.placedBlocks[nextPos.y][i] == nextPos.x) {
        return true;
      }
    }

    return false;
  }
}