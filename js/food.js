class Food {
    constructor(ctx) {
        this.ctx = ctx
        // Set the food to a random position on the grid
        this.x = Math.floor(Math.random() * this.ctx.canvas.width / 10) * 10
        this.y = Math.floor(Math.random() * this.ctx.canvas.height / 10) * 10

        this.draw()
    }

    draw() {
        this.ctx.fillStyle = "#FFF"
        this.ctx.fillRect(this.x, this.y, 10, 10)
    }
}