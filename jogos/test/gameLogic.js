// Variable declaration

//=========================================================//

const grassColor = "#5FDF5F";
const playerColor = "#22227F";
const wallColor = "#7F7F7F";
const wallDarkerColor = "#5F5F5F";
const defaultColor = "#000000";

const DEGTORAD = 0.0174532925;
const RADTODEG = 57.2957795131;

var fps = 20;

var canvas = /**@type {HTMLCanvasElement} */ document.getElementById("gameScreen");
var fake3dcanvas = /**@type {HTMLCanvasElement} */ document.getElementById("game3dScreen");
var ctx = /**@type {CanvasRenderingContext2D} */ (canvas.getContext('2d')) ;
var fake3dctx = /**@type {CanvasRenderingContext2D} */ (fake3dcanvas.getContext('2d')) ;

var window_width, window_height;

var grid_width, grid_height;
var cell_hcount, cell_vcount;
var cell_width, cell_height;

var level = [];

level.push("................");
level.push(".gggggggggggggg.");
level.push(".g.gggggggg...g.");
level.push(".g...gggggggg.g.");
level.push(".g.ggg....ggg.g.");
level.push(".ggggg.gg.ggggg.");
level.push(".ggggg.gggggggg.");
level.push(".ggg...gg.ggggg.");
level.push(".gggggggg.ggggg.");
level.push(".ggg........ggg.");
level.push(".ggg.gggggg.ggg.");
level.push(".ggggggg-gggggg.");
level.push(".ggg.gggggg.ggg.");
level.push(".ggg........ggg.");
level.push(".gggggggggggggg.");
level.push("................");

var grid;

var walls;

var key = {};

var player;

var resw = 90;
var resh = 50;
var ratio;

var fov = 90;

var hits = {};

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

ratio = (min_canvas_side/resw);

fake3dcanvas.width = resw * ratio;
fake3dcanvas.height = resh * ratio;

fake3dctx.scale(ratio,ratio);

grid_width = canvas.width;
grid_height = canvas.height;

cell_hcount = level[0].length;
cell_vcount = level.length;

let min_side = Math.min(grid_width, grid_height);

cell_width = min_side/cell_hcount;
cell_height = min_side/cell_vcount;

grid = [];
walls = [];

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
				walls.push({
					gridPos: new vec2(w, h)
				});
				break;

			case "-":
				let r = Math.min(cell_width/4, cell_height/4);
				player = {
					radius: r,
					worldPos: new vec2( w*cell_width+cell_width/2, h*cell_height+cell_height/2),
					direction: 90,
					speed: min_canvas_side/100,
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

function moveLeft() {
	player.direction += 6;
}

function moveUp() {
	move(1);
}

function moveRight() {
	player.direction -= 6;
}

function moveDown() {
	move(-1);
}

function move( signal ) {
	
	let ldirx = lengthdir_x( signal*player.speed, player.direction );
	let ldiry = lengthdir_y( signal*player.speed, player.direction );

	let next = player.worldPos.sum( new vec2( ldirx, ldiry ) );

	if ( !isInsideWall( next ) ) {
		player.worldPos = next;
	}

}

function update() {

	// <
	if (key[37]){
		moveLeft();
	}

	// ^
	if (key[38]){
		moveUp();
	}

	// >
	if (key[39]){
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

function drawPlayer() {

	ctx.fillStyle = playerColor;
	ctx.beginPath();
	ctx.arc( player.worldPos.x, player.worldPos.y, player.radius, 0, Math.PI*2, true );
	ctx.fill();

}

function draw(){

	ctx.clearRect(0, 0, min_canvas_side, min_canvas_side);

	for (let row of grid) {

		for (let cell of row) {

			drawSquare( cell.x * cell_width, cell.y * cell_height, cell_width+1, cell_height+1, cell.color);
			
		}

	}

	drawSquare( player.x * cell_width, player.y * cell_height, cell_width, cell_height, player.color);

	let ldir = new vec2( lengthdir_x( 1, player.direction ), lengthdir_y( 1, player.direction ) );

	//raytracing do caralho
	//esse for aqui é pra iterar por cada pixel da 'câmera'
	for (let i=0; i<resw; i++) {

		let ldirx = lengthdir_x( min_canvas_side*1.5, player.direction + lerp( Math.floor(fov/2), Math.ceil(-fov/2), i/(resw-1) ) );
		let ldiry = lengthdir_y( min_canvas_side*1.5, player.direction + lerp( Math.floor(fov/2), Math.ceil(-fov/2), i/(resw-1) ) );

		let ray = [
			new vec2( player.worldPos.x, player.worldPos.y ),
			new vec2( player.worldPos.x + ldirx, player.worldPos.y + ldiry ),
		]

		ctx.strokeStyle = "#FFFFFF";
		ctx.beginPath();
		ctx.moveTo( ray[0].x, ray[0].y);
		ctx.lineTo( ray[1].x, ray[1].y );
		ctx.stroke();

		let intersections = [];

		for ( let wall of walls ) {

			let left = [
				new vec2( wall.gridPos.x*cell_width, (wall.gridPos.y+1)*cell_height ),
				new vec2( wall.gridPos.x*cell_width, wall.gridPos.y*cell_height ),
			];

			let top = [
				new vec2( wall.gridPos.x*cell_width, wall.gridPos.y*cell_height ),
				new vec2( (wall.gridPos.x+1)*cell_width, wall.gridPos.y*cell_height ),
			];

			let right = [
				new vec2( (wall.gridPos.x+1)*cell_width, (wall.gridPos.y+1)*cell_height ),
				new vec2( (wall.gridPos.x+1)*cell_width, wall.gridPos.y*cell_height ),
			];

			let bottom = [
				new vec2( ( wall.gridPos.x )*cell_width, (wall.gridPos.y+1)*cell_height ),
				new vec2( (wall.gridPos.x+1)*cell_width, (wall.gridPos.y+1)*cell_height ),
			];

			let edges = [ left, top, right, bottom ];

			for ( let edge of edges ) {

				let intersection = whereTLI( ray[0], ray[1], edge[0], edge[1] );

				//se esta intersecção filha da puta está nas paredes
				if ( intersection.x != Infinity && intersection.y != Infinity ) {
					if (intersection.x >= wall.gridPos.x*cell_width && intersection.x <= (wall.gridPos.x+1)*cell_width) {
						if (intersection.y >= wall.gridPos.y*cell_height && intersection.y <= (wall.gridPos.y+1)*cell_height) {

							//se esta merda está no campo de visão
							let intDir = intersection.sub(player.worldPos);
							if ( intDir.dot(ldir) > 0 ) {

								intersections.push(intersection);

							}

						}
					}
				}

			}

		}

		let closest = intersections;

		let minDist = Infinity;

		for ( let intersection of intersections ) {

			let dist = player.worldPos.sub(intersection).sqrNorm();
			if ( dist < minDist ) {

				closest = intersection;
				minDist = dist;

			}
			
		}

		ctx.fillStyle = "#FF0000";
		ctx.beginPath();
		ctx.arc( closest.x, closest.y, player.radius/2, 0, Math.PI*2, true );
		ctx.fill();

		hits[i] = Math.sqrt(minDist)/(min_canvas_side*2);

	}

	drawPlayer();

	ctx.strokeStyle = defaultColor;
	ctx.beginPath();
	ctx.rect(0,0,grid_width-1,grid_height-1);
	ctx.stroke();

}

function drawFake3d(){

	fake3dctx.clearRect(0, 0, resw, resh);

	fake3dctx.fillStyle = "#A3DBF7";
	fake3dctx.beginPath();
	fake3dctx.rect(0, 0, resw, resh/2);
	fake3dctx.fill();

	fake3dctx.fillStyle = grassColor;
	fake3dctx.beginPath();
	fake3dctx.rect(0, resh/2, resw, resh/2);
	fake3dctx.fill();

	//raytrace
	for (let i=0; i<resw; i++) {

		drawColumn(i, 1/hits[i], wallColor);

	}

	fake3dctx.strokeStyle = defaultColor;
	fake3dctx.beginPath();
	fake3dctx.rect(0, 0, resw, resh);
	fake3dctx.stroke();

}

function drawColumn(x, size, color) {
	fake3dctx.strokeStyle = color;
	fake3dctx.beginPath();
	fake3dctx.rect(x, resh/2-size/2, 1, size);
	fake3dctx.stroke();
}

function loop() {

	update();
	draw();
	drawFake3d();

}

function drawSquare(x1, y1, w, h, color) {

	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.rect(x1, y1, w, h);
	ctx.fill();

}

function lengthdir_x( dist, angle ) {

	return dist * Math.cos( angle*DEGTORAD );

}

function lengthdir_y( dist, angle ) {

	return dist * -Math.sin( angle*DEGTORAD );

}

function lerp(v0, v1, t) {

  	return (1 - t) * v0 + t * v1;

}

function isInsideWall( point ) {

	for ( let wall of walls ) {
		if ( point.x >= wall.gridPos.x*cell_width && point.x <= wall.gridPos.x*cell_width + cell_width )
			if ( point.y >= wall.gridPos.y*cell_height && point.y <= wall.gridPos.y*cell_height + cell_height )
				return wall;
	}

	return null;

}

function TLI ( vecA, vecB, vecC, vecD ) {

	// Express the straight lines in the form of y = ax + b (line passing A,B) and y = cx + d (line passing C,D);
	// See if C and D are on the same side of y = ax+b;
	// See if A and B are on the same side of y = cx+d;
	// If the answer to the above are both no, then there is an intersection. Otherwise there is no intersection;

	return ( !sameSideOfLine( vecA, vecB, vecC, vecD ) && !sameSideOfLine( vecC, vecD, vecA, vecB ) );
	
	// TODO:
	// Find the intersection if there is one.

}

function whereTLI ( vecA, vecB, vecC, vecD ) {

	if ( vecA.x > vecB.x )
	{

		let temp = vecA.x;
		vecA.x = vecB.x;
		vecB.x = temp;

		temp = vecA.y;
		vecA.y = vecB.y;
		vecB.y = temp;

	}

	if ( vecC.x > vecD.x )
	{

		let temp = vecC.x;
		vecC.x = vecD.x;
		vecD.x = temp;

		temp = vecC.y;
		vecC.y = vecD.y;
		vecD.y = temp;

	}

	let a1, b1, a2, b2;

	let abIsVertical = false;
	let cdIsVertical = false;

	if ( vecA.x != vecB.x )
	{

		// primeira função y1 = a1*x + b1
		a1 = (vecB.y - vecA.y) / ( vecB.x - vecA.x );
		b1 = vecB.y - a1 * vecB.x;

	} else {

		abIsVertical = true;

	}

	if ( vecC.x != vecD.x )
	{
		// segunda função y2 = a2*x + b2
		a2 = (vecD.y - vecC.y) / ( vecD.x - vecC.x );
		b2 = vecD.y - a2 * vecD.x;

	} else {

		cdIsVertical = true;

	}

	if (abIsVertical) {

		if (cdIsVertical) {

			return new vec2(Infinity, Infinity);

		} else {

			return new vec2( vecA.x, a2*vecA.x + b2 );

		}

	} else {

		if (cdIsVertical) {

			return new vec2( vecC.x, a1*vecC.x + b1 );
			
		} else {

			let x = (b2 - b1)/(a1 - a2);

			let y1 = a1*x + b1;
			let y2 = a2*x + b2;

			if ( y1 == y2 ) {

				return new vec2( x, y1 );

			} else {

				return new vec2( Infinity, Infinity );

			}
			

		}

	}

}

function sameSideOfLine ( vecA, vecB, vecC, vecD )
{

	if ( vecA.x > vecB.x )
	{

		let temp = vecA.x;
		vecA.x = vecB.x;
		vecB.x = temp;

		temp = vecA.y;
		vecA.y = vecB.y;
		vecB.y = temp;

	}

	if ( vecA.x != vecB.x )
	{

		let a, b;

		a = (vecB.y - vecA.y) / ( vecB.x - vecA.x );
		b = vecB.y - a * vecB.x;

		return (vecC.y >= a*vecC.x + b) == (vecD.y >= a*vecD.x + b);

	} else {

		return (vecC.x >= vecA.x) == (vecD.x >= vecA.x);

	}

}