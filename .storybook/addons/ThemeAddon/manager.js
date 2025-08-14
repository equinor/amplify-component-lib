import React from 'react';

import { addons, types } from 'storybook/manager-api';

import { ADDON_ID, TOOL_ID } from './constants';
import { Tool } from './Tool';

addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: 'Change theme',
    match: ({ viewMode }) => !!viewMode?.match(/^(story|docs)$/),
    render: ({ active }) => <Tool active={active} />,
  });
});
