export type ConfettiMode = 'boom' | 'shower';

export type ConfettiBoomProps = {
  mode?: 'boom';
  shapeSize?: number;
  effectInterval?: number;
  effectCount?: number;
  colors?: string[];
  className?: string;
  style?: React.CSSProperties;
  shapes?: ParticleShape[];
};

export type ConfettiShowerProps = {
  mode: 'shower';
  shapeSize?: number;
  colors?: string[];
  className?: string;
  style?: React.CSSProperties;
  shapes?: ParticleShape[];
  duration?: number;
};

export type ConfettiProps = ConfettiBoomProps | ConfettiShowerProps;

export type Particle = {
  update: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
  opacity: number;
  y: number;
};

export type ParticleShape = 'circle' | 'square' | 'star' | 'spiral';
