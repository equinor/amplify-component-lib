import { render } from '@testing-library/react';

import VisualWaves, { VisualWavesProps } from './VisualWaves';

const renderVisualWaves = (props: Partial<VisualWavesProps> = {}) => {
  const defaultProps: VisualWavesProps = {
    waveIntervalDist: 3,
    waveDelay: 0.75,
    numWaves: 10,
    heightFromBottom: 600,
  };

  return render(<VisualWaves {...defaultProps} {...props} />);
};

test('renders correctly with default props', () => {
  const { container } = renderVisualWaves();
  expect(container).toBeInTheDocument();
});

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
