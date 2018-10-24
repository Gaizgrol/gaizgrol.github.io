// Variable declaration

//=========================================================//

const grassColor = "#5FDF5F";
const playerColor = "#22227F";
const wallColor = "#7F7F7F";
const defaultColor = "#000000";

var fps = 15;

var canvas = /**@type {HTMLCanvasElement} */ document.getElementById("gameScreen");
var ctx = /**@type {CanvasRenderingContext2D} */ (canvas.getContext('2d')) ;

var window_width, window_height;

var grid_width, grid_height;
var cell_hcount, cell_vcount;
var cell_width, cell_height;

var level = [];

level.push("gggggggggggggggg");
level.push("gggggggggggggggg");
level.push("gg.gggggggg...gg");
level.push("gg....ggggggg.gg");
level.push("gg.gggggggggg.gg");
level.push("gggggg....gggggg");
level.push("gggggg.gg.gggggg");
level.push("gggggg.ggggggggg");
level.push("gggg...gg.gggggg");
level.push("ggggggggg.gggggg");
level.push("gggg........gggg");
level.push("gggg.gggggg.gggg");
level.push("gggggggg-ggggggg");
level.push("gggg.gggggg.gggg");
level.push("gggg........gggg");
level.push("gggggggggggggggg");

var grid;

var key = {};

var player;

//=========================================================//


// Init

//=========================================================//

document.addEventListener("keydown", handleKeyDown, false);
document.addEventListener("keyup", handleKeyUp, false);

window_width = window.innerWidth;
window_height = window.innerHeight;

console.log(window_width, window_height);

let min_canvas_side = Math.min(window_width*0.75, window_height*0.75);

canvas.width = min_canvas_side;
canvas.height = min_canvas_side;

grid_width = canvas.width;
grid_height = canvas.height;

cell_hcount = level[0].length;
cell_vcount = level.length;

let min_side = Math.min(grid_width, grid_height);

cell_width = min_side/cell_hcount;
cell_height = min_side/cell_vcount;

grid = [];

for (let h=0; h<cell_vcount; h++) {

	let row = [];

	for (let w=0; w<cell_hcount; w++) {

		let cellColor;

		switch (level[h][w]) {
			case "g":
				cellColor = grassColor;
				break;

			case ".":
				cellColor = wallColor;
				break;

			case "-":
				player = {
					x: w,
					y: h,
					color: playerColor,
				}
				break;
			
			default:
				cellColor = defaultColor;
				break;
		}

		let cell = {
			x: w,
			y: h,
			color: cellColor,
		}

		row.push(cell);
		
	}

	grid.push(row);

}

setInterval(loop, 1000/fps);
//loop();

//=========================================================//


function handleKeyDown(e){

	if (!key[e.keyCode]) {
		key[e.keyCode] = true;
	}

}

function handleKeyUp(e){

	if (key[e.keyCode]) {
		key[e.keyCode] = false;
	}

}

function moveLeft() {
	(player.x)?player.x--:player.x;
	if (grid[player.y][player.x].color == wallColor){
		player.x++;
	}
}

function moveUp() {
	(player.y)?player.y--:player.y;
	if (grid[player.y][player.x].color == wallColor){
		player.y++;
	}
}

function moveRight() {
	(player.x<cell_hcount-1)?player.x++:player.x=cell_hcount-1;
	if (grid[player.y][player.x].color == wallColor){
		player.x--;
	}
}

function moveDown() {
	(player.y<cell_vcount-1)?player.y++:player.y=cell_vcount-1;
	if (grid[player.y][player.x].color == wallColor){
		player.y--;
	}
}

function update() {

	// <
	if ( key[37] && !(key[38] || key[40]) ){
		moveLeft();
	}

	// ^
	if (key[38]){
		moveUp();
	}

	// >
	if (key[39] && !(key[38] || key[40])){
		moveRight();
	}

	// v
	if (key[40]){
		moveDown();
	}

//	if ( key[37] || key[38] || key[39] || key[40] ) {
//		aiUpdate();
//	}

}

function draw(){

	ctx.clearRect(0, 0, window_width, window_height);

	for (let row of grid) {

		for (let cell of row) {

			drawSquare( cell.x * cell_width, cell.y * cell_height, cell_width+1, cell_height+1, cell.color);
			
		}

	}

	drawSquare( player.x * cell_width, player.y * cell_height, cell_width, cell_height, player.color);

	ctx.strokeStyle = defaultColor;
	ctx.beginPath();
	ctx.rect(0,0,grid_width-1,grid_height-1);
	ctx.stroke();

}

function loop() {

	update();
	draw();

	//requestAnimationFrame( loop );

}

function drawSquare(x1, y1, w, h, color) {

	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.rect(x1, y1, w, h);
	ctx.fill();

}