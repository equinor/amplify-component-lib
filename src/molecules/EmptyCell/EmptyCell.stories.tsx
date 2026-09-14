import { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from 'src/molecules/Button/Button';
import { EmptyCell, EmptyCellProps } from 'src/molecules/EmptyCell/EmptyCell';

const meta = {
  title: 'Molecules/Cell/EmptyCell',
  component: EmptyCell,
  argTypes: {
    children: {
      control: false,
      table: { type: { summary: 'ReactNode' } },
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fk8AI59x5HqPCBg4Nemlkl/Component-Library-Amplify?node-id=19153-6167',
    },
    docs: {
      description: {
        component:
          'An empty table cell with optional arbitrary content, token-based padding, and a bottom divider. ' +
          'Native cell attributes, events, styles, and refs are forwarded. Use as="div" when the table/grid already supplies a cell. ' +
          'Content is never cloned or restyled.',
      },
    },
  },
  decorators: [
    (Story) => (
      <table style={{ borderSpacing: 0, width: 240 }}>
        <tbody>
          <tr>
            <Story />
          </tr>
        </tbody>
      </table>
    ),
  ],
} satisfies Meta<typeof EmptyCell>;

export default meta;
type Story = StoryObj<Extract<EmptyCellProps, { as?: 'td' }>>;

export const Default: Story = {};
export const WithContent: Story = {
  args: { children: <Button variant="ghost">Open details</Button> },
};
export const WithoutDivider: Story = {
  args: { noBottomBorder: true, children: 'Custom content' },
};
