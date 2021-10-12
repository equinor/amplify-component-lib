import { Avatar } from '@equinor/eds-core-react';
import { Story, Meta } from '@storybook/react';

import { createImageFromInitials } from './';

export default {
  title: 'ProfilePicture',
  argTypes: {
    name: { control: 'text', defaultValue: 'Fredrik Wigsnes' },
  },
} as Meta;

interface StoryProps {
  name: string;
}

const Template: Story<StoryProps> = ({ name }) => (
  <img src={createImageFromInitials(name)} alt="ProfilePicture" />
);

const TemplateAvatar: Story<StoryProps> = ({ name }) => (
  <>
    <Avatar
      src={createImageFromInitials(name)}
      alt="ProfilePicture"
      size={48}
    />
  </>
);

export const Primary = Template.bind({});

export const Profile = TemplateAvatar.bind({});
