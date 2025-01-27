import type { StateFlappyBird } from '@/interface';

// Game settings
const gravity = 0.5;
const jump = -10;

// Pipe settings
const pipes: { x: number; y: number }[] = [];
const pipeWidth = 50;
const pipeGap = 200;
let pipeTimer = 0;

// Bird properties
const birdX = 50,
  birdSize = 20;

const birdImage = new Image();
birdImage.src = '/src/assets/img/flappy-bird-background.jpg'; // Provide the bird image path

const state: StateFlappyBird = {
  animationId: null,
  birdY: 200,
  birdVelocity: 0,
  score: 0,
  start: false,
};

function restartState() {
  state.birdY = 200;
  state.birdVelocity = 0;
  state.score = 0;
  state.start = false;
  pipes.length = 0;
}

export function initializeGame() {
  const button = document.getElementById('restart-game');

  if (!button) {
    return;
  }

  button.addEventListener('click', (e) => {
    restartState();
    state.animationId = requestAnimationFrame(gameLoop);
    if (e.target instanceof HTMLElement) {
      e.target.blur();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
      state.birdVelocity = jump;
    }
  });
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

  ctx.drawImage(
    birdImage,
    0,
    canvas.height - canvas.height / 3.5,
    canvas.width,
    canvas.height / 3.5,
  );
  // speed of the bird
  state.birdVelocity += gravity;
  state.birdY += state.birdVelocity;

  // Draw the bird
  ctx.fillStyle = 'yellow';
  ctx.fillRect(birdX, state.birdY, birdSize, birdSize);

  // pipeTimer is used to add a new pipe every 100 frames
  if (pipeTimer++ % 100 === 0) {
    const pipeY = Math.random() * (canvas.height - pipeGap);
    pipes.push({ x: canvas.width, y: pipeY });
  }

  // Draw score
  ctx.fillStyle = 'black';
  ctx.font = '30px Arial';
  ctx.fillText(state.score.toString(), canvas.width / 2, canvas.height / 4);

  for (let i = pipes.length - 1; i >= 0; i--) {
    // pipes move to the left
    // bird doesn't move
    pipes[i].x -= 2;
    ctx.fillStyle = 'green';
    ctx.fillRect(pipes[i].x, 0, pipeWidth, pipes[i].y); // Top pipe
    ctx.fillRect(pipes[i].x, pipes[i].y + pipeGap, pipeWidth, canvas.height); // Bottom pipe

    // Collision detection
    if (
      (birdX < pipes[i].x + pipeWidth &&
        birdX + birdSize > pipes[i].x &&
        (state.birdY < pipes[i].y ||
          state.birdY + birdSize > pipes[i].y + pipeGap)) ||
      state.birdY > canvas.height ||
      state.birdY < 0
    ) {
      cancelAnimationFrame(state.animationId!);
      state.animationId = null;
      return;
    }

    // Remove off-screen pipes and update score
    if (pipes[i].x + pipeWidth <= 0) {
      pipes.splice(i, 1);
      state.score++;
    }
  }

  requestAnimationFrame(gameLoop);
}
