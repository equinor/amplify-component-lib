import { Meta, StoryObj } from '@storybook/react-vite';

import { EmptyCell } from 'src/molecules/EmptyCell/EmptyCell';
import { InputCell } from 'src/molecules/InputCell/InputCell';
import { DivCell } from 'src/molecules/InputCell/stories/DivCell';
import divCellSource from 'src/molecules/InputCell/stories/DivCell.tsx?raw';
import {
  ExampleTable,
  ExampleTableHeader,
} from 'src/molecules/InputCell/stories/ExampleTable';
import { InputCellExamples } from 'src/molecules/InputCell/stories/InputCellExamples';
import inputCellExamplesSource from 'src/molecules/InputCell/stories/InputCellExamples.tsx?raw';
import { inputExamples } from 'src/molecules/InputCell/stories/inputExamples';
import { ValidatedCell } from 'src/molecules/InputCell/stories/ValidatedCell';
import validatedCellSource from 'src/molecules/InputCell/stories/ValidatedCell.tsx?raw';

import { expect, userEvent, within } from 'storybook/test';

const meta = {
  title: 'Molecules/Cell/InputCell',
  component: InputCell,
  argTypes: {
    as: { control: false },
    children: {
      control: false,
      table: { type: { summary: 'ReactNode' } },
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fk8AI59x5HqPCBg4Nemlkl/Component-Library-Amplify?node-id=26144-7945',
    },
    docs: {
      source: {
        language: 'tsx',
        type: 'code',
      },
      description: {
        component:
          'Compose TextField, SingleSelect, DatePicker, ComboBox, or your own editor. ' +
          'Inputs retain their values, callbacks, refs, and validation. ' +
          'Use as="div" inside an existing cell with no host padding. ' +
          'Custom editors can style under `[data-input-cell]`; active keeps the focus border visible and variant sets cell-level feedback.',
      },
    },
  },
} satisfies Meta<typeof InputCell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <InputCell {...args} />,
  decorators: [
    (Story) => (
      <ExampleTable aria-label="Input cell">
        <ExampleTableHeader />
        <tbody>
          <tr>
            <EmptyCell>1</EmptyCell>
            <EmptyCell>Example</EmptyCell>
            <Story />
          </tr>
        </tbody>
      </ExampleTable>
    ),
  ],
  argTypes: {
    children: {
      control: 'select',
      options: Object.keys(inputExamples),
      mapping: inputExamples,
    },
  },
  args: {
    as: 'td',
    children: 'Text field',
  },
  parameters: {
    docs: { source: { type: 'dynamic', excludeDecorators: true } },
  },
};

export const AllInputs: Story = {
  render: () => <InputCellExamples />,
  play: async ({ canvas, step }) => {
    await step('Single select preserves consumer selection', async () => {
      const select = canvas.getByRole('combobox', {
        name: 'Default single select',
      });
      await userEvent.click(select);
      const menu = await canvas.findByRole('menu');
      await userEvent.click(within(menu).getByText('Item 2'));
      await expect(
        within(select.closest('[data-input-cell]') as HTMLElement).getByText(
          'Item 2'
        )
      ).toBeVisible();
    });
    await step(
      'Combobox chips fit one row and preserve removal and selection',
      async () => {
        const select = canvas.getByRole('combobox', {
          name: 'Default combobox',
        });
        const cell = select.closest('[data-input-cell]') as HTMLElement;
        const scope = within(cell);
        await expect(cell.getBoundingClientRect().height).toBe(52);
        const chips = scope.getAllByTestId('amplify-combobox-chip');
        await expect(chips).toHaveLength(3);
        for (const chip of chips) {
          await expect(chip.getBoundingClientRect().height).toBe(24);
          await expect(chip.getBoundingClientRect().width).toBeLessThan(67);
        }
        await userEvent.click(chips[0]);
        await expect(
          scope.getAllByTestId('amplify-combobox-chip')
        ).toHaveLength(2);
        await userEvent.click(select);
        const menu = await canvas.findByRole('menu');
        await userEvent.click(within(menu).getByText('Item 1'));
        await expect(
          scope.getAllByTestId('amplify-combobox-chip')
        ).toHaveLength(3);
        await userEvent.keyboard('{Escape}');
      }
    );
  },
  parameters: {
    docs: {
      source: {
        code: inputCellExamplesSource,
      },
    },
  },
};

export const AsDiv: Story = {
  name: 'As div',
  render: (args) => <DivCell {...args} />,
  args: {
    as: 'div',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox', { name: 'Name' });
    await expect(input.closest('[data-input-cell]')?.tagName).toBe('DIV');
    await userEvent.type(input, ' updated');
    await expect(input).toHaveValue('Editable text updated');
  },
  parameters: {
    docs: {
      source: { code: divCellSource },
      description: {
        story:
          'Use as="div" when a table already supplies the td. Remove the host cell padding to avoid doubling it.',
      },
    },
  },
};

export const DeveloperValidation: Story = {
  render: () => <ValidatedCell />,
  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox', { name: 'Integer' });
    await expect(input).toHaveValue('42');
    await userEvent.type(input, 'x');
    await expect(input).toHaveValue('42x');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await expect(canvas.getByText('Enter a whole number.')).toBeVisible();
    await userEvent.clear(input);
    await userEvent.type(input, '12');
    await expect(input).toHaveValue('12');
    await expect(input).toHaveAttribute('aria-invalid', 'false');
    await expect(
      canvas.queryByText('Enter a whole number.')
    ).not.toBeInTheDocument();
  },
  parameters: {
    docs: {
      source: {
        code: validatedCellSource,
      },
      description: {
        story:
          'Try entering letters. The consumer accepts the edit and decides when to show an error; InputCell neither parses nor rejects values.',
      },
    },
  },
};
