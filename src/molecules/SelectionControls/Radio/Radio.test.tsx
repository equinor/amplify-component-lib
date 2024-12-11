import { faker } from '@faker-js/faker';

import { Radio } from './Radio';
import { render, screen } from 'src/tests/browsertest-utils';

test('Renders as expected', () => {
  const label = faker.animal.dog();
  render(<Radio label={label} />);

  expect(screen.getByText(label)).toBeInTheDocument();
});

test('Has checked attribute', () => {
  const label = faker.animal.dog();
  const onChange = vi.fn();
  const { rerender } = render(
    <Radio label={label} checked onChange={onChange} />
  );

  expect(screen.getByRole('radio')).toBeChecked();
  rerender(<Radio label={label} checked={false} onChange={onChange} />);
  expect(screen.getByText(label)).not.toHaveAttribute('checked');
});
