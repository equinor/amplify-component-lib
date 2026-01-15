import { useEffect } from 'react';

import { faker } from '@faker-js/faker';

import { Confetti } from './Confetti';
import { useConfetti } from 'src/atoms';
import { ConfettiProvider } from 'src/providers';
import { render, screen } from 'src/tests/browsertest-utils';

test('Renders confetti canvas', () => {
  render(<Confetti mode="shower" duration={1000} />);
  const canvas = screen.getByTestId('canvas-confetti');

  expect(canvas).toBeInTheDocument();
});

test('renders confetti on boom', () => {
  const Test = () => {
    const { boom } = useConfetti();
    useEffect(() => {
      boom();
    }, [boom]);
    return null;
  };

  render(
    <ConfettiProvider>
      <Test />
    </ConfettiProvider>
  );

  expect(screen.getByTestId('canvas-confetti')).toBeInTheDocument();
});

test("Adds styling to canvas when 'style' prop is provided", () => {
  const customStyle = { border: '2px solid red' };
  render(<Confetti style={customStyle} />);
  const canvas = screen.getByTestId('canvas-confetti');

  expect(canvas).toHaveStyle('border: 2px solid red');
});

test('Adds className to canvas when provided', () => {
  const customClassName = 'my-custom-confetti';
  render(<Confetti className={customClassName} />);
  const canvas = screen.getByTestId('canvas-confetti');

  expect(canvas).toHaveClass(customClassName);
});

test('Throws error on negative duration', async () => {
  const duration = faker.number.int({ min: Number.MIN_SAFE_INTEGER, max: 0 });
  expect(() => render(<Confetti mode="shower" duration={duration} />)).toThrow(
    'Duration must be a non-negative number'
  );
});

test('Throws error on effect count under 1', async () => {
  const effectCount = faker.number.int({
    min: Number.MIN_SAFE_INTEGER,
    max: 0,
  });
  expect(() =>
    render(<Confetti mode="boom" effectCount={effectCount} />)
  ).toThrow('Effect count must be at least 1');
});
