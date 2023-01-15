class Snake {
    constructor(ctx) {
        this.ctx = ctx
        this.body = []
        this.x = 250
        this.y = 250
        this.dir = { x: 1, y: 0 }
        this.speed = 1

        this.body.push({ x: 0, y: 0 })

        this.draw()
    }

    eat() {
        this.body.push({ x: this.x, y: this.y })
    }

    update() {
        if (isRunning) {
            this.x += this.dir.x * this.speed * 10
            this.y += this.dir.y * this.speed * 10

            this.body.forEach((part, i) => {
                if (this.x == this.body[i].x && this.y == this.body[i].y) {
                    stopGame()
                }

                if (i == this.body.length - 1) {
                    part.x = this.x
                    part.y = this.y
                } else {
                    part.x = this.body[i + 1].x
                    part.y = this.body[i + 1].y
                }
            })

            if (this.x < 0 || this.x > this.ctx.canvas.width - 10 || this.y < 0 || this.y > this.ctx.canvas.height - 10) {
                stopGame()
            }

            this.x = Math.min(Math.max(this.x, 0), this.ctx.canvas.width - 10)
            this.y = Math.min(Math.max(this.y, 0), this.ctx.canvas.height - 10)
        }
    }

    move(x, y) {
        if (this.dir.x == -x || this.dir.y == -y) return
        this.dir.x = x
        this.dir.y = y
    }

    draw() {
        this.ctx.fillStyle = "#34FD00"

        this.body.forEach((part, i) => {
            this.ctx.fillRect(part.x, part.y, 10, 10)
        })
    }
}