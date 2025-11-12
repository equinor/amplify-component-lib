import { Typography } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import { Meta, StoryObj } from '@storybook/react-vite';

import { InformationalNotice } from './InformationalNotice';
import { colors, shape, spacings } from 'src/atoms';

import { expect } from 'storybook/test';
import styled from 'styled-components';

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

const VariantsContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr 1fr;
  align-items: center;
  grid-template-rows: auto auto 1fr 1fr;
  gap: ${spacings.small};
  > p {
    justify-self: center;
  }
`;

const VariantColumnShape = styled.span`
  position: relative;
  height: 10px;
  width: 100%;
  border-top-left-radius: ${shape.button.borderRadius};
  border-top-right-radius: ${shape.button.borderRadius};
  border-left: 2px solid ${colors.text.static_icons__default.rgba};
  border-top: 2px solid ${colors.text.static_icons__default.rgba};
  border-right: 2px solid ${colors.text.static_icons__default.rgba};
  &::after {
    content: '';
    background: ${colors.text.static_icons__default.rgba};
    height: 6px;
    width: 2px;
    position: absolute;
    left: 50%;
    top: -6px;
    transform: translateX(-50%);
  }
`;

const VariantRowShape = styled.span`
  position: relative;
  width: 10px;
  height: 100%;
  border-top-left-radius: ${shape.button.borderRadius};
  border-bottom-left-radius: ${shape.button.borderRadius};
  border-left: 2px solid ${colors.text.static_icons__default.rgba};
  border-top: 2px solid ${colors.text.static_icons__default.rgba};
  border-bottom: 2px solid ${colors.text.static_icons__default.rgba};
  &::after {
    content: '';
    background: ${colors.text.static_icons__default.rgba};
    width: 6px;
    height: 2px;
    position: absolute;
    left: -6px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const Variants: Story = {
  render: (args) => (
    <VariantsContainer>
      <Typography style={{ gridColumn: 3 }}>Grey</Typography>
      <Typography>White</Typography>
      <VariantColumnShape style={{ gridColumn: 3 }} />
      <VariantColumnShape />
      <Typography>Comfortable</Typography>
      <VariantRowShape />
      <InformationalNotice color="grey" spacing="comfortable">
        {args.children}
      </InformationalNotice>
      <InformationalNotice color="white" spacing="comfortable">
        {args.children}
      </InformationalNotice>
      <Typography>Compact</Typography>
      <VariantRowShape />
      <InformationalNotice color="grey" spacing="compact">
        {args.children}
      </InformationalNotice>
      <InformationalNotice color="white" spacing="compact">
        {args.children}
      </InformationalNotice>
    </VariantsContainer>
  ),
};
