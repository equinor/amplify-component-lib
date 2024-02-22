import { Canvas, Story as SBStory, StoryProps } from '@storybook/addon-docs';

export const Story = (props: StoryProps) => (
  <Canvas>
    <SBStory {...props}></SBStory>
  </Canvas>
);
