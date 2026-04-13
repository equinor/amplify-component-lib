import { DEG_TO_RAD, FRICTION, GRAVITY } from '../Confetti.constants';
import { Particle, ParticleShape } from '../Confetti.types';
import {
  hexToRgb,
  isHexColor,
  randomNumBetween,
  replaceOpacity,
} from '../utils/utils';
import { drawShapes } from './drawShapes';

export function createParticle(
  x: number,
  y: number,
  deg = 0,
  colors: string[],
  shapes: ParticleShape[] = ['circle', 'square', 'star', 'spiral'],
  shapeSize = 12,
  spread = 30,
  launchSpeed = 1,
  opacityDelta = 0.004
): Particle {
  // Initial position (normalized → viewport)
  let posX = x * window.innerWidth;
  let posY = y * window.innerHeight;

  const width = shapeSize;
  const height = shapeSize;

  // Initial velocity
  const theta = DEG_TO_RAD * randomNumBetween(deg - spread, deg + spread);
  const speed = randomNumBetween(20 * launchSpeed, 70 * launchSpeed);
  let vx = speed * Math.cos(theta);
  let vy = speed * Math.sin(theta);

  // Visual state
  let opacity = 1;
  let rotate = randomNumBetween(0, 360);
  const rotateDelta = randomNumBetween(-1, 1);

  let widthDelta = randomNumBetween(0, 360);
  let heightDelta = randomNumBetween(0, 360);

  // Horizontal swing
  const swingOffset = randomNumBetween(0, Math.PI * 2);
  const swingAmplitude = randomNumBetween(0.1, 0.2);

  // Appearance
  let color = colors[Math.floor(randomNumBetween(0, colors.length))];
  const shape = shapes[Math.floor(randomNumBetween(0, shapes.length))];

  if (isHexColor(color)) {
    const { r, g, b } = hexToRgb(color);
    color = `rgba(${r}, ${g}, ${b}, 1)`;
  }

  // Updates the particle's state.
  const update = () => {
    if (opacity <= 0) return;

    opacity -= opacityDelta;

    vx *= FRICTION;
    vy = vy * FRICTION + GRAVITY;

    vx += Math.sin(swingOffset) * swingAmplitude;

    posX += vx;
    posY += vy;

    widthDelta += 2;
    heightDelta += 2;
    rotate += rotateDelta;
  };

  // Renders the particle on the canvas context.
  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.save();

    const translateOffsetX = width * 1.3;
    const translateOffsetY = height * 1.3;

    ctx.translate(posX + translateOffsetX, posY + translateOffsetY);
    ctx.rotate(rotate * DEG_TO_RAD);
    ctx.translate(-(posX + translateOffsetX), -(posY + translateOffsetY));

    ctx.fillStyle = replaceOpacity(color, opacity);
    ctx.strokeStyle = replaceOpacity(color, opacity);

    drawShapes[shape]({
      ctx,
      x: posX,
      y: posY,
      width,
      height,
      widthDelta,
      heightDelta,
    });

    ctx.restore();
  };

  return {
    update,
    draw,
    get opacity() {
      return opacity;
    },
    get y() {
      return posY;
    },
  };
}
