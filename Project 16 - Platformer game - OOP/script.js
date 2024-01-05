// declare/assign variables for DOM elements
const startScreen = document.querySelector('.start-screen');
const checkpointScreen = document.querySelector('.checkpoint-screen');
const checkpointMessage = document.querySelector('.checkpoint-screen > p');
const startBtn = document.getElementById('start-btn');
const canvas = document.getElementById('canvas');
//-------------------------------Setting up <canvas>-------------------------------------------
const ctx = canvas.getContext('2d');
//innerWidth/Height are props representing interior W/H of the browser window
canvas.width = innerWidth;
canvas.height = innerHeight;
//-------------------------------Setting up game variables-------------------------------------------
const gravity = 0.5;
//The player will have the opportunity to cross different checkpoints. Need to keep track of the status for the checkpoint collision detection.
let isCheckpointCollisionDetectionActive = true;
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
//-----instantiate new player
const player = new Player();
//-----------------------------GAME FUNCTIONS/LOGIC---------------------------
//change display from start screen to canvas, call draw( ) method
const startGame = () => {
	canvas.style.display = 'block';
	startScreen.style.display = 'none';
	player.draw();
};
//-----eventListener for startBtn
startBtn.addEventListener('click', startGame);
//----------------------------------------------------------------------------

// NOTES:
// Canvas API used to create graphics
// canvas.getContext(contextType, contextAttributes) method provides context for where grahpics will be rendered
//(...drawing context on the canvas)
//fillRect(x, y, width, height)
//The fillRect() method draws a filled rectangle whose starting point is at (x, y) and whose size is specified by width and height. The fill style is determined by the current fillStyle attribute.
//When the player moves to the right, you will need to adjust its velocity. (x)
//When the player jumps up, you will need to add the logic for adjusting its velocity. (y)
