import { ApplicationIcon } from './ApplicationIcon';
import { GRAYSCALE_FILTER_VALUE } from './ApplicationIcon.constants';
import { render, screen, userEvent } from 'src/tests/jsdomtest-utils';

import { expect, test } from 'vitest';

test('Shows hover effects when withHover=true', async () => {
  render(<ApplicationIcon name="acquire" withHover />);
  const user = userEvent.setup();

  const applicationIcon = screen.getByTestId('application-icon');

  await user.hover(applicationIcon);
  expect(applicationIcon).toHaveStyle('cursor: pointer');
});

test("Doesn't hover effects when withHover=false", async () => {
  render(<ApplicationIcon name="acquire" withHover={false} />);
  const user = userEvent.setup();

  const applicationIcon = screen.getByTestId('application-icon');

  await user.hover(applicationIcon);
  expect(applicationIcon).not.toHaveStyle('cursor: pointer');
});

test('has grayscale css attribute when grayscale is set', () => {
  render(<ApplicationIcon name="orca" grayScale />);
  const applicationIcon = screen.getByTestId('application-icon');
  expect(applicationIcon).toHaveStyle(`filter: ${GRAYSCALE_FILTER_VALUE}`);
});

test('background is transparent when iconOnly is set', () => {
  const { rerender } = render(<ApplicationIcon name="orca" iconOnly />);

  const applicationIcon = screen.getByTestId('application-icon');
  expect(applicationIcon).toHaveStyleRule('background', 'transparent');

  rerender(<ApplicationIcon name="bravos" iconOnly />);

  const otherApplicationIcon = screen.getByTestId('application-icon');
  expect(otherApplicationIcon).toHaveStyleRule('background', 'transparent');
});
