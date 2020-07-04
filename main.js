var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
const width = canvas.width
const height = canvas.height
let blobs = []

let blackhole = new Vector(50, 50)

blobs.push(new Blob(new Vector(80, 57), new Vector(Math.random() * -10, Math.random() * 0.1), 3, blackhole))
blobs.push(new Blob(new Vector(40, 50), new Vector(Math.random() * 10, Math.random() * 0.1), 5, blackhole))

function tick() {

    ctx.clearRect(0, 0, width, height)

    blobs.forEach(blob => {
        blob.move(speed)
        blobs.forEach(other => {
            if (other != blob) {
                blob.setColliding(other)
            }
        })
    })

    blobs.forEach(blob => {
        blob.tryColliding()
        ctx.beginPath()
        ctx.arc(width / 100 * blob.pos.x, height / 100 * blob.pos.y, width / 100 * blob.radius, 0, 2 * Math.PI)
        ctx.fill()
    })

    window.requestAnimationFrame(tick)
}

window.requestAnimationFrame(tick)