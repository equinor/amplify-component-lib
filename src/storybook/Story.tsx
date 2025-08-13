import {
  Canvas,
  Story as SBStory,
  StoryProps,
} from '@storybook/addon-docs/blocks';

export const Story = (props: StoryProps) => (
  <Canvas of={<SBStory {...props} />} />
);
