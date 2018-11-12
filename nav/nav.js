import { vec2 } from './vec2.js';

//=========================================================//

const EMPTY = 0;
const START = 1;
const GOAL = 2;
const OPEN = 3;
const CLOSED = 4;
const PATH = 5;

//0
const COLOR_EMPTY = "#DFDFDF";

//1
const COLOR_START = "#0000FF";

//2
const COLOR_GOAL = "#FFFF00";

//3
const COLOR_OPEN = "#008800";

//4
const COLOR_CLOSED = "#880000";

//5
const COLOR_PATH = "#00FFFF";

const NODE_COLOR = [COLOR_EMPTY, COLOR_START, COLOR_GOAL, COLOR_OPEN, COLOR_CLOSED, COLOR_PATH];

const FPS = 25;


//=========================================================//

/**@type {HTMLCanvasElement} */ var canvas = document.getElementById("view");
/**@type {CanvasRenderingContext2D} */ var ctx = (canvas.getContext('2d')) ;
var rect = canvas.getBoundingClientRect();
var button = document.getElementById("update");

document.addEventListener("keydown", handleKeyDown, false);
document.addEventListener("keyup", handleKeyUp, false);
canvas.addEventListener("mousemove", mouseMove, false);
canvas.addEventListener("click", mouseClick, false);
canvas.addEventListener("touchstart", touchClick, false);

//=========================================================//

var key = {};

var mouseX = -1;
var mouseY = -1;
var mouseW = -1;
var mouseH = -1;

//=========================================================//


export class Node {

	constructor( x, y ) {

		this.x = x;
		this.y = y;

		this.neighbours = [];

	}


	addNeighbourNode( node ) {

		this.neighbours.push( node );

	}


	getNeighbourNodes() {

		return this.neighbours;

	}


}


//=========================================================//

// CONFIGURAÇÃO DO CANVAS

var view_width = 640;
var view_height = 480;

canvas.width = view_width;
canvas.height = view_height;

var canvasHasBeenUpdated = true;

var nodes = [];

gridReset();

//=========================================================//

// INICIANDO O GRID

function gridReset() {

	let node = new Node( mouseX, mouseY );
	nodes.push(node);

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

/*	let skip = FRAMESKIP;

	while (skip) {
		updateAStar();
		skip--;
	}
*/

}


// DESENHO

function draw(){

	if ( canvasHasBeenUpdated ) {

		drawSquare( 0, 0, canvas.width, canvas.height, COLOR_EMPTY);

		for (let node of nodes) {

			drawSquare( node.x-8, node.y-8, 16, 16, "#FF0000");
			
			for ( let neighbour of node.getNeighbourNodes() ) {

				ctx.strokeStyle="#000000";

				ctx.beginPath();
				ctx.moveTo( node.x, node.y );
				ctx.lineTo( neighbour.x, neighbour.y );
				ctx.stroke();
				
			}

		}

		canvasHasBeenUpdated = false;

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

			if (current.ID != START)
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
		if (cell.ID != GOAL)
			cell.ID = PATH;
		if (cell.parentCell.parentCell)
			traceback(cell.parentCell);
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

    // shift = 16

    // space = 32

    // left  = 37
    // up    = 38
    // right = 39
    // down  = 40 

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
	
    console.log(mouseX, mouseY);

    let node = new Node( mouseX, mouseY );

    nodes.push(node);

    canvasHasBeenUpdated = true;

}

function touchClick(event) {

	var touches = event.changedTouches;

	for (var i=0; i < touches.length; i++) {

		mouseX = touches[i].pageX;
		mouseY = touches[i].pageY;

		console.log(mouseX, mouseY);

		canvasHasBeenUpdated = true;

	}

}

function drawSquare(x1, y1, w, h, color) {

	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.rect(x1, y1, w, h);
	ctx.fill();

}

//=========================================================//