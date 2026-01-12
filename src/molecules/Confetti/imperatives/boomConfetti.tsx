import { createRoot } from 'react-dom/client';

import { Confetti } from '../Confetti';
import { IMPERATIVE_STYLING } from '../Confetti.constants';
import { ConfettiProps } from '../Confetti.types';

/**
 * Programmatically triggers a single "boom" confetti effect.
 *
 * @param props - Optional properties to customize the confetti effect.
 */
export function boomConfetti(props: ConfettiProps = {}) {
  const container = document.createElement('div');
  document.body.appendChild(container);

  const root = createRoot(container);

  root.render(
    <Confetti
      {...props}
      mode="boom"
      effectCount={1} // Ensure only one effect
      style={IMPERATIVE_STYLING} // Ensure it covers the viewport
    />
  );

  // Hard cleanup fallback (covers edge cases)
  const CLEANUP_TIMEOUT = 4000;

  setTimeout(() => {
    root.unmount();
    container.remove();
  }, CLEANUP_TIMEOUT);
}
