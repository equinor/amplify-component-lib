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

test('renders correctly with default props', () => {
  const { container } = renderVisualWaves();
  expect(container).toBeInTheDocument();
});
