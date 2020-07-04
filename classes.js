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
			this.colliding = other
			other.colliding = this
		}		
	}

	collisionResponse () {
		if(this.colliding !== null){
			let other = this.colliding
			console.log(other)
			
			this.move(-speed)

			let angle = Math.atan((this.pos.y - other.pos.y) /  (this.pos.x - other.pos.x)) + Math.PI / 2
			let thisRelativeAngle = angle - this.momentum.toAngle()
			this.momentum = this.momentum.withAngle(angle + Math.PI + thisRelativeAngle)

			this.colliding = null
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
		return new Vector(this.x + other.x * multiplier, this.y + other.y * multiplier)
	}

	distanceTo (point) {
		return Math.sqrt(Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2))
	}

	toAngle () {
		return Math.tan(this.y / this.x)
	}

	dotProduct (other) {
		console.log(this, other)
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

	withAngle (angle) {
		let l = this.length()
		let t = Math.tan(angle) // y / x
		let x = Math.sqrt(Math.pow(l, 2) / (1 + Math.pow(t, 2)))
		let y = t * x
		return new Vector(x, y)
	}

	withLength (length) {
		let l = this.length()
		let normalized = this.normalized()
		return new Vector(normalized.times(length))
	}

	normalized () {
		return this.times(1 / this.length())
	}
}

function normalize(angle){
	return (angle + Math.PI * 2) % Math.PI * 2
}
