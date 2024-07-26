const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 设置游戏区域的尺寸和格子大小
const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

// 蛇的初始状态
let snake = [];
snake[0] = { x: Math.floor(columns / 2) * scale, y: Math.floor(rows / 2) * scale };

// 蛇的移动方向
let d;
let food = { x: Math.floor(Math.random() * columns) * scale, y: Math.floor(Math.random() * rows) * scale };

// 游戏控制函数
document.addEventListener('keydown', direction);

// 游戏主循环
function game() {
    if (d) {
        moveSnake();
        if (checkCollision()) {
            alert('游戏结束!');
            document.location.reload();
        }
        if (eatFood()) {
            food = { x: Math.floor(Math.random() * columns) * scale, y: Math.floor(Math.random() * rows) * scale };
        } else {
            snake.pop();
        }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    drawSnake();
}

function direction(event) {
    if (event.keyCode === 37 && d !== 'RIGHT') d = 'LEFT';
    if (event.keyCode === 38 && d !== 'DOWN') d = 'UP';
    if (event.keyCode === 39 && d !== 'LEFT') d = 'RIGHT';
    if (event.keyCode === 40 && d !== 'UP') d = 'DOWN';
}

function moveSnake() {
    let headX = snake[0].x;
    let headY = snake[0].y;

    if (d === 'LEFT') headX -= scale;
    if (d === 'UP') headY -= scale;
    if (d === 'RIGHT') headX += scale;
    if (d === 'DOWN') headY += scale;

    snake.unshift({ x: headX, y: headY });
}

function drawSnake() {
    ctx.fillStyle = '#00FF00';
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
    }
}

function drawFood() {
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(food.x, food.y, scale, scale);
}

function checkCollision() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height) {
        return true;
    }
    return false;
}

function eatFood() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
        return true;
    }
    return false;
}

// 设定游戏的循环频率
setInterval(game, 100);
