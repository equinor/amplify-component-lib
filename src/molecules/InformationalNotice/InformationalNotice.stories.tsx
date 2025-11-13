import { info_circle } from '@equinor/eds-icons';
import { Meta, StoryObj } from '@storybook/react-vite';

import { InformationalNotice } from './InformationalNotice';
import { VariantShowcase } from 'src/storybook/VariantShowcase';

import { expect } from 'storybook/test';

const meta: Meta<typeof InformationalNotice> = {
  title: 'Molecules/InformationalNotice',
  component: InformationalNotice,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?node-id=20206-39581&m=dev',
    },
  },
  args: {
    children:
      'Please make sure this informational notice is used correctly when used in a matter to simply inform a user of information they should know, that is not urgent nor requires immediate attention.',
  },
};

export default meta;
type Story = StoryObj<typeof InformationalNotice>;

export const Default: Story = {
  args: {},
  decorators: (StoryFn) => (
    <div style={{ width: '400px' }}>
      <StoryFn />
    </div>
  ),
  play: async ({ canvas, args }) => {
    await expect(canvas.getByTestId('eds-icon-path')).toHaveAttribute(
      'd',
      info_circle.svgPathData as string
    );
    await expect(canvas.getByText(args.children)).toBeInTheDocument();
  },
};

export const Variants: Story = {
  render: (args) => (
    <VariantShowcase
      GenericComponent={InformationalNotice}
      otherProps={args}
      columns={[
        { label: 'Grey', value: { color: 'grey' } },
        { label: 'White', value: { color: 'white' } },
      ]}
      rows={[
        { label: 'Comfortable', value: { spacing: 'comfortable' } },
        { label: 'Compact', value: { spacing: 'compact' } },
      ]}
    />
  ),
};
