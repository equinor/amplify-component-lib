import { Meta, Story } from '@storybook/react';

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
} as Meta;

const Container = styled.div`
  width: 100%;
  height: 100%;

  & > div {
    width: 100%;
    height: 100%;
    position: none;
  }
`;

const Template: Story<FullpageSpinnerProps> = (args) => (
  <Container>
    <FullPageSpinner {...args} />
  </Container>
);

export const Primary = Template.bind({});
