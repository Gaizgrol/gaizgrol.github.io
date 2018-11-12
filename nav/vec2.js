export class vec2 {
	
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