// The attributes of the player.
let player = {
    x: 100,
    y: 100,
    x_v: 0, 
    y_v: 0,
    jump: true,
    height: 20,
    width: 20
};

// The status of the arrow keys
let keys = {
    right: false,
    left: false,
    up: false
};

// The friction and gravity to show realistic movements    
const gravity = 0.6;
const friction = 0.7;

// The number of platforms
let numberOfPlatforms = 10;

// The platforms
let platforms = [];

// Function to render the canvas
function rendercanvas(){
    ctx.fillStyle = "#F0F8FF";
    ctx.fillRect(0, 0, 1000, 1000);
}

// Function to render the player
function renderplayer(){
    ctx.fillStyle = "#F08080";
    ctx.fillRect((player.x)-20, (player.y)-20, player.width, player.height);
}

// Function to create platforms
function createplat(){
    for(let i = 0; i < numberOfPlatforms; i++) {
        platforms.push({
            x: 100 * i,
            y: 200 + (30 * i),
            width: 110,
            height: 20
        });
    }
}
// Function to render platforms
function renderplat(){
    ctx.fillStyle = "#45597E";
    platforms.forEach(platform => ctx.fillRect(platform.x, platform.y, platform.width, platform.height));
}

// This function will be called when a key on the keyboard is pressed
function keydown(e) {
    // 37 is the code for the left arrow key
    if(e.keyCode == 37) {
        keys.left = true;
    }
    // 37 is the code for the up arrow key
    if(e.keyCode == 38) {
        if(player.jump == false) {
            player.y_v = -10;
        }
    }
    // 39 is the code for the right arrow key
    if(e.keyCode == 39) {
        keys.right = true;
    }
}

// This function is called when the pressed key is released
function keyup(e) {
    if(e.keyCode == 37) {
        keys.left = false;
    }
    if(e.keyCode == 38) {
        if(player.y_v < -2) {
        player.y_v = -3;
        }
    }
    if(e.keyCode == 39) {
        keys.right = false;
    }
} 

function loop() {
    // If the player is not jumping apply the effect of frictiom
    if (player.jump == false) {
        player.x_v *= friction;
    } else {
        // If the player is in the air then apply the effect of gravity
        player.y_v += gravity;
    }

    player.jump = true;

    // If the left key is pressed increase the relevant horizontal velocity
    if (keys.left) {
        player.x_v = -2.5;
    }

    if (keys.right) {
        player.x_v = 2.5;
    }

    // Updating the y and x coordinates of the player
    player.y += player.y_v;
    player.x += player.x_v;

    // A simple code that checks for collions with the platform
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
    rendercanvas();
    renderplayer();
    renderplat();
}

canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
ctx.canvas.height = 500;
ctx.canvas.width = 1000;
createplat();

// Adding the event listeners
document.addEventListener("keydown",keydown);
document.addEventListener("keyup",keyup);
setInterval(loop,22);