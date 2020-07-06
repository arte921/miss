var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
const width = canvas.width
const height = canvas.height
let blobs = []

let blackhole = new Vector(50, 50)

//blobs.push(new Blob(new Vector(80, 57), new Vector(Math.random() * -10, Math.random() * 0.1), 3, blackhole))


for (let i=0; i < 30; i++) blobs.push(new Blob(new Vector(Math.random() * 100, Math.random() * 100), new Vector(Math.random() * 10 - 5, Math.random() * 10 - 5), 0.3, blackhole, i))

blobs[0].color = "rgb(255, 0, 0)"
// blobs[0].radius = 1

function tick() {
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, width, height)
    blobs.forEach(blob => {
        blob.move(speed)
        // blob.moveAbs(1)
        blobs.forEach(other => {
            if (other != blob) {
                blob.checkColliding(other)
            }
        })
    })

    blobs.forEach(blob => {
        blob.collisionResponse()
        blob.applyGravity()
        ctx.fillStyle = blob.color
        ctx.beginPath()
        ctx.arc(width / 100 * blob.pos.x, height / 100 * blob.pos.y, width / 100 * blob.radius, 0, 2 * Math.PI)
        ctx.fill()
    })

    document.getElementById("time").innerText = `Time since last collision: ${Math.round(performance.now() - lastTime)} ms`
    window.requestAnimationFrame(tick)
}

window.requestAnimationFrame(tick)