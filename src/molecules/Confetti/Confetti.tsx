import React, { useCallback, useEffect, useRef } from 'react';

import { createConfetti } from './utils/createConfetti';
import { getSeasonalColors } from './utils/seasonalColors';
import {
  CONFETTI_DEFAULT_COLORS,
  CONFETTI_DEFAULT_SHAPES,
} from './Confetti.constants';
import { Canvas } from './Confetti.styles';
import { ConfettiProps, Particle } from './Confetti.types';

/**
 * @param mode 'boom' | 'shower' - Confetti effect mode.
 * @param shapeSize - Size of each confetti particle.
 * @param effectCount - Total number of effects in 'boom' mode, minimum 1.
 * @param colors - Array of colors for the confetti, defaults to seasonal colors or a preset array.
 * @param shapes - Array of shapes for the confetti, defaults to ['circle', 'square', 'star', 'spiral'].
 * @param className - Optional CSS class for the canvas.
 * @param style - Optional inline styles for the canvas.
 * @param duration - Duration of the confetti effect in 'shower' mode (ms).
 * @param onComplete - Callback fired when the confetti effect completes.
 */
export const Confetti = (props: ConfettiProps): React.ReactNode => {
  const {
    mode = 'boom', // 'boom' | 'shower'
    shapeSize = 12,
    className,
    style,
    onComplete,
  } = props;

  const colors =
    props.colors && props.colors.length
      ? props.colors
      : getSeasonalColors() || CONFETTI_DEFAULT_COLORS;
  const shapes =
    props.shapes && props.shapes.length
      ? props.shapes
      : CONFETTI_DEFAULT_SHAPES;

  // shower specific props
  const startTimeRef = useRef<number>(Date.now());
  const duration = props.mode === 'shower' ? (props.duration ?? Infinity) : 0;

  if (mode === 'shower' && (duration <= 0 || isNaN(duration))) {
    throw new Error('Duration must be a non-negative number');
  }

  // boom specific props
  const { effectCount = Infinity } =
    props.mode === 'boom' || props.mode === undefined
      ? props
      : { effectCount: Infinity };

  if (effectCount < 1) {
    throw new Error('Effect count must be at least 1');
  }

  const effectInterval =
    props.mode === 'boom' || props.mode === undefined ? 3000 : 1;

  // We use refs instead of state to avoid re-renders during animation.
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef<number>(0);
  const effectCountRef = useRef(0);

  const lastEffectTimeRef = useRef(0);

  // Initializes and resizes the canvas to match the viewport.
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    /* v8 ignore next */
    if (!canvas || !ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctxRef.current = ctx;
  }, []);

  const animate = useCallback(
    (time: number) => {
      const ctx = ctxRef.current;
      const canvas = canvasRef.current;
      if (!ctx || !canvas) return;

      frameRef.current = requestAnimationFrame(animate);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Stop emitting after duration
      const now = Date.now();
      const elapsed = now - startTimeRef.current;
      const shouldEmit = mode === 'shower' ? elapsed < duration : true;

      // Trigger new confetti effect based on interval
      if (
        shouldEmit &&
        time - lastEffectTimeRef.current >= effectInterval &&
        effectCountRef.current < effectCount
      ) {
        createConfetti({
          particles: particlesRef.current,
          mode,
          colors,
          shapeSize,
          shapes,
        });

        lastEffectTimeRef.current = time;
        effectCountRef.current += 1;
      }

      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const p = particles[i];
        p.update();
        p.draw(ctx);

        if (p.opacity <= 0 || p.y > canvas.height) {
          particles.splice(i, 1);
        }
      }

      /* v8 ignore start */
      // Stop animation when all effects are done and no particles remain
      if (effectCountRef.current >= effectCount && particles.length === 0) {
        cancelAnimationFrame(frameRef.current);
        if (onComplete) onComplete();
      }
      /* v8 ignore end */
    },
    [
      colors,
      effectCount,
      effectInterval,
      mode,
      shapeSize,
      shapes,
      duration,
      onComplete,
    ]
  );

  // Bootstraps the animation and handles canvas resizing.
  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    frameRef.current = requestAnimationFrame((t) => {
      lastEffectTimeRef.current = t - effectInterval;
      animate(t);
    });

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [animate, resizeCanvas, effectInterval]);

  // Reset effect counter when effectCount changes.
  useEffect(() => {
    effectCountRef.current = 0;
  }, [effectCount]);

  return (
    <Canvas
      data-testid="canvas-confetti"
      ref={canvasRef}
      className={className}
      style={style}
      aria-hidden="true"
    />
  );
};

Confetti.displayName = 'Confetti';
