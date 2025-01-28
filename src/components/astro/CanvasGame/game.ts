import type { StateFlappyBird } from '@/interface';

export class FlappyGame {
  background: HTMLImageElement;
  bird: HTMLImageElement;
  pipes: { x: number; y: number; random: number }[] = [];
  pipeTimer = 0;

  readonly gravity = 0.5;
  readonly jump = -9;
  readonly pipeWidth = 50;
  readonly pipeGap = 150;

  readonly birdX = 50;
  readonly birdSizeX = 40;
  readonly birdSizeY = 28;

  state: StateFlappyBird = {
    animationId: null,
    birdY: 300,
    birdVelocity: 0,
    score: 0,
    start: false,
    restart: false,
  };

  constructor() {
    this.background = new Image();
    this.background.src = '/src/assets/img/flappy-bird-background.jpg'; // Provide the bird image path
    this.background.onload = this.onLoadBackground.bind(this);

    this.bird = new Image();
    this.bird.src = '/src/assets/img/bird.png'; // Provide the bird image path
    this.bird.onload = this.onLoadBird.bind(this);
  }

  private onLoadBackground() {
    const { ctx, canvas } = this.getContext();

    ctx.drawImage(
      this.background,
      0,
      canvas.height - canvas.height / 3,
      canvas.width,
      canvas.height / 4.5,
    );
  }

  private onLoadBird() {
    const { ctx } = this.getContext();

    ctx.drawImage(
      this.bird,
      this.birdX,
      this.state.birdY,
      this.birdSizeX,
      this.birdSizeY,
    );
  }

  private restartState() {
    this.state.birdY = 200;
    this.state.birdVelocity = 0;
    this.state.score = 0;
    this.state.start = false;
    this.pipes.length = 0;
  }

  private getContext() {
    const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;

    if (!canvas) {
      throw new Error('Canvas not found');
    }
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Context not found');
    }

    return { ctx, canvas };
  }

  private gameLoop() {
    const { ctx, canvas } = this.getContext();

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const backgroundHeight = canvas.height / 4.5;
    console.log();
    ctx.drawImage(
      this.background,
      0,
      canvas.height - canvas.height / 3,
      canvas.width,
      backgroundHeight,
    );

    // speed of the bird
    this.state.birdVelocity += this.gravity;
    this.state.birdY += this.state.birdVelocity;

    // Draw the bird
    ctx.drawImage(
      this.bird,
      this.birdX,
      this.state.birdY,
      this.birdSizeX,
      this.birdSizeY,
    );

    // Draw ground
    const ground = canvas.height / 8.5;

    ctx.fillStyle = '#DED895';
    ctx.fillRect(0, canvas.height - ground, canvas.width, ground);

    const sky = canvas.height - ground;

    // pipeTimer is used to add a new pipe every 100 frames
    if (this.pipeTimer++ % 100 === 0) {
      const random = Math.random();
      const pipeY = random * (sky - this.pipeGap);
      this.pipes.push({ x: canvas.width + 1, y: pipeY, random });
      console.log(this.pipes);
    }

    for (let i = this.pipes.length - 1; i >= 0; i--) {
      // this.pipes move to the left
      // bird doesn't move
      this.pipes[i].x -= 2;

      // Top pipe
      const reduceTop = this.pipes[i].random < 0.5 ? 0 : 1;
      ctx.fillStyle = 'green';
      ctx.fillRect(
        this.pipes[i].x,
        0,
        this.pipeWidth,
        this.pipes[i].y - this.pipeGap * reduceTop,
      );

      // Bottom pipe
      const reduceBottom = this.pipes[i].random > 0.5 ? 0 : 1;
      ctx.fillStyle = 'green';
      ctx.fillRect(
        this.pipes[i].x,
        this.pipes[i].y + this.pipeGap * reduceBottom,
        this.pipeWidth,
        sky - this.pipes[i].y - this.pipeGap * reduceBottom,
      );

      // Collision detection
      if (
        (this.birdX < this.pipes[i].x + this.pipeWidth &&
          this.birdX + this.birdSizeX > this.pipes[i].x &&
          (this.state.birdY < this.pipes[i].y - this.pipeGap * reduceTop ||
            this.state.birdY + this.birdSizeY >
              this.pipes[i].y + this.pipeGap * reduceBottom)) ||
        // bird is within the frame
        this.state.birdY > sky ||
        this.state.birdY <= 0
      ) {
        cancelAnimationFrame(this.state.animationId!);
        this.state.animationId = null;
        this.state.restart = true;
        this.state.start = false;
      }

      // Remove off-screen pipes and update score
      if (this.pipes[i].x + this.pipeWidth <= 0) {
        this.pipes.splice(i, 1);
        this.state.score++;
      }
    }

    // Draw score
    ctx.fillStyle = 'white';
    ctx.font = '40px Arial';
    ctx.fillText(
      this.state.score.toString(),
      canvas.width / 2,
      canvas.height / 4,
    );

    if (this.state.start) {
      this.state.animationId = requestAnimationFrame(this.gameLoop.bind(this));
    }
  }

  private actionBird() {
    if (this.state.restart) {
      this.restartState();
      this.gameLoop();
    }
    this.state.birdVelocity = this.jump;
    if (!this.state.start) {
      this.state.start = true;
      this.state.restart = false;
      this.gameLoop();
    }
  }

  initializeGame() {
    document.addEventListener('touchstart', () => {
      this.actionBird();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === ' ') {
        this.actionBird();
      }
    });

    this.gameLoop();
  }
}
