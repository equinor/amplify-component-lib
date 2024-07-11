export { CommentField } from './CommentField/CommentField';

export { ExpandingIconButton } from './ExpandingIconButton/ExpandingIconButton';
export { Feature } from './Feature/Feature';

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
export { EditableField } from './EditableField';
export { Tutorial } from './Tutorial/Tutorial';
export type { Step, TutorialProps } from './Tutorial/Tutorial';
export { HighlightBlocks } from './Tutorial/HighlightBlocks/HighlightBlocks';
export { default as StatusChip } from './Workflow/StatusChip';
export { default as WorkflowDescription } from './Workflow/WorkflowDescription';
export { default as WorkflowStatusBar } from './Workflow/WorkflowStatusBar';
export { ConfirmationPopup } from './ConfirmationPopup';
export { DataCard } from './DataCard';
export { HeaderDrawer } from './HeaderDrawer';
export { default as MultiSelectDrawer } from './MultiSelectDrawer';
export { default as SingleSelectDrawer } from './SingleSelectDrawer';
export { default as IconToggleButton } from './IconToggleButton';
export { useFeatureToggling } from './useFeatureToggling';
