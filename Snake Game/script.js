const board = document.querySelector('.board');
const blockheight = 50;
const blockwidth = 50;
const blocks = [];
let snake = [{ x: 1, y: 3 }];
let direction = 'right';
let intervalId = null;
let timerInterval = null;

/* UI ELEMENTS */
const highScoreElement = document.querySelector('#high-score');
const scoreElement = document.querySelector('#score');
const timeElement = document.querySelector('#time');

const StartGameModal = document.querySelector('.start-game');
const gameOverModal = document.querySelector('.game-over');
const restartButton = document.querySelector('.btn-restart');
const startButton = document.querySelector('.btn-start');
const modal = document.querySelector('.modal');

/* GRID */
const cols = Math.floor(board.clientWidth / blockwidth);
const rows = Math.floor(board.clientHeight / blockheight);

/* GAME STATE */
let highScore = Number(localStorage.getItem('highScore')) || 0;
let score = 0;
let seconds = 0;

highScoreElement.innerText = highScore;
scoreElement.innerText = score;
timeElement.innerText = '00:00';

/* FOOD */
let food = {
    x: Math.floor(Math.random() * cols),
    y: Math.floor(Math.random() * rows)
};

/* CREATE GRID */
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement('div');
        block.classList.add('block');
        board.appendChild(block);
        blocks[`${row}-${col}`] = block;
    }
}

/* START GAME */
startButton.addEventListener('click', () => {
    modal.style.display = 'none';
    StartGameModal.style.display = 'none';
    gameOverModal.style.display = 'none';

    clearInterval(intervalId);
    clearInterval(timerInterval);

    intervalId = setInterval(gameLoop, 300);
    timerInterval = setInterval(updateTime, 1000);

    render();
});

/* GAME LOOP */
function gameLoop() {
    document.querySelectorAll('.fill, .food')
        .forEach(b => b.classList.remove('fill', 'food'));

    const head = { ...snake[0] };

    if (direction === 'left') head.x--;
    else if (direction === 'right') head.x++;
    else if (direction === 'up') head.y--;
    else if (direction === 'down') head.y++;

    /* BOUNDARY */
    if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
        endGame();
        return;
    }

    /* FOOD */
    if (head.x === food.x && head.y === food.y) {
        snake.unshift(head);

        food = {
            x: Math.floor(Math.random() * cols),
            y: Math.floor(Math.random() * rows)
        };

        score += 10;
        scoreElement.innerText = score;

        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore);
            highScoreElement.innerText = highScore;
        }
    } else {
        snake.unshift(head);
        snake.pop();
    }

    render();
}

/* RENDER */
function render() {
    snake.forEach(s => {
        blocks[`${s.y}-${s.x}`].classList.add('fill');
    });
    blocks[`${food.y}-${food.x}`].classList.add('food');
}

/* TIME UPDATE */
function updateTime() {
    seconds++;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timeElement.innerText =
        `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/* END GAME */
function endGame() {
    clearInterval(intervalId);
    clearInterval(timerInterval);
    modal.style.display = 'flex';
    StartGameModal.style.display = 'none';
    gameOverModal.style.display = 'flex';
}

/* RESTART */
restartButton.addEventListener('click', restartGame);

function restartGame() {
    clearInterval(intervalId);
    clearInterval(timerInterval);

    modal.style.display = 'none';
    StartGameModal.style.display = 'none';
    gameOverModal.style.display = 'none';

    snake = [{ x: 1, y: 3 }];
    direction = 'right';
    score = 0;
    seconds = 0;

    scoreElement.innerText = score;
    timeElement.innerText = '00:00';

    food = {
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows)
    };

    document.querySelectorAll('.fill, .food')
        .forEach(b => b.classList.remove('fill', 'food'));

    intervalId = setInterval(gameLoop, 300);
    timerInterval = setInterval(updateTime, 1000);
    render();
}

/* CONTROLS */
addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && direction !== 'down') direction = 'up';
    else if (event.key === 'ArrowDown' && direction !== 'up') direction = 'down';
    else if (event.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
    else if (event.key === 'ArrowRight' && direction !== 'left') direction = 'right';
});
