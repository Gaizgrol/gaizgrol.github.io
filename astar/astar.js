//=========================================================//

const EMPTY = 0;
const BLOCK = 1;
const START = 2;
const GOAL = 3;

const OPEN = 4;
const CLOSED = 5;

const PATH = 6;

//0
const COLOR_EMPTY = "#DFDFDF";

//1
const COLOR_BLOCK = "#000000";

//2
const COLOR_START = "#0000FF";

//3
const COLOR_GOAL = "#FFFF00";

//4
const COLOR_OPEN = "#008800";

//5
const COLOR_CLOSED = "#880000";

//6
const COLOR_PATH = "#00FFFF";

const ITEM_COLOR = [COLOR_EMPTY, COLOR_BLOCK, COLOR_START, COLOR_GOAL, COLOR_OPEN, COLOR_CLOSED, COLOR_PATH];

const FPS = 25;

const FRAMESKIP = 5;

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
var button = document.getElementById("update");

document.addEventListener("keydown", handleKeyDown, false);
document.addEventListener("keyup", handleKeyUp, false);
canvas.addEventListener("mousemove", mouseMove, false);
canvas.addEventListener("click", mouseClick, false);
canvas.addEventListener("touchstart", touchClick, false);
button.addEventListener("click", update, false);

//=========================================================//

var key = {};

//=========================================================//

// CONFIGURAÇÃO DO GRID

var grid_width = 40;
var grid_height = 40;

var cell_size = 16;

canvas.width = grid_width * cell_size;
canvas.height = grid_width * cell_size;

var grid = [];

gridReset();

//=========================================================//

// INICIANDO O GRID

function gridReset() {

	grid = [];

	for (let h=0; h<grid_height; h++) {

		let row = [];

		for (let w=0; w<grid_width; w++) {

			let cell = {
				ID: 0,
				parentCell: null,
				x: w,
				y: h,
				h: 0,
				g: 0,
				f: 0,
			}

			row.push(cell);
			
		}

		grid.push(row);

	}

	started = false;

}

//=========================================================//

// LISTA DE CÉLULAS ABERTAS PARA ANÁLISE

var start = null;
var end = null;

var openList = [];
var closedList = [];

var started = false;
var found = false;

//=========================================================//

// LOOP DO PROGRAMA

setInterval(loop, 1000/FPS);

//=========================================================//


// ATUALIZAÇÃO DAS CÉLULAS

function update() {

	let skip = FRAMESKIP;

	while (skip) {
		updateAStar();
		skip--;
	}

}


// DESENHO

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


// LOOP PRINCIPAL

function loop() {


	draw();

}

//=========================================================//

// FUNÇÕES DO A*

function updateAStar() {

	if (!found)	{

		if (!started) {
			
			if (start) {
				openList.push(start);
				started = true;
			}

		} else {

			current = getLowestFCostCell();

			for ( let neighbour of getNeighbourCells(current) )
			    updateCell(neighbour, current);

			current.ID = CLOSED;

			var index = openList.indexOf(current);
			if (index > -1)
			  openList.splice(index, 1);

		}

	}

}


function updateCell( cell, parent ) {

	if (cell.ID == GOAL) {
        cell.parentCell = parent;
        found = true;
        traceback(cell);
    }
        
    if (cell.ID == EMPTY){
        cell.ID = OPEN;
        cell.parentCell = parent;
        cell.g = calculateG(parent, cell);
        cell.h = calculateH(cell, end);
        cell.f = cell.g + cell.h;
        openList.push(cell);
    }

}

function calculateH(from, to) {
    
    let x = from.x - to.x;
    let y = from.y - to.y;
    
    return Math.floor(10 * Math.sqrt( x*x + y*y ));
    
}


function calculateG(from, to) {
    
    let x = from.x - to.x;
    let y = from.y - to.y;
    
    return Math.floor(10 * Math.sqrt( x*x + y*y )) + from.g;
    
}


function getLowestFCostCell() {

	let lowestFCostCell = null;
	let lowestFCost = Infinity;

	for (let cell of openList) {
		if (cell.f < lowestFCost) {
			lowestFCost = cell.f;
			lowestFCostCell = cell;
		}
	}

	return lowestFCostCell;

}


function getNeighbourCells( cell ) {

	let neighbours = [];

	for (let i=cell.y-1; i<=cell.y+1; i++)
		for ( let j=cell.x-1; j<=cell.x+1; j++ )
			if ( (i>=0 && i<=grid.length-1) && (j>=0 && j<=grid[i].length-1) && cell!=grid[i][j] )
				neighbours.push(grid[i][j]);

	return neighbours;

}

function traceback(cell) {

	if (cell.parentCell) {
		cell.ID = PATH;
		traceback(cell.parentCell);
	}

}


function updateCellOnClick( mW, mH ) {

	if ( grid[mouseH][mouseW] == start )
		start = null;

	if ( grid[mouseH][mouseW] == end )
		end = null;

	grid[mouseH][mouseW].ID = menu.selectedIndex;

	if (menu.selectedIndex == START) {

		if (start)
			start.ID = EMPTY;
		start = grid[mouseH][mouseW];

	} else if (menu.selectedIndex == GOAL) {

		if (end)
			end.ID = EMPTY;
		end = grid[mouseH][mouseW];

	}

}

//=========================================================//

// FUNÇÕES DE INPUT

// TECLA APERTADA

function handleKeyDown(e){

	if (!key[e.keyCode]) {
		key[e.keyCode] = true;
	}

	// space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }

}


// TECLA LIBERADA

function handleKeyUp(e){

	if (key[e.keyCode]) {
		key[e.keyCode] = false;
	}

}


// MOVIMENTO DO MOUSE

function mouseMove(event) {

    mouseX = event.pageX - rect.x;
    mouseY = event.pageY - rect.y;

}

function mouseClick(event) {

	mouseMove(event);
	
	mouseW = (mouseX/cell_size) - (mouseX/cell_size)%1
	mouseH = (mouseY/cell_size) - (mouseY/cell_size)%1

   updateCellOnClick( mouseW, mouseH );

}

function touchClick(event) {

	event.preventDefault();
	var touches = event.changedTouches;

	for (var i=0; i < touches.length; i++) {

		mouseX = touches[i].pageX;
		mouseY = touches[i].pageY;

		mouseW = (mouseX/cell_size) - (mouseX/cell_size)%1
		mouseH = (mouseY/cell_size) - (mouseY/cell_size)%1

	    updateCellOnClick( mouseW, mouseH );

	}

}

function drawSquare(x1, y1, w, h, color) {

	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.rect(x1, y1, w, h);
	ctx.fill();

}

//=========================================================//