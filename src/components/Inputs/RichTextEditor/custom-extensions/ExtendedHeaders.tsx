import { useState } from 'react';
import { mergeAttributes, Node } from '@tiptap/core';
import {
  ReactNodeViewRenderer,
  NodeViewContent,
  NodeViewWrapper,
} from '@tiptap/react';
import { Button, Divider, Icon, Typography } from '../../../';
import Heading from '@tiptap/extension-heading';

const Component = (props) => {
  return (
    <NodeViewWrapper>
      <Typography variant="h1">
        <NodeViewContent className="content is-editable" />
      </Typography>
    </NodeViewWrapper>
  );
};

/* c8 ignore start */
export default Heading.extend({
  content: 'inline*',
  addNodeView() {
    return ReactNodeViewRenderer(Component);
  },
});
/* c8 ignore end */
