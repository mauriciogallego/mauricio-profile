// Game settings
const gravity = 0.5;
const jump = -10;
let birdY = 200,
  birdVelocity = 0,
  score = 0;

// Pipe settings
const pipes: { x: number; y: number }[] = [];
const pipeWidth = 50;
const pipeGap = 200;
let pipeTimer = 0;

// Bird properties
const birdX = 50,
  birdSize = 20;

const state: { animationId: number | null } = {
  animationId: null,
};

export function initializeGame() {
  state.animationId = requestAnimationFrame(gameLoop);
}

// Main game loop
function gameLoop() {
  const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;

  if (!canvas) {
    return;
  }
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  birdVelocity += gravity;
  //birdY += birdVelocity;
  ctx.fillStyle = 'yellow';
  ctx.fillRect(birdX, birdY, birdSize, birdSize);

  console.log(pipes);

  if (pipeTimer++ % 100 === 0) {
    const pipeY = Math.random() * (canvas.height - pipeGap);
    console.log({ pipeY });
    pipes.push({ x: canvas.width, y: pipeY });
  }

  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].x -= 2;
    ctx.fillStyle = 'green';
    ctx.fillRect(pipes[i].x, 0, pipeWidth, pipes[i].y); // Top pipe
    ctx.fillRect(pipes[i].x, pipes[i].y + pipeGap, pipeWidth, canvas.height); // Bottom pipe

    // Collision detection
    if (
      (birdX < pipes[i].x + pipeWidth &&
        birdX + birdSize > pipes[i].x &&
        (birdY < pipes[i].y || birdY + birdSize > pipes[i].y + pipeGap)) ||
      birdY > canvas.height ||
      birdY < 0
    ) {
      return cancelAnimationFrame(state.animationId!);
    }
  }

  requestAnimationFrame(gameLoop);
}
