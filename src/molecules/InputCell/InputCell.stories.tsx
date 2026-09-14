import { Meta, StoryObj } from '@storybook/react-vite';

import { EmptyCell } from 'src/molecules/EmptyCell/EmptyCell';
import { InputCell } from 'src/molecules/InputCell/InputCell';
import { CellFeedback as CellFeedbackExample } from 'src/molecules/InputCell/stories/CellFeedback';
import cellFeedbackSource from 'src/molecules/InputCell/stories/CellFeedback.tsx?raw';
import { CustomInputCell } from 'src/molecules/InputCell/stories/CustomInputCell';
import customInputCellSource from 'src/molecules/InputCell/stories/CustomInputCell.tsx?raw';
import { DivCell } from 'src/molecules/InputCell/stories/DivCell';
import divCellSource from 'src/molecules/InputCell/stories/DivCell.tsx?raw';
import {
  ExampleTable,
  ExampleTableHeader,
} from 'src/molecules/InputCell/stories/ExampleTable';
import { InputCellExamples } from 'src/molecules/InputCell/stories/InputCellExamples';
import inputCellExamplesSource from 'src/molecules/InputCell/stories/InputCellExamples.tsx?raw';
import { inputExamples } from 'src/molecules/InputCell/stories/inputExamples';
import { MultilineCell } from 'src/molecules/InputCell/stories/MultilineCell';
import multilineCellSource from 'src/molecules/InputCell/stories/MultilineCell.tsx?raw';
import { ReadOnlyCell } from 'src/molecules/InputCell/stories/ReadOnlyCell';
import readOnlyCellSource from 'src/molecules/InputCell/stories/ReadOnlyCell.tsx?raw';
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
          'InputCell owns presentation only: pass values, callbacks, refs, constraints, and accessible names directly to the input. ' +
          'It renders a td by default; use as="div" inside an existing table/grid cell and remove the host cell padding. ' +
          'Validation stays with the consumer; input variant/aria-invalid or the cell variant controls visual feedback. ' +
          'Custom inputs can scope their CSS under `[data-input-cell]` to opt into cell presentation. ' +
          'Use active for custom portaled editors; no events are stopped and no extra tab stop is added.',
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
          'A CSS-grid table using div elements and explicit table roles. The editable cell renders as a div, not a td.',
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

export const CellFeedback: Story = {
  render: () => <CellFeedbackExample />,
  parameters: {
    docs: {
      source: { code: cellFeedbackSource },
      description: {
        story:
          'Use active to keep the focus border visible for a custom editor, or variant for cell-level feedback. Neither prop changes the input’s focus or validation state.',
      },
    },
  },
};

export const ReadOnly: Story = {
  render: (args) => <ReadOnlyCell {...args} />,
  args: {
    as: 'td',
  },
  parameters: {
    docs: { source: { code: readOnlyCellSource } },
  },
};

export const Multiline: Story = {
  render: (args) => <MultilineCell {...args} />,
  args: {
    as: 'td',
  },
  parameters: {
    docs: { source: { code: multilineCellSource } },
  },
};

export const CustomInput: Story = {
  render: (args) => <CustomInputCell {...args} />,
  args: {
    as: 'td',
  },
  parameters: {
    docs: {
      source: { code: customInputCellSource },
      description: {
        story:
          'Arbitrary children work without cloning or forced styling. Custom inputs keep their own appearance unless they define styles scoped under `[data-input-cell]`.',
      },
    },
  },
};
