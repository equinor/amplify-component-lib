export { default as CommentField } from './CommentField/CommentField';

export { ExpandingIconButton } from './ExpandingIconButton/ExpandingIconButton';

import {
  Label as EDSLabel,
  Popover as EDSPopover,
} from '@equinor/eds-core-react';

/*
 * @deprecated Popover is deprecated in ACL, if still need please import directly from EDS
 */
const Popover = EDSPopover;
/*
 * @deprecated Label is deprecated in ACL, if still need please import directly from EDS
 */
const Label = EDSLabel;
export { Popover, Label };
export { default as EditableField } from './EditableField';
export { default as StatusChip } from './Workflow/StatusChip';
export { default as WorkflowDescription } from './Workflow/WorkflowDescription';
export { default as WorkflowStatusBar } from './Workflow/WorkflowStatusBar';
export { default as DataCard } from './DataCard';
export { default as HeaderDrawer } from './HeaderDrawer';
export { default as MultiSelectDrawer } from './MultiSelectDrawer';
export { default as SingleSelectDrawer } from './SingleSelectDrawer';
export { default as IconToggleButton } from './IconToggleButton';
export { default as Tutorial } from './Tutorial/Tutorial';
export { HighlightBlocks } from './Tutorial/HighlightBlocks/HighlightBlocks';
