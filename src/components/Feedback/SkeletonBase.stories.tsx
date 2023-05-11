import { Typography } from '@equinor/eds-core-react';
import { Meta, StoryFn } from '@storybook/react';

import SkeletonBase from './SkeletonBase';

import styled from 'styled-components';

export default {
  title: 'Feedback/SkeletonBase',
  component: SkeletonBase,
  argTypes: {
    width: { control: 'text' },
    height: { control: 'text' },
    borderRadius: { control: 'text' },
  },
  args: { width: '100px', height: '10px', borderRadius: '4px' },
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
