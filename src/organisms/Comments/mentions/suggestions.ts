import { Editor, posToDOMRect, ReactRenderer } from '@tiptap/react';
import { SuggestionKeyDownProps, SuggestionProps } from '@tiptap/suggestion';

import {
  MentionList,
  MentionListRef,
} from 'src/organisms/Comments/mentions/MentionList';

export const updatePosition = (editor: Editor, element: HTMLElement) => {
  const referenceRect = posToDOMRect(
    editor.view,
    editor.state.selection.from,
    editor.state.selection.to
  );

  element.style.width = 'max-content';
  element.style.position = 'absolute';

  const { width: elementWidth, height: elementHeight } =
    element.getBoundingClientRect();
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = document.documentElement.clientHeight;

  // Default placement: bottom-start
  let left = referenceRect.left;
  let top = referenceRect.bottom;

  // Flip vertically when there is not enough space below but enough above
  const spaceBelow = viewportHeight - referenceRect.bottom;
  const spaceAbove = referenceRect.top;
  if (elementHeight > spaceBelow && elementHeight <= spaceAbove) {
    top = referenceRect.top - elementHeight;
  }

  // Shift horizontally to keep the element within the viewport
  if (left + elementWidth > viewportWidth) {
    left = viewportWidth - elementWidth;
  }
  if (left < 0) {
    left = 0;
  }

  element.style.left = `${left + window.scrollX}px`;
  element.style.top = `${top + window.scrollY}px`;
};

export const getSuggestions = (users: string[], zIndex: number | undefined) => [
  {
    items: ({ query }: { query: string }) => {
      return users
        .filter((user) => user.toLowerCase().startsWith(query.toLowerCase()))
        .slice(0, 3);
    },

    render: () => {
      let component: ReactRenderer<MentionListRef, SuggestionProps<string>>;

      return {
        onStart: (props: SuggestionProps<string>) => {
          component = new ReactRenderer(MentionList, {
            props,
            editor: props.editor,
          });

          if (!props.clientRect) {
            return;
          }

          component.element.style.position = 'absolute';
          if (zIndex !== undefined) {
            component.element.style.zIndex = String(zIndex + 1);
          }

          document.body.appendChild(component.element);

          updatePosition(props.editor, component.element);
        },

        onUpdate(props: SuggestionProps<string>) {
          component.updateProps(props);

          if (!props.clientRect) {
            return;
          }

          updatePosition(props.editor, component.element);
        },

        onKeyDown(props: SuggestionKeyDownProps) {
          if (props.event.key === 'Escape') {
            component.destroy();

            return true;
          }

          return component.ref?.onKeyDown(props) ?? false;
        },

        onExit() {
          component.destroy();
        },
      };
    },
  },
];
