//=========================================================//

//0
const COLOR_EMPTY = "#DFDFDF";
const COLOR_GRID = "#000000";

//1
const COLOR_BLOCK = "#6F3F12";

//2
const COLOR_START = "#0000FF";

const COLOR_OPEN = "#008800";
const COLOR_CLOSED = "#880000"

//3
const COLOR_GOAL = "#FFFF00";

const FPS = 25;

//=========================================================//

/**@type {HTMLCanvasElement} */ var canvas = document.getElementById("grid");
/**@type {CanvasRenderingContext2D} */ var ctx = (canvas.getContext('2d')) ;

document.addEventListener("keydown", handleKeyDown, false);
document.addEventListener("keyup", handleKeyUp, false);

//=========================================================//

//=========================================================//

var grid_width = 40;
var grid_height = 40;

var cell_size = 16;

canvas.width = grid_width * cell_size;
canvas.height = grid_width * cell_size;

var grid = [];

class Cell {
	
	constructor(x, y){

		this.x = x;
		this.y = y;

	}

}


for (let h=0; h<grid_height; h++) {

	let row = [];

	for (let w=0; w<grid_width; w++) {

		let cell = {
			x: w,
			y: h,
			f: 0,
			g: 0,
			h: 0,
			color: COLOR_EMPTY,
		}

		row.push(cell);
		
	}

	grid.push(row);

}

setInterval(loop, 1000/FPS);

function update() {

}

function draw(){

	for (let row of grid)
		for (let cell of row)
			drawSquare( cell.x * cell_size, cell.y * cell_size, cell_size-1, cell_size-1, cell.color);

}

function loop() {

	update();
	draw();

}

//=========================================================//


function handleKeyDown(e){

	if (!key[e.keyCode]) {
		key[e.keyCode] = true;
	}

	// space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }

}

function handleKeyUp(e){

	if (key[e.keyCode]) {
		key[e.keyCode] = false;
	}

}

function drawSquare(x1, y1, w, h, color) {

	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.rect(x1, y1, w, h);
	ctx.fill();

}