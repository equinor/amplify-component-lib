import { Typography } from '@equinor/eds-core-react';
import { Meta, StoryFn } from '@storybook/react-vite';

import { SkeletonBase } from 'src/molecules/Skeleton/SkeletonBase/SkeletonBase';

import styled from 'styled-components';

const meta: Meta<typeof SkeletonBase> = {
  title: 'Molecules/Skeleton/SkeletonBase',
  component: SkeletonBase,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?type=design&node-id=5694-19891&mode=design&t=jlQAMMWK1GLpzcAL-4',
    },
  },
};

export default meta;

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
