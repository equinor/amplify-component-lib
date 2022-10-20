import { Typography } from '@equinor/eds-core-react';
import { Meta, Story } from '@storybook/react';

import SkeletonBase from './SkeletonBase';

import styled from 'styled-components';

export default {
  title: 'Feedback/SkeletonBase',
  component: SkeletonBase,
} as Meta;

const ExampleSkeleton = styled(SkeletonBase)`
  width: 8rem;
  height: 24px;
`;

export const Template: Story = () => (
  <div>
    <Typography variant="h5">Skeleton base example</Typography>
    <ExampleSkeleton />
  </div>
);
