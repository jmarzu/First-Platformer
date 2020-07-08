(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// The attributes of the player.
let player = {
    // x coordinate for starting position of block game piece
    x: 30,
    // y coordinate for starting position of block game piece
    y: 25,
    x_v: 0, 
    y_v: 0,
    jump: true,
    height: 20,
    width: 20
};

let keys = {
    right: false,
    left: false,
    up: false
};

// The friction and gravity to show realistic movements    
const gravity = 0.6;
const friction = 0.7;

// The number of platforms
let numberOfPlatforms = 45;

// Platform array with default starting platform
let platforms = [
    {x: 0, y: 200, width: 100, height: 20}
];

canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
ctx.canvas.height = 600;
ctx.canvas.width = 1000;

function renderCanvas(){
    ctx.fillStyle = "#F0F8FF";
    ctx.fillRect(0, 0, 1000, 1000);
}

function renderPlayer(){
    ctx.fillStyle = "#F08080";
    ctx.fillRect((player.x) - 20, (player.y) - 20, player.width, player.height);
}

function createPlatforms(){
    for (let i = 1; i < numberOfPlatforms; i++) {
        platforms.push({
            x: alternatingPlatforms(),
            y: alternatingPlatforms(),
            width: 100,
            height: 20
        });
    }
}

function alternatingPlatforms() {
    // if the platform position for the x axis is > 100 then add 150 so the 
    // player piece can fall to the default position
    let randomPosition = Math.floor((Math.random() * 1000) + 1);

    if (randomPosition < 100) {
        randomPosition + 150; 
    }

    return randomPosition
}

function renderPlatforms(){
    ctx.fillStyle = "#45597E";
    platforms.forEach(platform => ctx.fillRect(platform.x, platform.y, platform.width, platform.height));
}

// This function will be called when a key on the keyboard is pressed
function keydown(e) {
    // 37 is the code for the left arrow key
    if (e.keyCode === 37) {
        keys.left = true
    }

    // 37 is the code for the up arrow key
    if (e.keyCode === 38) {
        if (player.jump === false) {
            player.y_v = -11;
        }
    }
    // 39 is the code for the right arrow key
    if (e.keyCode === 39) {
        keys.right = true;
    }
}

// This function is called when the pressed key is released
function keyup(e) {
    if (e.keyCode === 37) {
        keys.left = false;
    }

    if (e.keyCode === 38) {
        if (player.y_v < -2) {
            player.y_v = -3;
        }
    }

    if (e.keyCode === 39) {
        keys.right = false;
    }
} 

function runGame() {
    // If the player is not jumping apply the effect of friction
    if (player.jump === false) {
        player.x_v *= friction;
    } else {
        // If the player is in the air then apply the effect of gravity
        player.y_v += gravity;
    }

    player.jump = true;

    // If the left key is pressed increase the relevant horizontal velocity
    if (keys.left) {
        player.x_v = -2;
    }

    if (keys.right) {
        player.x_v = 2;
    }

    // Updating the y and x coordinates of the player
    player.y += player.y_v;
    player.x += player.x_v;

    // Check for collions with the platform
    let i = -1;

    platforms.forEach((platform, index) => {
        if (platform.x < player.x && player.x < platform.x + platform.width &&
            platform.y < player.y && player.y < platform.y + platform.height) {
            i = index;
        }
    });

    if (i > -1) {
        player.jump = false;
        player.y = platforms[i].y;    
    }

    // Rendering the canvas, the player and the platforms
    renderCanvas();
    renderPlayer();
    renderPlatforms();

    winGame(player);
}

function winGame(position) {
    if (position.x > ctx.canvas.width && position.y < ctx.canvas.height) {
        alert('You won!', location.reload());
    } else if (position.y > ctx.canvas.height && position.x < ctx.canvas.width) {
        alert('You lost!', location.reload());
    }
}

createPlatforms();

// Adding the event listeners
document.addEventListener("keydown",keydown);
document.addEventListener("keyup",keyup);


// Run runGame() continuously to update the board/game
setInterval(runGame, 22);
},{}]},{},[1]);
