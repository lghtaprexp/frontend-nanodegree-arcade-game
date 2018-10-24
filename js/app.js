// Enemies our player must avoid
var Enemy = function(x, y, speed) {
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

var Player = function(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.height = 75;
    this.width = 65;
    this.horizontalStep = 101;
    this.verticalJump = 83;
};

Player.prototype.update = function() {
    for(enemy of allEnemies) {
        //console.log(enemy);
        if(this.x < enemy.x + enemy.width && this.x + this.width > enemy.x && this.y === enemy.y) {
            console.log('collide');
            this.reset();
        } else if(this.y <= -this.y) {
            //console.log('win');
            this.win();            
        }
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(arrow) {
    switch(arrow) {
        case 'up':
            if(this.y > 0) {
                this.y -= this.verticalJump;
            }
            break;
        case 'right':
            if(this.x < this.horizontalStep * 3) {
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

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
}

Player.prototype.win = function() {
    setTimeout(function() {
        //console.log('you win');
    }, 500);
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Player(200, 400, 'images/char-cat-girl.png');
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