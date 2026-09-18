import { createRef, KeyboardEvent } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import { InputCell } from 'src/molecules/InputCell/InputCell';
import {
  ControlledEditor,
  UpdateExample,
} from 'src/molecules/InputCell/stories/testUtils';
import { TextField } from 'src/molecules/TextField/TextField';

import { expect, fireEvent, fn, userEvent } from 'storybook/test';

const meta = {
  title: 'Molecules/Cell/InputCell/Contracts',
  component: InputCell,
  tags: ['test-only', '!dev', '!autodocs'],
} satisfies Meta<typeof InputCell>;
export default meta;
type Story = StoryObj<typeof meta>;

export const NativeElements: Story = {
  play: async ({ mount, step }) => {
    await step('Native table attributes and ref cleanup', async () => {
      const ref = createRef<HTMLTableCellElement>();
      const canvas = await mount(
        <table>
          <tbody>
            <tr>
              <InputCell
                ref={ref}
                colSpan={2}
                className="consumer-cell"
                data-column="name"
                aria-label="Editable name"
              >
                Name
              </InputCell>
            </tr>
          </tbody>
        </table>
      );
      const cell = canvas.getByRole('cell', { name: 'Editable name' });
      await expect(cell.tagName).toBe('TD');
      await expect(cell).toHaveAttribute('colspan', '2');
      await expect(cell).toHaveAttribute('data-column', 'name');
      await expect(cell).toHaveAttribute('data-input-cell');
      await expect(cell).toHaveClass('consumer-cell');
      await expect(cell).toHaveTextContent('Name');
      await expect(ref.current).toBe(cell);
      await mount(<></>);
      await expect(ref.current).toBeNull();
    });
    await step('Empty grid div and native attributes', async () => {
      const ref = createRef<HTMLDivElement>();
      const canvas = await mount(
        <InputCell
          as="div"
          ref={ref}
          role="gridcell"
          tabIndex={0}
          noBottomBorder
        />
      );
      const cell = canvas.getByRole('gridcell');
      await expect(cell.tagName).toBe('DIV');
      await expect(ref.current).toBe(cell);
      await expect(cell).toHaveAttribute('data-input-cell');
      await expect(cell).toHaveAttribute('tabindex', '0');
      await expect(cell).not.toHaveAttribute('noBottomBorder');
      await expect(cell).toBeEmptyDOMElement();
    });
  },
};

export const CompositionAndValues: Story = {
  play: async ({ mount, step }) => {
    await step('Arbitrary children stay inside an isolated scope', async () => {
      const canvas = await mount(
        <>
          <input aria-label="Before" />
          <InputCell as="div" role="gridcell">
            Prefix
            <>
              <span>Nested content</span>
              <input aria-label="Inside" defaultValue="Original" />
            </>
            Suffix
          </InputCell>
          <input aria-label="After" />
        </>
      );
      await expect(canvas.getByRole('gridcell')).toHaveTextContent(
        'PrefixNested contentSuffix'
      );
      await expect(canvas.getByLabelText('Inside')).toHaveValue('Original');
      await expect(
        canvas.getByLabelText('Inside').closest('[data-input-cell]')
      ).toBe(canvas.getByRole('gridcell'));
      for (const label of ['Before', 'After']) {
        await expect(
          canvas.getByLabelText(label).closest('[data-input-cell]')
        ).toBeNull();
      }
    });
    await step('Consumer controls value, callback and custom ref', async () => {
      const ref = createRef<HTMLInputElement>();
      const onChange = fn();
      const canvas = await mount(
        <ControlledEditor
          ref={ref}
          onValueChange={onChange}
          aria-label="Controlled editor"
        />
      );
      const input = canvas.getByRole('textbox');
      await expect(ref.current).toBe(input);
      await userEvent.type(input, 'b');
      await expect(onChange).toHaveBeenCalledOnce();
      await expect(onChange).toHaveBeenCalledWith('Ab');
      await expect(input).toHaveValue('AB');
      await expect(ref.current).toBe(input);
    });
    await step(
      'Presentation changes preserve uncontrolled value and DOM identity',
      async () => {
        const ref = createRef<HTMLInputElement>();
        const editor = (
          <input ref={ref} aria-label="Uncontrolled editor" defaultValue="A" />
        );
        const canvas = await mount(
          <UpdateExample>
            {(updated) => (
              <InputCell
                as="div"
                active={updated}
                variant={updated ? 'error' : undefined}
                noBottomBorder={updated}
              >
                {editor}
              </InputCell>
            )}
          </UpdateExample>
        );
        const input = canvas.getByRole('textbox');
        await userEvent.type(input, 'b');
        await userEvent.click(
          canvas.getByRole('button', { name: 'Update example' })
        );
        await expect(input).toHaveValue('Ab');
        await expect(canvas.getByRole('textbox')).toBe(input);
        await expect(ref.current).toBe(input);
      }
    );
  },
};

export const ConsumerEvents: Story = {
  play: async ({ mount, step }) => {
    for (const preventDefault of [false, true]) {
      await step(
        `Callbacks and bubbling with preventDefault=${preventDefault}`,
        async () => {
          const onCellKeyDown = fn();
          const callbacks = {
            onFocus: fn(),
            onBlur: fn(),
            onChange: fn(),
            onKeyUp: fn(),
            onKeyDown: fn((event: KeyboardEvent<HTMLInputElement>) => {
              if (preventDefault) event.preventDefault();
            }),
          };
          const canvas = await mount(
            <InputCell as="div" onKeyDown={onCellKeyDown}>
              <input aria-label="Editor" {...callbacks} />
            </InputCell>
          );
          const input = canvas.getByRole('textbox');
          // Dispatch exact events to assert cancellation and one callback per event.
          fireEvent.focusIn(input);
          fireEvent.change(input, { target: { value: 'Updated' } });
          await expect(fireEvent.keyDown(input, { key: 'Enter' })).toBe(
            !preventDefault
          );
          fireEvent.keyUp(input, { key: 'Enter' });
          fireEvent.focusOut(input);
          for (const [name, callback] of Object.entries(callbacks)) {
            await expect(callback).toHaveBeenCalledOnce();
            await expect(callback).toHaveBeenCalledWith(
              expect.objectContaining({
                target: input,
                defaultPrevented: name === 'onKeyDown' && preventDefault,
              })
            );
          }
          await expect(input).toHaveValue('Updated');
          await expect(onCellKeyDown).toHaveBeenCalledOnce();
          await expect(onCellKeyDown).toHaveBeenCalledWith(
            expect.objectContaining({
              target: input,
              key: 'Enter',
              defaultPrevented: preventDefault,
            })
          );
        }
      );
    }
  },
};

export const ConsumerInputState: Story = {
  play: async ({ mount, step }) => {
    for (const attribute of ['disabled', 'readOnly'] as const) {
      await step(`${attribute} remains consumer-controlled`, async () => {
        const onChange = fn();
        const example = (restricted: boolean) => (
          <InputCell as="div" active variant="error">
            <input
              aria-label="Editor"
              defaultValue="Original"
              onChange={onChange}
              {...{ [attribute]: restricted }}
            />
          </InputCell>
        );
        const canvas = await mount(
          <UpdateExample>{(updated) => example(!updated)}</UpdateExample>
        );
        const input = canvas.getByRole('textbox');
        await userEvent.type(input, 'x');
        await expect(input).toHaveValue('Original');
        await expect(onChange).not.toHaveBeenCalled();
        await expect(input).toHaveAttribute(attribute.toLowerCase());
        await userEvent.click(
          canvas.getByRole('button', { name: 'Update example' })
        );
        await userEvent.type(input, 'x');
        await expect(input).toHaveValue('Originalx');
        await expect(onChange).toHaveBeenCalledTimes(1);
        await expect(input).not.toHaveAttribute(attribute.toLowerCase());
        await mount(<></>);
      });
    }
    await step('Explicit feedback stays visual only', async () => {
      const canvas = await mount(
        <InputCell as="div" role="gridcell" active variant="error">
          <input aria-label="Editor" defaultValue="Original" />
        </InputCell>
      );
      const cell = canvas.getByRole('gridcell');
      const input = canvas.getByRole('textbox');
      await expect(input).toHaveValue('Original');
      await expect(input).toBeEnabled();
      await expect(input).not.toHaveAttribute('aria-invalid');
      await expect(input).not.toHaveFocus();
      for (const attribute of ['active', 'variant', 'aria-invalid']) {
        await expect(cell).not.toHaveAttribute(attribute);
      }
    });
  },
};

export const TextFieldValidation: Story = {
  play: async ({ mount }) => {
    const onChange = fn();
    const canvas = await mount(
      <InputCell as="div" variant="success">
        <TextField
          label="Email"
          defaultValue="invalid"
          aria-invalid="true"
          variant="error"
          helperText="Enter a valid email"
          onChange={onChange}
        />
      </InputCell>
    );
    const input = canvas.getByRole('textbox', { name: /Email/ });
    await expect(input).toBeInvalid();
    await expect(canvas.getByText('Enter a valid email')).toBeVisible();
    fireEvent.change(input, { target: { value: 'name@example.com' } });
    await expect(input).toHaveValue('name@example.com');
    await expect(onChange).toHaveBeenCalledOnce();
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    // Explicit cell feedback wins over the input's error; aria-invalid still belongs to the input.
    await expect(
      getComputedStyle(input.closest('[data-input-cell]')!).outline
    ).toBe('rgb(75, 183, 72) solid 2px');
  },
};
