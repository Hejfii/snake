let gameArea = document.getElementById("snakeArea")
let gameAreaContext = gameArea.getContext("2d")
let snake = new Snake(gameAreaContext)
let food = new Food(gameAreaContext)
let isRunning = true

function loop() {
    gameAreaContext.clearRect(0, 0, gameArea.width, gameArea.height)
    snake.update()
    snake.draw()
    food.draw()

    if (snake.x == food.x && snake.y == food.y) {
        food = new Food(gameAreaContext)
        snake.eat()
        document.getElementById("mid-score").innerText = snake.body.length
    }

    setTimeout(() => {
        requestAnimationFrame(loop)
    }, 100);
}

function startGame() {
    document.getElementById("mid-game-score").style.visibility = "visible"
    document.getElementById("end-menu").style.visibility = "hidden"
    isRunning = true
    snake = new Snake(gameAreaContext)
}

function stopGame() {
    isRunning = false
    localStorage.setItem("highscore", Math.max(localStorage.getItem("highscore"), snake.body.length))

    document.getElementById("mid-game-score").style.visibility = "hidden"
    document.getElementById("score").innerText = snake.body.length
    document.getElementById("highscore").innerText = localStorage.getItem("highscore")
    document.getElementById("end-menu").style.visibility = "visible"
}

document.getElementById("restart").addEventListener("click", () => {
    startGame()
})

document.addEventListener("keydown", (e) => {
    let code = e.code

    switch (code) {
        case "KeyW":
            snake.move(0, -1)
            break;

        case "KeyA":
            snake.move(-1, 0)
            break;

        case "KeyS":
            snake.move(0, 1)
            break;

        case "KeyD":
            snake.move(1, 0)
            break;

        case "ArrowUp":
            snake.move(0, -1)
            break;

        case "ArrowLeft":
            snake.move(-1, 0)
            break;

        case "ArrowDown":
            snake.move(0, 1)
            break;

        case "ArrowRight":
            snake.move(1, 0)
            break;

        default:
            break;
    }
})

let oldX
let oldY

document.addEventListener("touchmove", (e) => {
    let curX = e.touches[0].clientX
    let curY = e.touches[0].clientY

    if (curX && curX > oldX) {
        snake.move(1, 0)
    } else if (curX && curX < oldX) {
        snake.move(-1, 0)
    } else if (curY && curY > oldY) {
        snake.move(0, 1)
    } else if (curY && curY < oldY) {
        snake.move(0, -1)
    }

    e.preventDefault()

    oldX = curX
    oldY = curY
}, { passive: false })

requestAnimationFrame(loop)