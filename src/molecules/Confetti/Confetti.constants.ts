import { ParticleShape } from './Confetti.types';
import { colors } from 'src/atoms/style';

export const CONFETTI_DEFAULT_COLORS = [
  colors.dataviz.lightpurple.darker,
  colors.dataviz.lightblue.darker,
  colors.dataviz.lightgreen.default,
  colors.interactive.warning__resting.rgba,
  colors.interactive.danger__resting.rgba,
  colors.interactive.success__resting.rgba,
];

export const CONFETTI_DEFAULT_SHAPES: ParticleShape[] = [
  'star',
  'circle',
  'square',
  'spiral',
];

export const STAR_POINTS = 5;
export const DEG_TO_RAD = Math.PI / 180;
export const FRICTION = 0.9;
export const GRAVITY = 0.5;

export const IMPERATIVE_STYLING: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  pointerEvents: 'none',
};
