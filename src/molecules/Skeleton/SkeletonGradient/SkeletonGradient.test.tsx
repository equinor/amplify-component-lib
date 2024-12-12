import { SkeletonGradient } from './SkeletonGradient';
import { render, screen } from 'src/tests/browsertest-utils';

test('Skeleton gradient works as expected', () => {
  const { container } = render(
    <svg width={100} height={100}>
      <defs>
        <SkeletonGradient />
      </defs>
      <rect
        data-testid="rectangle"
        fill="url(#skeleton-gradient)"
        width={50}
        height={50}
        x={20}
        y={10}
      />
    </svg>
  );

  expect(screen.getByTestId('rectangle')).toBeInTheDocument();

  const gradient = container.getElementsByTagName('linearGradient');
  expect(gradient).not.toBeNull();
});
