import { Meta, StoryFn } from '@storybook/react';

import FullPageSpinner, { FullpageSpinnerProps } from './FullPageSpinner';

import styled from 'styled-components';

export default {
  title: 'Feedback/FullPageSpinner',
  component: FullPageSpinner,
  argTypes: {
    variant: {
      description: 'Defaults to "equinor" star',
    },
  },
  args: {
    variant: undefined,
  },
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Container = styled.div`
  aspect-ratio: 16 / 9;
  overflow: hidden;

  & > div {
    width: 100%;
    height: 100%;
  }
`;

const Template: StoryFn<FullpageSpinnerProps> = (args) => (
  <Container>
    <FullPageSpinner {...args} />
  </Container>
);

export const Primary = Template.bind({});
