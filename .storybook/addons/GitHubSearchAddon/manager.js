import React from 'react';
import { addons, types } from 'storybook/manager-api';
import GitHubSearchPanel from './Panel';
import { ADDON_ID, PANEL_ID } from './constants';

addons.register(ADDON_ID, (api) => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Component Usage Search',
    render: ({ active, key }) => (
      <GitHubSearchPanel active={active} key={key} />
    ),
  });
});
