const speed = 0.1

class Blob {
	constructor (pos, momentum, radius, attractor) {
		this.pos = pos
		this.momentum = momentum
		this.radius = radius
		this.attractor = attractor
	}



	tryColliding (other) {
		let distance = this.pos.distanceTo(other.pos)
		if(distance < this.radius + other.radius){

			this.move(-speed)

			console.log(this.momentum, other.momentum)

			let thismomentum = this.momentum

			thismomentum.x = (this.momentum.x - 1) * this.momentum.sum(other.momentum, -1).dotProduct(this.pos.sum(other.pos, -1)) * (this.pos.sum(other.pos, -1)) / Math.pow(this.pos.sum(other.pos, -1).length, 2)
			thismomentum.y = (this.momentum.y - 1) * this.momentum.sum(other.momentum, -1).dotProduct(this.pos.sum(other.pos, -1)) * (this.pos.sum(other.pos, -1)) / Math.pow(this.pos.sum(other.pos, -1).length, 2)
			other.momentum.x = (other.momentum.x - 1) * other.momentum.sum(this.momentum, -1).dotProduct(other.pos.sum(this.pos, -1)) * (other.pos.sum(this.pos, -1)) / Math.pow(other.pos.sum(this.pos, -1).length, 2)
			other.momentum.y = (other.momentum.y - 1) * other.momentum.sum(this.momentum, -1).dotProduct(other.pos.sum(this.pos, -1)) * (other.pos.sum(this.pos, -1)) / Math.pow(other.pos.sum(this.pos, -1).length, 2)

			this.momentum = thismomentum
		}
	}

	move (multiplier = speed) {
		this.pos = this.pos.sum(this.momentum, multiplier)
	}
}

class Vector {
	constructor (x, y) {
		this.x = x
		this.y = y
	}

	length () {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
	}

	sum (other, multiplier = 1) {
		//console.log(other, multiplier)
		//always null?
		//console.log(this.x, other.x, this.y, other.y, multiplier)
		return new Vector(this.x + other.x * multiplier, this.y + other.y * multiplier)
	}

	distanceTo (point) {
		return Math.sqrt(Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2))
	}

	toAngle () {
		return Math.tan(this.y / this.x)
	}

	dotProduct (other) {
		//console.log(this.toAngle(),  other.toAngle())
		return this.length * other.length * Math.cos(this.toAngle() - other.toAngle())
	}
}

