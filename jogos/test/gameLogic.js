// Variable declaration

//=========================================================//

const grassColor = "#5FBF5F";
const playerColor = "#22227F";
const wallColor = "#7F7F7F";
const wallDarkerColor = "#5F5F5F";
const skyColor = "#7F7FFF";
const defaultColor = "#000000";

const DEGTORAD = 0.0174532925;
const RADTODEG = 57.2957795131;

const EPSILON = 0;

var fps = 20;

/**@type {HTMLCanvasElement} */ var canvas = document.getElementById("minimap");
/**@type {HTMLCanvasElement} */ var fake3dcanvas = document.getElementById("game3dScreen");
/**@type {CanvasRenderingContext2D} */ var ctx = (canvas.getContext('2d')) ;
/**@type {CanvasRenderingContext2D} */ var fake3dctx = (fake3dcanvas.getContext('2d')) ;

var image = document.getElementById('textureWall');
var leftHand = document.getElementById('textureLeft');
var rightHand = document.getElementById('textureRight');

var backSkyNight = document.getElementById('textureSkyNight');

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

var resw = 96;
var resh = 54;
var ratio;

var fov = 90;

var hits = {};

var showMinimap = false;

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

document.addEventListener("keydown", handleKeyDown, false);
document.addEventListener("keyup", handleKeyUp, false);

window_width = window.innerWidth;
window_height = window.innerHeight;

console.log(window_width, window_height);

let min_canvas_side = Math.min(window_width*0.95, window_height*0.95);

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
					z: 0,
					direction: 90,
					speed: min_canvas_side/100,
					health: 100,
					mana: 100,
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

//=========================================================//


function handleKeyDown(e){

	if (!key[e.keyCode]) {
		key[e.keyCode] = true;
	}

	// space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }

    // tab
	if (key[77]) {

		showMinimap = !showMinimap;

		canvas.style.display = (showMinimap)?"inline":"none";

	}

}

function handleKeyUp(e){

	if (key[e.keyCode]) {
		key[e.keyCode] = false;
	}

}

function moveLeft(n) {
	player.direction += n;
}

function moveUp(n) {
	move(1*n);
}

function moveRight(n) {
	player.direction -= n;
}

function moveDown(n) {
	move(-1*n);
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
	if (key[37]) {
		moveLeft(6);
	}

	// ^
	if (key[38]) {
		moveUp(1);
	}

	// >
	if (key[39]) {
		moveRight(6);
	}

	// v
	if (key[40]) {
		moveDown(1);
	}

	// ctrl
	if (key[16]) {
		if ( Math.abs(player.z-1) < 16 )
			player.z--;
	}

	// shift
	if (key[17]) {
		if ( Math.abs(player.z+1) < 16 )
			player.z++;
	}

	if (player.direction>=360)
		player.direction=player.direction%360;
	while (player.direction<0)
		player.direction+=360;

}

function drawPlayer() {

	ctx.fillStyle = playerColor;
	ctx.beginPath();
	ctx.arc( player.worldPos.x, player.worldPos.y, player.radius, 0, Math.PI*2, true );
	ctx.fill();

}

function drawLeftHand() {

	let mres = Math.min( resw, resh );

	fake3dctx.imageSmoothingEnabled = false;
	fake3dctx.drawImage( leftHand, 0, 0, leftHand.width, leftHand.height, resw/2-mres/2, resh-mres/2, mres/2, mres/2);

}

function drawRightHand() {

	let mres = Math.min( resw, resh );

	fake3dctx.imageSmoothingEnabled = false;
	fake3dctx.drawImage( rightHand, 0, 0, rightHand.width, rightHand.height, resw/2, resh-mres/2, mres/2, mres/2);

}

function drawCrosshair() {

	let mres = Math.min( resw, resh );

	fake3dctx.strokeStyle = "#FFD000";
	fake3dctx.beginPath();
	fake3dctx.moveTo( resw/2 - mres/25, resh/2 );
	fake3dctx.lineTo( resw/2 + mres/25, resh/2 );
	fake3dctx.stroke();

	fake3dctx.strokeStyle = "#FFD000";
	fake3dctx.beginPath();
	fake3dctx.moveTo( resw/2, resh/2 - mres/25 );
	fake3dctx.lineTo( resw/2, resh/2 + mres/25 );
	fake3dctx.stroke();

}

function drawHealth() {

	let mres = Math.min( resw, resh );

	fake3dctx.fillStyle = "#7F7F7F7F";
	fake3dctx.rect(0, resh - 2 - 2*mres/25, 8*mres/25, 2*mres/25 + 2);
	fake3dctx.fill();

	fake3dctx.strokeStyle = "#FF0000";
	fake3dctx.beginPath();
	fake3dctx.moveTo( 1, resh - 1 - mres/25);
	fake3dctx.lineTo( 1 + 2*mres/25, resh - 1 - mres/25 );
	fake3dctx.stroke();

	fake3dctx.strokeStyle = "#FF0000";
	fake3dctx.beginPath();
	fake3dctx.moveTo( 1 + mres/25, resh - 1 - 2*mres/25 );
	fake3dctx.lineTo( 1 + mres/25, resh - 1 );
	fake3dctx.stroke();

	fake3dctx.fillStyle = "#FF0000";
	fake3dctx.font = 2.5*mres/25+"px Arial";
	fake3dctx.fillText(player.health, 1 + 2*mres/25, resh - 1 ); 

}

function drawMana() {

}

function drawHUD() {

	drawLeftHand();
	drawRightHand();
	drawCrosshair();
	drawHealth();
	drawMana();

}

function draw(){

	ctx.clearRect(0, 0, min_canvas_side, min_canvas_side);

	for (let row of grid)
		for (let cell of row)
			drawSquare( cell.x * cell_width, cell.y * cell_height, cell_width+1, cell_height+1, cell.color);
			

	let lkx = lengthdir_x( min_canvas_side*1.5, player.direction + fov/2 );
	let lky = lengthdir_y( min_canvas_side*1.5, player.direction + fov/2 );
	
	ctx.strokeStyle = "#FFFFFF";
	ctx.beginPath();
	ctx.moveTo( player.worldPos.x, player.worldPos.y );
	ctx.lineTo( player.worldPos.x+lkx, player.worldPos.y+lky);
	ctx.stroke();

	lkx = lengthdir_x( min_canvas_side*1.5, player.direction - fov/2 );
	lky = lengthdir_y( min_canvas_side*1.5, player.direction - fov/2 );

	ctx.strokeStyle = "#FFFFFF";
	ctx.beginPath();
	ctx.moveTo( player.worldPos.x, player.worldPos.y );
	ctx.lineTo( player.worldPos.x+lkx, player.worldPos.y+lky);
	ctx.stroke();

	drawPlayer();

	ctx.strokeStyle = defaultColor;
	ctx.beginPath();
	ctx.rect(0,0,grid_width-1,grid_height-1);
	ctx.stroke();

}

function raytrace() {

	let ldir = new vec2( lengthdir_x( 1, player.direction ), lengthdir_y( 1, player.direction ) );

	for (let i=0; i<resw; i++) {

		let ldirx = lengthdir_x( min_canvas_side*1.5, player.direction + lerp( Math.floor(fov/2), Math.ceil(-fov/2), i/(resw-1) ) );
		let ldiry = lengthdir_y( min_canvas_side*1.5, player.direction + lerp( Math.floor(fov/2), Math.ceil(-fov/2), i/(resw-1) ) );

		let ray = [
			new vec2( player.worldPos.x, player.worldPos.y ),
			new vec2( player.worldPos.x + ldirx, player.worldPos.y + ldiry ),
		]

		let intersections = [];

		for ( let wall of walls ) {

			let left = [
				new vec2( wall.gridPos.x*cell_width, (wall.gridPos.y+1)*cell_height ),
				new vec2( wall.gridPos.x*cell_width, wall.gridPos.y*cell_height ),
			];

			let top = [
				new vec2( (wall.gridPos.x+1)*cell_width, wall.gridPos.y*cell_height ),
				new vec2( wall.gridPos.x*cell_width, wall.gridPos.y*cell_height ),
			];

			let right = [
				new vec2( (wall.gridPos.x+1)*cell_width, (wall.gridPos.y+1)*cell_height ),
				new vec2( (wall.gridPos.x+1)*cell_width, wall.gridPos.y*cell_height ),
			];

			let bottom = [
				new vec2( (wall.gridPos.x+1)*cell_width, (wall.gridPos.y+1)*cell_height ),
				new vec2( ( wall.gridPos.x )*cell_width, (wall.gridPos.y+1)*cell_height ),
			];

			let edges = [ left, top, right, bottom ];

			for ( let edge of edges ) {

				if (TLSI(ray[0], ray[1], edge[0], edge[1])) {

					let intersection = whereTLSI( ray[0], ray[1], edge[0], edge[1] );

					//se esta merda está na frente do jogador
					let intDir = intersection.sub(player.worldPos);
					if ( intDir.dot(ldir) > 0 ) {

						let fullWall = edge[0].sub(edge[1]);
						let pointInWall = edge[0].sub(intersection);

						let textureCol = (pointInWall.norm())/(fullWall.norm())

						intersections.push( [intersection,textureCol] );

					}

				}

			}

		}

		let closest = intersections;
		let textureCol = 0;

		let minDist = Infinity;

		for ( let intersection of intersections ) {

			let dist = player.worldPos.sub(intersection[0]).sqrNorm();
			if ( dist < minDist ) {

				closest = intersection[0];
				textureCol = intersection[1];
				minDist = dist;

			}
			
		}

		hits[i] = [ Math.sqrt(minDist)/(min_canvas_side*resh/30), textureCol ];

	}

}

function drawFake3d(){

	fake3dctx.clearRect(0, 0, resw, resh);

	let mres = Math.min(resw,resh);

	fake3dctx.drawImage(backSkyNight, 0, 0, backSkyNight.width, backSkyNight.height, lerp( -mres*4, 0, player.direction/360), 0, mres*4 + 1, mres);
	fake3dctx.drawImage(backSkyNight, 0, 0, backSkyNight.width, backSkyNight.height, lerp( 0, mres*4, player.direction/360), 0, mres*4 + 1, mres);

	fake3dctx.fillStyle = grassColor;
	fake3dctx.beginPath();
	fake3dctx.rect(0, resh/2-player.z, resw, resh/2+player.z);
	fake3dctx.fill();

	raytrace();

	//ray draw
	for (let i=0; i<resw; i++) {

		drawColumn(i, 1/hits[i][0], hits[i][1]);

	}

	drawHUD();

	fake3dctx.strokeStyle = defaultColor;
	fake3dctx.beginPath();
	fake3dctx.rect(0, 0, resw, resh);
	fake3dctx.stroke();

}

function drawColumn(x, size, column) {

	let place = lerp(0,0.9,Math.round(image.width*column*10)/10);

	fake3dctx.imageSmoothingEnabled = false;

	//fake3dctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
	fake3dctx.drawImage(image, place, 0, 1, image.height, x, resh/2-size/2-player.z, 1.75, size);
}

function loop() {

	update();
	if (showMinimap)
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

function TLSI ( vecA, vecB, vecC, vecD ) {

	return ( !sameSideOfLine( vecA, vecB, vecC, vecD ) && !sameSideOfLine( vecC, vecD, vecA, vecB ) );

}

function whereTLSI ( rayA, rayB, edgeA, edgeB ) {

	if ( rayA.x > rayB.x )
	{

		let temp = rayA.x;
		rayA.x = rayB.x;
		rayB.x = temp;

		temp = rayA.y;
		rayA.y = rayB.y;
		rayB.y = temp;

	}

	let y, a, x, b;

	//se o raio é uma assíntota vertical
	if ( rayA.x == rayB.x ) {

		//lado vertical
		if ( edgeA.x == edgeB.x ) {

			return new vec2( Infinity, Infinity );

		//lado horizontal
		} else {
			
			return new vec2( rayA.x, edgeA.y );

		}

	} else {

		// primeira função y1 = a1*x + b1
		a = (rayB.y - rayA.y) / ( rayB.x - rayA.x );
		b = rayB.y - a * rayB.x;

		//lado vertical
		if ( edgeA.x == edgeB.x ) {

			x = edgeA.x;
			y = a*x + b;

			return new vec2( x, y );

		//lado horizontal
		} else {

			y = edgeA.y;

			x = (y - b) / a;
			
			return new vec2( x, y );

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