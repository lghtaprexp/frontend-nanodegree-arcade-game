// Enemies our player must avoid
const Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.height = 65;
    this.width = 95;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < ctx.canvas.width) {
        this.x += this.speed * dt;
    } else {
        this.x -= this.x * 1.5;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.height = 75;
    this.width = 65;
    this.horizontalStep = 101;
    this.verticalJump = 83;
    this.winPopup = false;
};

// Checking whether the player collides with 
// the enemies. If collides, the player is sent back
// to starting position.
Player.prototype.update = function(allEnemies) {
    for(enemy of allEnemies) {
        if((this.x < enemy.x + enemy.width/2) && 
            (this.x + this.width/2 > enemy.x) && 
            (this.y < enemy.y + enemy.height/2) && 
            (this.y + this.height/2 > enemy.y)) {
            this.reset();
        } else if(this.y <= -this.y) {
            this.winPopup = true;
        }
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Using the switch statement to check which 
// key has been pressed to move the player
// around the board.
Player.prototype.handleInput = function(arrow) {
    switch(arrow) {
        case 'up':
            if(this.y > 0) {
                this.y -= this.verticalJump;
            }
            break;
        case 'right':
            if(this.x < this.horizontalStep * 4) {
                this.x += this.horizontalStep;
            }
            break;
        case 'down':
            if(this.y < this.verticalJump * 4) {
                this.y += this.verticalJump;
            }
            break;
        case 'left':
            if(this.x > 0) {
                this.x -= this.horizontalStep;
            }
            break;
    }
}

// This reset the player to the
// starting position on the board.
Player.prototype.reset = function() {
    this.x = this.horizontalStep * 2;
    this.y = this.verticalJump * 4.7;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player(202, 390.1, 'images/char-cat-girl.png');
const allEnemies = [];
const enemyOne = new Enemy(-101, 55, 50);
const enemyTwo = new Enemy(-101, 140, 150);
const enemyThree = new Enemy((-101 * 3), 140, 150);
const enemyFour = new Enemy((-101 * 5), 230, 200);
allEnemies.push(enemyOne, enemyTwo, enemyThree, enemyFour);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});