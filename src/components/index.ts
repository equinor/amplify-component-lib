export { Chip } from './DataDisplay/Chip/Chip';
export { default as DataCard } from './DataDisplay/DataCard';
export { default as HeaderDrawer } from './DataDisplay/HeaderDrawer';
export { default as InfoElement } from 'src/components/DataDisplay/InfoElement/InfoElement';
export { default as OptionalTooltip } from './DataDisplay/OptionalTooltip';
export type { ProfileAvatarProps } from './DataDisplay/ProfileAvatar';
export { default as ProfileAvatar } from './DataDisplay/ProfileAvatar';
export { default as RichTextDisplay } from './DataDisplay/RichTextDisplay';
export { Table } from './DataDisplay/Table/Table';
export { default as HighlightBlocks } from './DataDisplay/Tutorial/HighlightBlocks/HighlightBlocks';
export type { Step, TutorialProps } from './DataDisplay/Tutorial/Tutorial';
export { default as Tutorial } from './DataDisplay/Tutorial/Tutorial';
export { default as StatusChip } from './DataDisplay/Workflow/StatusChip';
export { default as WorkflowDescription } from './DataDisplay/Workflow/WorkflowDescription';
export { default as WorkflowStatusBar } from './DataDisplay/Workflow/WorkflowStatusBar';
export { default as Feature } from './Feature/Feature';
export { default as AnimatedCheckmark } from './Feedback/AnimatedCheckmark';
export { default as ConfirmationPopup } from './Feedback/ConfirmationPopup';
export { default as ErrorPage } from './Feedback/ErrorPage';
export type { ErrorContentProps } from './Feedback/ErrorPage/ErrorPage';
export { default as GlitchAnimation } from './Feedback/ErrorPage/illustrations/GlitchAnimation';
export { default as QuestioningAnimation } from './Feedback/ErrorPage/illustrations/QuestioningAnimation';
export { default as FileProgress } from './Feedback/FileProgress/FileProgress';
export { default as FullPageSpinner } from './Feedback/FullPageSpinner';
export { default as FullPageStatus } from './Feedback/FullPageStatus';
export { default as PageNotFound } from './Feedback/PageNotFound';
export { default as SkeletonBase } from './Feedback/Skeleton/SkeletonBase/SkeletonBase';
export { skeletonBaseloading } from './Feedback/Skeleton/SkeletonBase/SkeletonBase';
export { default as SkeletonGradient } from './Feedback/Skeleton/SkeletonGradient/SkeletonGradient';
export { default as Stepper } from './Feedback/Stepper/Stepper';
export { Unauthorized } from './Feedback/Unauthorized';
export * from './Icons/AmplifyIcons';
export { default as DataAcquisition } from './Icons/ApplicationIcon/Acquire';
export type { ApplicationName } from './Icons/ApplicationIcon/ApplicationIcon';
export { default as ApplicationIcon } from './Icons/ApplicationIcon/ApplicationIcon';
export {
  acquire,
  dasha,
  fallback,
  fourDInsight,
  inPress,
  loggingQualification,
  orca,
  portal,
  pwex,
  recap,
  premo,
} from './Icons/ApplicationIcon/ApplicationIconCollection';
export { default as DataSharing } from './Icons/ApplicationIcon/Dasha';
export { default as DataExperience } from './Icons/ApplicationIcon/FourDInsight';
export { default as Portal } from './Icons/ApplicationIcon/Portal';
export { default as DataTracker } from './Icons/ApplicationIcon/Recap';
export { default as EquinorLogo } from './Icons/EquinorLogo';
export { default as DefaultIcon } from './Icons/Fallback';
export { default as FeedBackIcon } from './Icons/FeedBackIcon/FeedBackIcon';
export { default as NothingFilled } from './Icons/FeedBackIcon/NegativeFilled';
export { default as NothingOutlined } from './Icons/FeedBackIcon/NegativeOutlined';
export { default as SomethingFilled } from './Icons/FeedBackIcon/PositiveFilled';
export { default as SomethingOutlined } from './Icons/FeedBackIcon/PositiveOutlined';
export { ComboBox } from 'src/components/Inputs/Select/ComboBox/ComboBox';
export { default as CommentField } from './Inputs/CommentField/CommentField';
export { default as NewComment } from './Inputs/CommentField/NewCommentField';
export { default as ContentMenu } from './Inputs/ContentMenu';
export { default as CopyText } from 'src/components/DataDisplay/InfoElement/CopyText';
export { default as EditableField } from './Inputs/EditableField';
export { ExpandingIconButton } from './Inputs/ExpandingIconButton/ExpandingIconButton';
export type { ExpandingIconButtonProps } from './Inputs/ExpandingIconButton/ExpandingIconButton';
export { default as FileUploadArea } from './Inputs/FileUploadArea';
export { default as IconToggleButton } from './Inputs/IconToggleButton';
export { default as RichTextEditor } from './Inputs/RichTextEditor/RichTextEditor';
export { RichTextEditorFeatures } from './Inputs/RichTextEditor/RichTextEditor.types';
export { Search } from './Inputs/Search/Search';
export { default as MultiSelectDrawer } from './Inputs/SelectDrawer/MultiSelectDrawer';
export { default as OptionDrawer } from './Inputs/SelectDrawer/OptionDrawer';
export { default as SingleSelectDrawer } from './Inputs/SelectDrawer/SingleSelectDrawer';
export { default as Filter } from './Inputs/Sieve/Filter';
export { default as Sieve } from './Inputs/Sieve/Sieve';
export type { Option, SieveValue } from './Inputs/Sieve/Sieve.types';
export { default as SingleFilterMenu } from './Inputs/SingleFilterMenu';
export { TextField } from './Inputs/TextField/TextField';
export { TableOfContents } from './Navigation/TableOfContents/TableOfContents';
export type { TableOfContentsProps } from './Navigation/TableOfContents/TableOfContents';
export type { TableOfContentsVariants } from './Navigation/TableOfContents/TableOfContents.types';
export { default as PageWithTitle } from './Navigation/PageWithTitle';
export { default as SelectField } from './Navigation/SelectField/SelectField';
export type { ItemType, SidebarType } from './Navigation/SideBar';
export { default as SideBar } from './Navigation/SideBar';
export type {
  GuidelineSections,
  ISettingsProps,
  TopBarType,
} from './Navigation/TopBar';
export { default as TopBar } from './Navigation/TopBar';
export { default as ResourceMenuItem } from './Navigation/TopBar/Resources/ResourceMenuItem';
export type { ContentProps, TemplateType } from './Template/Template';
export { default as Template } from './Template/Template';
export type {
  SelectOption,
  SelectOptionRequired,
} from './Inputs/Select/Select.types';
export { SingleSelect } from './Inputs/Select/SingleSelect/SingleSelect';
export type { SingleSelectProps } from './Inputs/Select/SingleSelect/SingleSelect';
export type { ComboBoxProps } from 'src/components/Inputs/Select/ComboBox/ComboBox';
export { Badge } from './DataDisplay/Badge/Badge';

// EDS re-exports
export type {
  BreadcrumbProps,
  BreadcrumbsProps,
  ButtonProps,
  CheckboxProps,
  CircularProgressProps,
  DialogActionsProps,
  DialogContentProps,
  DialogHeaderProps,
  DialogProps,
  DialogTitleProps,
  DotProgressProps,
  IconProps,
  LabelProps,
  LinearProgressProps,
  MenuItemProps,
  MenuProps,
  MenuSectionProps,
  PopoverActionsProps,
  PopoverContentProps,
  PopoverHeaderProps,
  PopoverProps,
  PopoverTitleProps,
  RadioProps,
  StarProgressProps,
  SwitchProps,
  TabListProps,
  TabPanelProps,
  TabPanelsProps,
  TabsProps,
  TypographyProps,
  DividerProps,
  CardProps,
} from '@equinor/eds-core-react';
export {
  Breadcrumbs,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  Divider,
  DotProgress,
  Icon,
  LinearProgress,
  Menu,
  Radio,
  StarProgress,
  Switch,
  Tabs,
  Typography,
  Card,
} from '@equinor/eds-core-react';

import {
  Label as EDSLabel,
  Popover as EDSPopover,
} from '@equinor/eds-core-react';

/**
 * @deprecated Being deprecated from amplify-components-library, import directly from EDS if still needed
 */
const Popover = EDSPopover;
/**
 * @deprecated Being deprecated from amplify-components-library, import directly from EDS if still needed
 */
const Label = EDSLabel;

export { Popover, Label };
