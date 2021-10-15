import { Story, Meta } from '@storybook/react';
import styled from 'styled-components';

import FullPageSpinner from '../../components/FullPageSpinner';

export default {
  title: 'FullPageSpinner',
  component: FullPageSpinner,
  argTypes: {
    variant: {
      description: 'Defaults to "equinor" star',
      defaultValue: undefined,
    },
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

const Template: Story = (args) => (
  <Container>
    <FullPageSpinner {...args} />
  </Container>
);

export const Primary = Template.bind({});
