import { Typography } from '@equinor/eds-core-react';
import { Meta, StoryFn } from '@storybook/react';

import SkeletonBase from './SkeletonBase';

import styled from 'styled-components';

export default {
  title: 'Feedback/Skeleton/SkeletonBase',
  component: SkeletonBase,
  argTypes: {
    width: { control: 'text' },
    height: { control: 'text' },
    borderRadius: { control: 'text' },
  },
  args: { width: '100px', height: '24px', borderRadius: '4px' },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?type=design&node-id=5694-19891&mode=design&t=jlQAMMWK1GLpzcAL-4',
    },
  },
} as Meta;

const ExampleSkeleton = styled(SkeletonBase)`
  width: 8rem;
  height: 24px;
`;

export const Template: StoryFn = (args) => (
  <div>
    <Typography variant="h5">Skeleton base example</Typography>
    <ExampleSkeleton style={{ ...args }} />
  </div>
);
