import React from 'react';
import { addons, types } from '@storybook/manager-api';
import { Tool } from './Tool';
import { ADDON_ID, TOOL_ID } from './constants';

addons.register(ADDON_ID, (api) => {
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: 'Change spacings mode',
    match: ({ viewMode }) => !!viewMode?.match(/^(story|docs)$/),
    render: ({ active, key }) => (
      <Tool active={active} key={key} />
    ),
  });
});
