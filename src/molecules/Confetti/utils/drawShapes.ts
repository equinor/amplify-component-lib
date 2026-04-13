import { DEG_TO_RAD, STAR_POINTS } from '../Confetti.constants';
import { ParticleShape } from '../Confetti.types';

type DrawShapeArgs = {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;
  widthDelta: number;
  heightDelta: number;
};

const drawSquare = ({
  ctx,
  x,
  y,
  width,
  height,
  widthDelta,
  heightDelta,
}: DrawShapeArgs) => {
  ctx.fillRect(
    x,
    y,
    width * Math.cos(widthDelta * DEG_TO_RAD),
    height * Math.sin(heightDelta * DEG_TO_RAD)
  );
};

const drawCircle = ({
  ctx,
  x,
  y,
  width,
  height,
  widthDelta,
  heightDelta,
}: DrawShapeArgs) => {
  ctx.beginPath();
  ctx.ellipse(
    x,
    y,
    Math.abs(width * Math.cos(widthDelta * DEG_TO_RAD)) / 2,
    Math.abs(height * Math.sin(heightDelta * DEG_TO_RAD)) / 2,
    0,
    0,
    Math.PI * 2
  );
  ctx.fill();
};

const drawStar = ({ ctx, x, y, width, widthDelta }: DrawShapeArgs) => {
  const outerRadius = width / 1.25;
  const innerRadius = outerRadius / 2;
  const step = Math.PI / STAR_POINTS;
  const rotation = widthDelta * DEG_TO_RAD;

  ctx.beginPath();
  for (let i = 0; i < STAR_POINTS * 2; i++) {
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = i * step + rotation;
    const rX = x + r * Math.sin(angle);
    const rY = y + r * Math.cos(angle);
    if (i === 0) ctx.moveTo(rX, rY);
    else ctx.lineTo(rX, rY);
  }
  ctx.fill();
};

const drawSpiral = ({ ctx, x, y, width, widthDelta }: DrawShapeArgs) => {
  const TURNS = 2;
  const STEP = 0.1;
  const MAX_ANGLE = TURNS * Math.PI * 2;
  const rotation = widthDelta * DEG_TO_RAD * 4;

  ctx.beginPath();
  ctx.lineWidth = 1.5;
  // Note: lineWidth is not reset here because the caller wraps drawing in ctx.save()/ctx.restore(),
  // so this state change is scoped to the particle's draw call.

  for (let angle = 0; angle <= MAX_ANGLE; angle += STEP) {
    const radius = angle * (width / MAX_ANGLE) * 0.75;
    const rX = x + radius * Math.cos(angle + rotation);
    const rY = y + radius * Math.sin(angle + rotation);
    if (angle === 0) ctx.moveTo(rX, rY);
    else ctx.lineTo(rX, rY);
  }
  ctx.stroke();
};

export const drawShapes: Record<ParticleShape, (args: DrawShapeArgs) => void> =
  {
    square: drawSquare,
    circle: drawCircle,
    star: drawStar,
    spiral: drawSpiral,
  };
