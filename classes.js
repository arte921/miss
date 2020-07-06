const speed = 0.1

class Blob {
	constructor (pos, momentum, radius, attractor) {
		this.pos = pos
		this.momentum = momentum
		this.radius = radius
		this.attractor = attractor
		this.colliding = null
	}

	checkColliding (other) {
		let distance = this.pos.distanceTo(other.pos)
		if(distance < this.radius + other.radius && other.colliding == null && this.colliding == null){
			//this.colliding = other
			//other.colliding = this
			this.pos = new Vector(Math.random() * 100, Math.random() * 100)
			this.momentum = this.momentum.times(0.5)
			console.log("collided", Math.random())
		}		
	}

	collisionResponse () {
		if(this.colliding != null){
			let other = this.colliding
			
			this.moveAbs(-1 * (this.pos.distanceTo(other.pos) - this.radius - other.radius + 1))

			let angle = Math.atan((this.pos.y - other.pos.y) / (this.pos.x - other.pos.x)) + Math.PI / 2
			let thisRelativeAngle = angle - (this.momentum.toAngle() - Math.PI / 2)
			this.momentum = other.momentum.withAngle(angle + Math.PI + thisRelativeAngle).withLength(other.momentum.length())

			this.colliding = null
		}
	}

	applyGravity () {
		let diff = this.attractor.sum(this.pos, -1)
		let dist = diff.length()
		this.momentum = this.momentum.sum(diff.withLength(dist / 200))
	}

	move (multiplier = speed) {
		// console.log(this)
		this.pos = this.pos.sum(this.momentum, multiplier)
	}

	moveAbs (dist) {
		this.pos = this.pos.sum(this.momentum.normalized(), dist)
	}
}

class Vector {
	constructor (x, y) {
		this.x = x
		this.y = y
	}

	length () {
		return Math.sqrt(this.x ** 2 + this.y ** 2)
	}

	sum (other, multiplier = 1) {
		return new Vector(this.x + other.x * multiplier, this.y + other.y * multiplier)
	}

	distanceTo (point) {
		return Math.sqrt((point.x - this.x) ** 2 + (point.y - this.y) ** 2)
	}

	toAngle () {
		return Math.tan(this.y / this.x)
	}

	dotProduct (other) {
		// console.log(this, other)
		return this.length * other.length * Math.cos(this.toAngle() - other.toAngle())
	}

	unit () {
		let length = this.length ()
		return new Vector(this.x / length, this.y / length)
	}

	multiply (other) {
		return new Vector(this.x * other.x, this.y * other.y)
	}

	times (factor) {
		return new Vector(this.x * factor, this.y * factor)
	}

	rotate (angle) {
		let l = this.length()
		let currentAngle = this.toAngle()
		let newAngle = currentAngle + angle
		return this.withAngle (newAngle)
	}

	withAngle (rawangle) {
		// console.log(this, angle)
		let angle = normalizeAngle(rawangle)
		let l = this.length()
		let t = Math.tan(angle) // y / x
		let x = Math.sqrt(l ** 2 / (1 + t ** 2))
		let y = t * x
		return new Vector(-x, -y)
	}

	withLength (length) {
		let l = this.length()
		return this.normalized().times(length)
	}

	normalized () {
		return this.times(1 / this.length())
	}
}

function normalizeAngle(angle){
	return (angle + Math.PI * 2) % Math.PI * 2
}
