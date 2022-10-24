import { FormProvider, useForm } from 'react-hook-form';

import { faker } from '@faker-js/faker';

import { render, renderHook, screen, userEvent } from '../../../test-utils';
import SingleSelectDrawerWithValidation, {
  SingleSelectDrawerWithValidationProps,
} from './SingleSelectDrawerWithValidation';

function fakeItem(): { id: string; label: string } {
  return {
    id: faker.datatype.uuid(),
    label: faker.lorem.words(faker.datatype.number({ min: 1, max: 5 })),
  };
}

function fakeProps(): SingleSelectDrawerWithValidationProps<{
  id: string;
  label: string;
}> {
  const fakeItems: { id: string; label: string }[] = [];

  for (let i = 0; i < faker.datatype.number({ min: 2, max: 10 }); i++) {
    fakeItems.push(fakeItem());
  }
  return {
    items: fakeItems,
    label: faker.lorem.words(2),
    placeholder: faker.lorem.sentence(),
    onChange: jest.fn(),
    id: faker.datatype.uuid(),
    initialItem: undefined,
    rules: { required: true },
  };
}

test('Works as expected when opening and choosing an item', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  const { result } = renderHook(() =>
    useForm({ reValidateMode: 'onChange', mode: 'onChange' })
  );
  render(
    <FormProvider {...result.current}>
      <SingleSelectDrawerWithValidation {...props} />
    </FormProvider>
  );

  const toggleOptions = screen.getByRole('button', {
    name: /toggle options/i,
  });

  await user.click(toggleOptions);

  const randomIndex = faker.datatype.number({
    min: 0,
    max: props.items.length - 1,
  });

  const randomItem = screen.getAllByRole('checkbox')[randomIndex];

  await user.click(randomItem);

  expect(props.onChange).toHaveBeenCalledTimes(1);
  expect(props.onChange).toHaveBeenCalledWith(props.items[randomIndex]);
});

test('Works as expected when opening and closing (validation kicks in)', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  const { result } = renderHook(() =>
    useForm({ reValidateMode: 'onChange', mode: 'onChange' })
  );
  render(
    <FormProvider {...result.current}>
      <SingleSelectDrawerWithValidation {...props} />
    </FormProvider>
  );

  const toggleOptions = screen.getByRole('button', {
    name: /toggle options/i,
  });

  await user.click(toggleOptions);
  const randomIndex = faker.datatype.number({
    min: 0,
    max: props.items.length - 1,
  });

  const randomItem = screen.getAllByRole('checkbox')[randomIndex];

  await user.click(randomItem);

  // Click again
  await user.click(randomItem);

  expect(screen.getByText(/this field is required/i)).toBeInTheDocument();
});
