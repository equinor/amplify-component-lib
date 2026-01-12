import { createRoot } from 'react-dom/client';

import { Confetti } from '../Confetti';
import { IMPERATIVE_STYLING } from '../Confetti.constants';
import { ConfettiProps } from '../Confetti.types';

const DEFAULT_SHOWER_DURATION = 2000; // in ms
const MAX_PARTICLE_LIFETIME = 4000;

/**
 * Programmatically triggers a "shower" confetti effect.
 *
 * @param props - Optional properties to customize the confetti effect.
 * @returns A promise that resolves when the confetti effect is done.
 */
export function showerConfetti(props: ConfettiProps = {}) {
  const container = document.createElement('div');
  document.body.appendChild(container);

  const root = createRoot(container);

  root.render(
    <Confetti
      duration={DEFAULT_SHOWER_DURATION}
      {...props}
      mode="shower"
      style={IMPERATIVE_STYLING} // Ensure it covers the viewport
    />
  );

  // Stop shower + cleanup
  setTimeout(() => {
    root.unmount();
    container.remove();
  }, DEFAULT_SHOWER_DURATION + MAX_PARTICLE_LIFETIME);
}
