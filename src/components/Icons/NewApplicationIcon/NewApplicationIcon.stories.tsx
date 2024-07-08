// ApplicationIcon.stories.tsx

import React, { FC } from 'react';

import { Meta } from '@storybook/react';

import NewApplicationIcon from './NewApplicationIcon';

export default {
  title: 'Icons/NewApplicationIcon',
  component: NewApplicationIcon,
} as Meta;

const Template: FC<{ name: string }> = (args) => (
  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
    <NewApplicationIcon {...args} size={48} />
  </div>
);

export const Default = Template.bind({});

export const MultipleIcons = () => (
  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
    {[
      'amplify',
      'embark',
      'premo',
      'dasha',
      'acquire',
      'orca',
      'pwex',
      'ltg',
      'equinor',
    ].map((appName) => (
      <NewApplicationIcon key={appName} name={appName} size={48} />
    ))}
  </div>
);
