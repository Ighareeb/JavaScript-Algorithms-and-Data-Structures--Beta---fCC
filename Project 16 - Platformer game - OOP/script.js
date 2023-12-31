// declare/assign variables for DOM elements
const startScreen = document.querySelector('.start-screen');
const checkpointScreen = document.querySelector('.checkpoint-screen');
const checkpointMessage = document.querySelector('.checkpoint-screen > p');
const startBtn = document.getElementById('start-btn');
const canvas = document.getElementById('canvas');
//------------------------Setting up <canvas>-----------------------------
const ctx = canvas.getContext('2d');
//innerWidth/Height are props representing interior W/H of the browser window
canvas.width = innerWidth;
canvas.height = innerHeight;
//--------------------Setting up game variables--------------------------
const gravity = 0.5;
//The player will have the opportunity to cross different checkpoints. Need to keep track of the status for the checkpoint collision detection.
let isCheckpointCollisionDetectionActive = true;
//array for Platform positions
const platformPositions = [
	{ x: 500, y: 450 },
	{ x: 700, y: 400 },
	{ x: 850, y: 350 },
	{ x: 900, y: 350 },
	{ x: 1050, y: 150 },
	{ x: 2500, y: 450 },
	{ x: 2900, y: 400 },
	{ x: 3150, y: 350 },
	{ x: 3900, y: 450 },
	{ x: 4200, y: 400 },
	{ x: 4400, y: 200 },
	{ x: 4700, y: 150 },
];
//create array of platform instances using the Platform class && Checkpoint class as reference to draw the platforms/checkpoints on the canvas + iterate  call draw() on each platform to use in animate()
const platforms = platformPositions.map(
	(platform) => new Platform(platform.x, platform.y),
);
platforms.forEach((platform) => {
	platform.draw();
});
const checkpointPositions = [
	{ x: 1170, y: 80 },
	{ x: 2900, y: 330 },
	{ x: 4800, y: 80 },
];
const checkpoints = checkpointPositions.map(
	(checkpoint) => new CheckPoint(checkpoint.x, checkpoint.y),
);
checkpoints.forEach((checkpoint) => {
	checkpoint.draw();
});
//-------------------------CLASSES--------------------------------
//Player Constructor
class Player {
	constructor() {
		this.position = {
			x: 10,
			y: 400,
		};
		this.velocity = {
			x: 0,
			y: 0,
		};
		this.width = 40;
		this.height = 40;
	}
	// draw() method creates player's width, height, position, and fill color.
	draw() {
		ctx.fillStyle = '#99c9ff';
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	}
	//update() method to update position/veloicity
	update() {
		//call draw method to contrinually draw player as game updates
		this.draw();
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
		//condition to prevent player from moving past height of the canvas
		if (this.position.y + this.height + this.velocity.y <= canvas.height) {
			if (this.position.y < 0) {
				this.position.y = 0;
				this.velocity.y = gravity;
			}
			//adds gravity to player's velocity
			this.velocity.y += gravity;
		} else {
			this.velocity.y = 0;
		}
		//condition to ensure player stays within canvas boundaries
		if (this.position.x < this.width) {
			this.position.x = this.width;
		}
	}
}
//----------
//CheckPoint Constructor
class CheckPoint {
	constructor(x, y) {
		this.position = {
			x,
			y,
		};
		this.width = 40;
		this.height = 70;
	}

	draw() {
		ctx.fillStyle = '#f1be32';
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	}
	claim() {
		this.width = 0;
		this.height = 0;
		this.position.y = Infinity;
	}
}
//----------
//Platform Constructor
class Platform {
	constructor(x, y) {
		this.position = { x, y };
		this.width = 200;
		this.height = 40;
	}
	draw() {
		ctx.fillStyle = '#acd157';
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	}
}
//-----instantiate new player
const player = new Player();
//-----------------------------GAME FUNCTIONS/LOGIC---------------------------
//change display from start screen to canvas, call draw( ) method
const startGame = () => {
	canvas.style.display = 'block';
	startScreen.style.display = 'none';
	animate();
};
//----------

//moving/animating player using requestAnimationFrame() web API - updating player's position and continuously drawing it on the canvas
// + as player moves need to clear previous frame before rendering next animation
const animate = () => {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	player.update();
	if (keys.rightKey.pressed && player.position.x < 400) {
		player.velocity.x = 5;
	} else if (keys.leftKey.pressed && player.position.x > 100) {
		player.velocity.x = -5;
	} else {
		player.velocity.x = 0;
		if (keys.rightKey.pressed && isCheckpointCollisionDetectionActive) {
			platforms.forEach((platform) => {
				platform.position.x -= 5;
			});
			checkpoints.forEach((checkpoint) => {
				checkpoint.position.x -= 5;
			});
		} else if (keys.leftKey.pressed && isCheckpointCollisionDetectionActive) {
			platforms.forEach((platform) => {
				platform.position.x += 5;
			});
			checkpoints.forEach((checkpoint) => {
				checkpoint.position.x += 5;
			});
		}
	}
	platforms.forEach((platform) => {
		const collisionDetectionRules = [
			player.position.y + player.height <= platform.position.y,
			player.position.y + player.height + player.velocity.y >=
				platform.position.y,
			player.position.x >= platform.position.x - player.width / 2,
			player.position.x <=
				platform.position.x + platform.width - player.width / 3,
		];
		//if all the above rules in the collisionDetectionRules array is true
		if (collisionDetectionRules.every((rule) => rule)) {
			player.velocity.y = 0;
			return;
		}
		const platformDetectionRules = [
			player.position.x >= platform.position.x - player.width / 2,
			player.position.x <=
				platform.position.x + platform.width - player.width / 3,
			player.position.y + player.height >= platform.position.y,
			player.position.y <= platform.position.y + platform.height,
		];
		//if all the above rules in the platformDetectionRules array is true
		if (platformDetectionRules.every((rule) => rule)) {
			player.position.y = platform.position.y + player.height;
			player.velocity.y = gravity;
		}
	});
	checkpoints.forEach((checkpoint, index) => {
		const checkpointDetectionRules = [
			player.position.x >= checkpoint.position.x,
			player.position.y >= checkpoint.position.y,
			player.position.y + player.height <=
				checkpoint.position.y + checkpoint.height,
			isCheckpointCollisionDetectionActive,
		];
		if (checkpointDetectionRules.every((rule) => rule)) {
			checkpoint.claim();
		}
		//condition to check if player has reached last checkpoint
		if (index === checkpoints.length - 1) {
			isCheckpointCollisionDetectionActive = false;
			showCheckpointScreen('You reached the final checkpoint!');
			movePlayer('ArrowRight', 0, false);
		} else if (
			player.position.x >= checkpoint.position.x &&
			player.position.x <= checkpoint.position.x + 40
		) {
			showCheckpointScreen('You reached a checkpoint!');
		}
	});
};
//------manage player movements when L/R arrow keys pressed + movePlayer()
const keys = {
	rightKey: {
		pressed: false,
	},
	leftKey: {
		pressed: false,
	},
};
//*check notes
const movePlayer = (key, xVelocity, isPressed) => {
	if (!isCheckpointCollisionDetectionActive) {
		player.velocity.x = 0;
		player.velocity.y = 0;
		return;
	}
	switch (key) {
		case 'ArrowLeft':
			keys.leftKey.pressed = isPressed;
			if (xVelocity === 0) {
				player.velocity.x = xVelocity;
			}
			player.velocity.x -= xVelocity;
			break;
		case 'ArrowRight':
			keys.rightKey.pressed = isPressed;
			if (xVelocity === 0) {
				player.velocity.x = xVelocity;
			}
			player.velocity.x += xVelocity;
			break;
		case 'ArrowUp': //jump cases
		case ' ':
		case 'Spacebar':
			keys.leftKey.pressed = isPressed;
			if (xVelocity === 0) {
				player.velocity.x = xVelocity;
			}
			player.velocity.y -= 8;
			break;
	}
};
//-----
const showCheckpointScreen = (msg) => {
	checkpointScreen.style.display = 'block';
	checkpointMessage.textContent = msg;
	if (isCheckpointCollisionDetectionActive) {
		setTimeout(() => (checkpointScreen.style.display = 'none'), 2000);
	}
};
//-----eventListener for startBtn, player move keys (destructure event object to get key prop)
startBtn.addEventListener('click', startGame);
window.addEventListener('keydown', ({ key }) => {
	movePlayer(key, 8, true);
});
window.addEventListener('keyup', ({ key }) => {
	movePlayer(key, 0, false);
});
//----------------------------------------------------------------------------

// NOTES:
// Canvas API used to create graphics
// canvas.getContext(contextType, contextAttributes) method provides context for where grahpics will be rendered
//(...drawing context on the canvas)
//fillRect(x, y, width, height)
//The fillRect() method draws a filled rectangle whose starting point is at (x, y) and whose size is specified by width and height. The fill style is determined by the current fillStyle attribute.
// clearRect(x, y, width, height) Web API - can be used to clear the canvas before rendering the next frame of the animation.
//When the player moves to the right, you will need to adjust its velocity. (x)
//When the player jumps up, you will need to add the logic for adjusting its velocity. (y)
//*movePlayer() - In the game, the player will interact with different checkpoints. If the isCheckpointCollisionDetectionActive is false, then you will need to stop the player's movements on the x and y axis.
//The player can jump up by using the up arrow key or the spacebar.
//The window.requestAnimationFrame() method tells the browser you wish to perform an animation -
//--> requestAnimationFrame(callback) -- callback function is passed a single argument: a DOMHighResTimeStamp indicating the end time of the previous frame's rendering (based on the number of milliseconds since time origin).
