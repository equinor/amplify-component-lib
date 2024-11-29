import { render } from '@testing-library/react';

import { Waves, WavesProps } from './Waves';

const renderVisualWaves = (props: Partial<WavesProps> = {}) => {
  const defaultProps: WavesProps = {
    waveIntervalDist: 3,
    waveDelay: 0.75,
    numWaves: 10,
    heightFromBottom: 600,
  };

  return render(<Waves {...defaultProps} {...props} />);
};

test('applies correct waveIntervalDist', () => {
  const waveIntervalDist = 5;
  const { container } = renderVisualWaves({ waveIntervalDist });
  const waves = container.querySelectorAll('div[style] > div');

  waves.forEach((wave, index) => {
    expect(wave).toHaveStyle(`top: ${index * waveIntervalDist}rem`);
  });
});

test('applies correct waveDelay', () => {
  const waveDelay = 1;
  const { container } = renderVisualWaves({ waveDelay });
  const waves = container.querySelectorAll('div[style] > div');

  waves.forEach((wave, index) => {
    expect(wave).toHaveStyle(`animation-delay: ${index * waveDelay}s`);
  });
});
