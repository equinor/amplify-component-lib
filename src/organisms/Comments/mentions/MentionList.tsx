import React, { Ref, useEffect, useImperativeHandle, useState } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { SuggestionKeyDownProps, SuggestionProps } from '@tiptap/suggestion';

import { DropDown, NoResult } from './MentionList.styles.ts';
import { User } from 'src/organisms/Comments/Comments.tsx';

interface MentionListProps extends SuggestionProps<User> {
  loading?: boolean;
  ref?: Ref<MentionListRef>;
}

export interface MentionListRef {
  onKeyDown: (props: SuggestionKeyDownProps) => boolean;
}

export const MentionList = (props: MentionListProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item: User = props.items[index];

    if (item) {
      props.command({ id: item.displayName });
    }
  };

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + props.items.length - 1) % props.items.length
    );
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(props.ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === 'ArrowUp') {
        upHandler();
        return true;
      }

      if (event.key === 'ArrowDown') {
        downHandler();
        return true;
      }

      if (event.key === 'Enter') {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  return (
    <DropDown>
      {props.items.length ? (
        props.items.map((item: User, index: number) => (
          <button key={index} onClick={() => selectItem(index)}>
            <Typography variant="menu_title" group="navigation">
              {item.displayName}
            </Typography>
          </button>
        ))
      ) : (
        <NoResult>
          <Typography variant="menu_title" group="navigation">
            No result
          </Typography>
        </NoResult>
      )}
    </DropDown>
  );
};
