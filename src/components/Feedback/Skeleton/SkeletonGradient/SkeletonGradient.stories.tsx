import { Meta, StoryFn } from '@storybook/react';

import SkeletonGradient from './SkeletonGradient';

import styled from 'styled-components';

export default {
  title: 'Feedback/Skeleton/SkeletonGradient',
  component: SkeletonGradient,
  argTypes: {
    duration: { control: 'text' },
  },
  args: { duration: '1.5s' },
} as Meta;

const Container = styled.div`
  display: flex;
`;

export const Template: StoryFn = (args) => {
  return (
    <Container>
      <svg width={400} height={160}>
        <defs>
          <SkeletonGradient duration={args.duration} />
        </defs>
        <path
          d="M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
          stroke="url(#skeleton-gradient)"
          strokeWidth={15}
          fill="transparent"
        />
        <circle cx={280} cy={80} fill="url(#skeleton-gradient)" r={50} />
      </svg>
    </Container>
  );
};
