var title = document.getElementById("title")
var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
const width = window.innerWidth
const height = window.innerHeight
canvas.width = width
canvas.height = height
let blobs = []

let blackhole = new Vector(width / 2, height / 2)

function addBlob (x = Math.random() * width, y = Math.random() * height, color, r = 4, id = blobs.length + 1) {
    blobs.push(new Blob(new Vector(x, y), new Vector(Math.random() * 10 - 5, Math.random() * 10 - 5), r, blackhole, id, color))
}

for (let i=0; i < 30; i++) addBlob()

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
        ctx.arc(blob.pos.x, blob.pos.y, blob.radius, 0, 2 * Math.PI)
        ctx.fill()
    })

    document.getElementById("title").innerText = Math.round(performance.now() - lastTime) + " ms since collision"
    window.requestAnimationFrame(tick)
}

window.requestAnimationFrame(tick)