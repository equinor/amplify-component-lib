export type ConfettiMode = 'boom' | 'shower';

type ConfettiCommonProps = {
  shapeSize?: number;
  colors?: string[];
  className?: string;
  style?: React.CSSProperties;
  shapes?: ParticleShape[];
  onComplete?: () => void;
};

export type ConfettiBoomProps = {
  mode?: 'boom';
  effectCount?: number;
} & ConfettiCommonProps;

export type ConfettiShowerProps = {
  mode: 'shower';
  duration?: number;
} & ConfettiCommonProps;

export type ConfettiProps = ConfettiBoomProps | ConfettiShowerProps;

export type Particle = {
  update: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
  opacity: number;
  y: number;
};

export type ParticleShape = 'circle' | 'square' | 'star' | 'spiral';
