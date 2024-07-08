/* c8 ignore start */ // This entire file is just an example file for future nodeview projects. Testing it is adding maintance cost to something that is not used.
import { useState } from 'react';

import { mergeAttributes, Node } from '@tiptap/core';
import {
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from '@tiptap/react';

import { Button } from '../../../';

import styled from 'styled-components';

const StyledNodeViewWrapper = styled(NodeViewWrapper)`
  display: grid;
  gap: 1rem;
  padding: 2rem 1rem 1.2rem;

  background-color: rgba(88, 5, 255, 0.05);
  border: 2px solid #6a00f5;
  border-radius: 0.5rem;
  position: relative;
  margin: 2rem 0;

  label {
    background-color: #6a00f5;
    border-radius: 0 0 0.5rem 0;
    color: white;
    font-size: 0.75rem;
    font-weight: bold;
    padding: 0.25rem 0.5rem;
    position: absolute;
    top: 0;
  }

  .content {
    padding: 0rem 1rem 1rem;
    border: 2px dashed lightgray;
    border-radius: 0.5rem;
    padding: 0.5rem;
  }
`;

interface TipTapCounter {
  node: {
    attrs: {
      count: number;
    };
  };
}

const Component = (props: TipTapCounter) => {
  const [count, setCount] = useState(props.node.attrs.count);
  return (
    <StyledNodeViewWrapper className="react-component">
      <label contentEditable={false}>React Component</label>
      <NodeViewContent className="content" />
      <Button onClick={() => setCount(count + 1)}>
        This button has been clicked {count} times.
      </Button>
    </StyledNodeViewWrapper>
  );
};

/* c8 ignore start */
export default Node.create({
  name: 'counter',
  group: 'block',
  //atom: true,
  content: 'inline*',
  addAttributes() {
    return {
      count: {
        default: 0,
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'counter',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['counter', mergeAttributes(HTMLAttributes)];
  },
  addKeyboardShortcuts() {
    return {
      'Mod-Enter': () => {
        return this.editor
          .chain()
          .insertContentAt(this.editor.state.selection.head, {
            type: this.type.name,
          })
          .focus()
          .run();
      },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(Component);
  },
});
/* c8 ignore end */
