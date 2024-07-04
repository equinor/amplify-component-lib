import { TypographyVariants } from '@equinor/eds-core-react/dist/types/components/Typography/Typography.tokens';
import Heading from '@tiptap/extension-heading';
import {
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from '@tiptap/react';

import { Typography } from '../../../';

const Component = (props: any) => {
  const level = props.node.attrs.level;
  let variant: TypographyVariants = 'h1';
  if (level === 2) variant = 'h2';
  if (level === 3) variant = 'h3';
  if (level === 4) variant = 'h4';
  if (level === 5) variant = 'h5';
  if (level === 6) variant = 'h6';
  return (
    <NodeViewWrapper>
      <Typography variant={variant}>
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
