export type ConfettiMode = 'boom' | 'shower';

export type ConfettiBoomProps = {
  mode?: 'boom';
  shapeSize?: number;
  effectCount?: number;
  colors?: string[];
  className?: string;
  style?: React.CSSProperties;
  shapes?: ParticleShape[];
  onComplete?: () => void;
};

export type ConfettiShowerProps = {
  mode: 'shower';
  shapeSize?: number;
  colors?: string[];
  className?: string;
  style?: React.CSSProperties;
  shapes?: ParticleShape[];
  duration?: number;
  onComplete?: () => void;
};

export type ConfettiProps = ConfettiBoomProps | ConfettiShowerProps;

export type Particle = {
  update: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
  opacity: number;
  y: number;
};

export type ParticleShape = 'circle' | 'square' | 'star' | 'spiral';
