import React, { memo, useMemo, useState } from 'react';

import { useGlobals } from 'storybook/manager-api';
import {
  IconButton,
  TooltipLinkList,
  WithTooltip,
} from 'storybook/internal/components';
import { SunIcon, MoonIcon } from '@storybook/icons';

import { PARAM_KEY, TOOL_ID } from './constants';

export const Tool = memo(function MyAddonSelector() {
  const [_, updateGlobals] = useGlobals();

  const [toolState, setToolState] = useState({
    selected: 'light',
    expanded: false,
  });

  const items = useMemo(
    () =>
      ['light', 'dark'].map((value) => ({
        id: value,
        title: `${value[0].toUpperCase()}${value.slice(1)}`,
        active: toolState.selected === value,
        onClick: () => {
          updateGlobals({
            [PARAM_KEY]: value,
          });
          setToolState({ ...toolState, selected: value, expanded: false });
        },
      })),
    [toolState.selected]
  );

  return (
    <WithTooltip
      key={TOOL_ID}
      placement="top"
      trigger="click"
      visible={toolState.expanded}
      tooltip={<TooltipLinkList links={items} />}
    >
      <IconButton
        active={toolState.selected !== undefined}
        key={TOOL_ID}
        title="Change theme mode"
        onClick={() =>
          setToolState((prevState) => ({
            ...prevState,
            expanded: !prevState.expanded,
          }))
        }
      >
        {toolState.selected === 'light' ? <SunIcon /> : <MoonIcon />}
      </IconButton>
    </WithTooltip>
  );
});
