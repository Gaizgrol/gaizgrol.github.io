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

class vec2 {
	
	constructor(x, y){

		this.x = x;
		this.y = y;

	}

	sum( otherVec ) {
		return new vec2( otherVec.x + this.x, otherVec.y + this.y );
	}

	sub( otherVec ) {
		return new vec2( this.x - otherVec.x, this.y - otherVec.y );
	}

	norm() {
		let tx = this.x;
		let ty = this.y;
		return Math.sqrt(tx*tx + ty*ty);
	}

	sqrNorm() {
		let tx = this.x;
		let ty = this.y;
		return tx*tx + ty*ty;
	}

	normalize() {
		let n = this.norm();
		if (n) {
			return new vec2(this.x/n, this.y/n);
		}else{
			return new vec2(0, 0);
		}
	}

	constMult( c ) {
		return new vec2(this.x*c, this.y*c);
	}

	dot( otherVec ) {
		let tx = this.x;
		let ty = this.y;
		let ox = otherVec.x;
		let oy = otherVec.y;
		return tx*ox + ty*oy;
	}

	project( B ) {
		let n = B.normalize();
		let len = this.dot( n );
		return n.constMult(len);
	}

	gramSchmidt() {
		return new vec2( this.y, -this.x );
	}

}


class Node {

	constructor( x, y ) {

		this.x = x;
		this.y = y;

		this.neighbours = [];

		this.isSelected = false;
		this.status = EMPTY;

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
var selectedNode = null;

gridReset();

//=========================================================//

// INICIANDO O GRID

function gridReset() {

	let node0 = new Node( 111, 133 );
	let node1 = new Node( 155, 362 );
	let node2 = new Node( 357, 228 );
	let node3 = new Node( 307, 124 );
	let node4 = new Node( 489, 135 );

	node0.neighbours.push( node3, node1 );
	node1.neighbours.push( node2 );
	node2.neighbours.push( node3 );
	node3.neighbours.push( node4 );

	nodes.push(node0);
	nodes.push(node1);
	nodes.push(node2);
	nodes.push(node3);
	nodes.push(node4);

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

		drawSquare( 0, 0, canvas.width, canvas.height, "#FFFFFF");

		for (let node of nodes) {
			if (node.isSelected)
				drawSquare( node.x-9, node.y-9, 18, 18, "#0000FF");
			drawSquare( node.x-8, node.y-8, 16, 16, "#FF0000");
		}

		for (let node of nodes)
			for ( let neighbour of node.getNeighbourNodes() )
				drawArrow(node.x, node.y, neighbour.x, neighbour.y, "#000000");

		if (selectedNode){
			drawSquare( selectedNode.x-8, selectedNode.y-8, 16, 16, "#00FF00");
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
    // ctrl  = 17

    // space = 32

    // left  = 37
    // up    = 38
    // right = 39
    // down  = 40 

}


// TECLA LIBERADA

function handleKeyUp(e){

	if (key[e.keyCode])
		key[e.keyCode] = false;

}


// MOVIMENTO DO MOUSE

function mouseMove(event) {

    mouseX = event.pageX - rect.x;
    mouseY = event.pageY - rect.y;

}

function mouseClick(event) {

	mouseMove(event);

    if ( key[16] ) {

    	for ( let node of nodes )
    		if ( mouseX >= node.x-8 && mouseX <= node.x+8 )
    			if ( mouseY >= node.y-8 && mouseY <= node.y+8 ) {
    				
    				node.isSelected = true;
    				if ( selectedNode ) {

    					let alreadyOnArray = false;
    					for ( let neighbour of selectedNode.neighbours ) {
    						if ( neighbour == selectedNode ) {
    							alreadyOnArray = true
    							break;
    						}
    					}

    					if (!alreadyOnArray)
    						selectedNode.neighbours.push(node);

    				}

    			}

    } else if ( key[17] ) {

    	for ( let node of nodes )
    		node.isSelected = false;

    	let nodeOnCursor;

    	for ( let node of nodes )
    		if ( mouseX >= node.x-8 && mouseX <= node.x+8 )
    			if ( mouseY >= node.y-8 && mouseY <= node.y+8 ) {
    				nodeOnCursor = node;
    			}

   		selectedNode = nodeOnCursor;

    } else {

    	for ( let node of nodes )
    		node.isSelected = false;

	    let node = new Node( mouseX, mouseY );
	    nodes.push(node);

	}

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

function drawArrow(fromx, fromy, tox, toy, color){
    
    var headlen = 16;   // length of head in pixels
    var angle = Math.atan2(toy-fromy,tox-fromx);

    ctx.strokeStyle = color;

    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));

    ctx.stroke();
}

//=========================================================//