import { useState } from 'react';
import { mergeAttributes, Node } from '@tiptap/core';
import {
  ReactNodeViewRenderer,
  NodeViewContent,
  NodeViewWrapper,
} from '@tiptap/react';
import { Button } from '../../../';

const Component = (props) => {
  const [count, setCount] = useState(props.node.attrs.count);

  const increase = () => {
    setCount(count + 1);
  };

  return (
    <NodeViewWrapper className="react-component">
      <label contentEditable={false}>React Component</label>
      <NodeViewContent className="content is-editable" />
      <div className="content" contentEditable={false}>
        <Button onClick={increase}>
          This button has been clicked {count} times.
        </Button>
      </div>
    </NodeViewWrapper>
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
  renderHTML({ HTMLAttributes }) {
    return ['counter', mergeAttributes(HTMLAttributes)];
  },
  addNodeView() {
    return ReactNodeViewRenderer(Component);
  },
});
/* c8 ignore end */
