import { Meta, StoryFn } from '@storybook/react';

import {
  FullPageSpinner,
  FullPageSpinnerProps,
} from 'src/molecules/FullPageSpinner/FullPageSpinner';

import styled from 'styled-components';

export default {
  title: 'Molecules/FullPageSpinner',
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
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?type=design&node-id=5694-19817&mode=design&t=jlQAMMWK1GLpzcAL-4',
    },
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

const Template: StoryFn<FullPageSpinnerProps> = (args) => (
  <Container>
    <FullPageSpinner {...args} />
  </Container>
);

export const Primary = Template.bind({});
