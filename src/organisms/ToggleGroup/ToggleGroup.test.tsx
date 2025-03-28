import { car } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import { ToggleGroup } from '.';
import { render, screen, userEvent } from 'src/tests/browsertest-utils';

test('Throws error if providing other children than ToggleGroup.Option', async () => {
  expect(() =>
    render(
      <ToggleGroup>
        <div>test</div>
        <div>test</div>
      </ToggleGroup>
    )
  ).toThrowError();
});

test.each(['outlined', 'filled'] as const)(
  '%s - Able to click options in ToggleGroup',
  async (variant) => {
    const options = new Array(faker.number.int({ min: 2, max: 5 }))
      .fill(null)
      .map(() => faker.vehicle.vehicle());
    const handlers = options.map(() => vi.fn());
    render(
      <ToggleGroup variant={variant}>
        {options.map((option, index) => (
          <ToggleGroup.Option
            key={option}
            label={option}
            onToggle={handlers[index]}
            checked={false}
          />
        ))}
      </ToggleGroup>
    );
    const user = userEvent.setup();

    const randomOptionIndex = faker.number.int({
      min: 0,
      max: options.length - 1,
    });

    await user.click(
      screen.getByRole('button', { name: options[randomOptionIndex] })
    );

    for (const [index, _] of options.entries()) {
      if (index === randomOptionIndex) {
        expect(handlers[index]).toHaveBeenCalledWith(true);
        expect(handlers[index]).toHaveBeenCalledTimes(1);
      } else {
        expect(handlers[index]).not.toHaveBeenCalled();
      }
    }
  }
);

test('Works with icons only', async () => {
  const options = new Array(faker.number.int({ min: 2, max: 5 }))
    .fill(null)
    .map(() => faker.vehicle.vehicle());
  const handlers = options.map(() => vi.fn());
  render(
    <ToggleGroup>
      {options.map((option, index) => (
        <ToggleGroup.Option
          key={option}
          onToggle={handlers[index]}
          icon={car}
          checked={false}
        />
      ))}
    </ToggleGroup>
  );

  const icons = screen.getAllByTestId('eds-icon-path');

  for (const icon of icons) {
    expect(icon).toHaveAttribute('d', car.svgPathData);
  }
});
