import { ArgTypes, PRIMARY_STORY } from '@storybook/addon-docs/blocks';

export const PropsTable = ({ story = PRIMARY_STORY, ...props }) => (
  <ArgTypes of={story} {...props} />
);
