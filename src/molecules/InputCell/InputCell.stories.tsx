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
