import { Particle, ParticleShape } from '../Confetti.types';
import { createParticle } from './createParticle';
import { randomNumBetween } from './utils';

/**
 * Creates a batch of confetti particles.
 *
 * "shower" mode:
 * - continuous stream
 *
 * "boom" mode:
 * - burst from center
 * - higher initial velocity
 */
export function createConfetti({
  particles,
  mode,
  colors,
  shapeSize,
  shapes,
}: {
  particles: Particle[];
  mode: 'boom' | 'shower';
  colors: string[];
  shapeSize: number;
  shapes: ParticleShape[];
}) {
  const isShower = mode === 'shower';

  const count = isShower ? 1 : 30;

  const x = isShower ? randomNumBetween(0, 1) : 0.5;
  const y = isShower ? randomNumBetween(-0.3, -0.1) : 0.5;

  // Opacity decrease rate (adjusted for shower mode and viewport height)
  const opacityDelta = isShower ? 3.4 / 0.8 / window.innerHeight : 0.004;

  for (let i = 0; i < count; i += 1) {
    particles.push(
      createParticle(
        x,
        y,
        270,
        colors,
        shapes,
        shapeSize,
        isShower ? 0 : 60,
        isShower ? 0 : 1,
        opacityDelta
      )
    );
  }
}
