//=========================================================//

//0
const COLOR_EMPTY = "#DFDFDF";
const COLOR_GRID = "#000000";

//1
const COLOR_BLOCK = "#6F3F12";

//2
const COLOR_START = "#0000FF";

//3
const COLOR_GOAL = "#FFFF00";

//4
const COLOR_OPEN = "#008800";

//5
const COLOR_CLOSED = "#880000"

const ITEM_COLOR = [COLOR_EMPTY, COLOR_GRID, COLOR_START, COLOR_GOAL];

const FPS = 25;

var mouseX = -1;
var mouseY = -1;
var mouseW = -1;
var mouseH = -1;

//=========================================================//

/**@type {HTMLCanvasElement} */ var canvas = document.getElementById("grid");
/**@type {CanvasRenderingContext2D} */ var ctx = (canvas.getContext('2d')) ;
var rect = canvas.getBoundingClientRect();
var menu = document.getElementById("menu");
var menuItem = menu.options[menu.selectedIndex].text;

document.addEventListener("keydown", handleKeyDown, false);
document.addEventListener("keyup", handleKeyUp, false);
canvas.addEventListener("mousemove", mouseMove, false);
canvas.addEventListener("click", mouseClick, false);

//=========================================================//

var key = {};

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
			ID: 0,
		}

		row.push(cell);
		
	}

	grid.push(row);

}

setInterval(loop, 1000/FPS);

function update() {

}

function draw(){

	for (let row of grid) {
		for (let cell of row) {

			mouseW = (mouseX/cell_size) - (mouseX/cell_size)%1
			mouseH = (mouseY/cell_size) - (mouseY/cell_size)%1

			drawSquare( cell.x * cell_size, cell.y * cell_size, cell_size-1, cell_size-1, ITEM_COLOR[cell.ID]);

			if ( mouseW == cell.x && mouseH == cell.y ) {
				let rgb = (ITEM_COLOR[menu.selectedIndex]).slice(1, 7);
				let r = parseInt(rgb.slice(0,2), 16);
				let g = parseInt(rgb.slice(2,4), 16);
				let b = parseInt(rgb.slice(4,6), 16);
				drawSquare( cell.x * cell_size, cell.y * cell_size, cell_size-1, cell_size-1, "rgba("+r+","+g+","+b+", .5)");
			}


		}
	}

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

function mouseMove(event) {

    mouseX = event.clientX - rect.x;
    mouseY = event.clientY - rect.y;

}

function mouseClick(event) {

	mouseMove(event);
	
	mouseW = (mouseX/cell_size) - (mouseX/cell_size)%1
	mouseH = (mouseY/cell_size) - (mouseY/cell_size)%1

    grid[mouseH][mouseW].ID = menu.selectedIndex;

}

function drawSquare(x1, y1, w, h, color) {

	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.rect(x1, y1, w, h);
	ctx.fill();

}