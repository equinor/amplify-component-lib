import { FC, MouseEvent, ReactNode, useRef, useState } from 'react';

import { Button, Dialog, Divider, Icon } from '@equinor/eds-core-react';
import {
  file_description,
  help_outline,
  move_to_inbox,
  report_bug,
} from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import Feedback from './Feedback/Feedback';
import ReleaseNotes from './ReleaseNotesDialog/ReleaseNotes';
import { FeedbackType } from 'src/components/Navigation/TopBar/Help/Feedback/Feedback.types';
import HelpMenuItem from 'src/components/Navigation/TopBar/Help/HelpMenuItem';
import TopBarMenu from 'src/components/Navigation/TopBar/TopBarMenu';
import { useReleaseNotes } from 'src/providers/ReleaseNotesProvider';

import styled from 'styled-components';

const { colors, spacings } = tokens;

const FeedbackFormDialog = styled(Dialog)`
  width: fit-content;
`;

const ContentWrapper = styled.div`
  padding: 0 ${spacings.comfortable.medium};
`;

export interface HelpProps {
  field?: string;
  hideFeedback?: boolean;
  hideReleaseNotes?: boolean;
  children?: ReactNode;
}

export const Help: FC<HelpProps> = ({
  field,
  hideFeedback = false,
  hideReleaseNotes = false,
  children,
}) => {
  const { open: showReleaseNotes, toggle: toggleReleaseNotes } =
    useReleaseNotes();
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const [feedbackType, setFeedbackType] = useState<FeedbackType | undefined>(
    undefined
  );
  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const handleOnFeedbackClick = (event?: MouseEvent<HTMLDivElement>) => {
    setFeedbackType(event?.currentTarget.id as FeedbackType);
    closeMenu();
  };

  const handleOnReleaseNotesClick = () => {
    toggleReleaseNotes();
    closeMenu();
  };

  const handleOnDialogClose = () => {
    setFeedbackType(undefined);
  };

  return (
    <>
      <Button
        variant="ghost_icon"
        ref={buttonRef}
        id="anchor-match"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="menu-match"
        onClick={toggleMenu}
      >
        <Icon
          data={help_outline}
          color={colors.interactive.primary__resting.rgba}
        />
      </Button>

      <TopBarMenu
        open={isOpen}
        title="Help"
        onClose={closeMenu}
        anchorEl={buttonRef.current}
      >
        {!hideReleaseNotes && (
          <HelpMenuItem
            id="release-notes"
            icon={file_description}
            onClick={handleOnReleaseNotesClick}
            text="Release notes"
          />
        )}
        {!hideFeedback && (
          <>
            <HelpMenuItem
              id={FeedbackType.BUG}
              onClick={handleOnFeedbackClick}
              icon={report_bug}
              text="Report a bug"
            />
            <HelpMenuItem
              id={FeedbackType.SUGGESTION}
              onClick={handleOnFeedbackClick}
              icon={move_to_inbox}
              text="Suggest a feature"
            />
          </>
        )}
        {children && !hideFeedback && !hideReleaseNotes && (
          <Divider style={{ margin: 0 }} />
        )}
        {children && (
          <ContentWrapper onClick={closeMenu}>{children}</ContentWrapper>
        )}
      </TopBarMenu>
      {showReleaseNotes && <ReleaseNotes />}
      {!hideFeedback && feedbackType !== undefined && (
        <FeedbackFormDialog
          open={
            feedbackType === FeedbackType.BUG ||
            feedbackType === FeedbackType.SUGGESTION
          }
          onClose={handleOnDialogClose}
          isDismissable={true}
        >
          <Dialog.Header>
            {feedbackType === FeedbackType.BUG
              ? 'Report a bug - ServiceNow'
              : 'Suggest a feature'}
          </Dialog.Header>
          <Feedback
            field={field}
            selectedType={feedbackType}
            onClose={handleOnDialogClose}
          />
        </FeedbackFormDialog>
      )}
    </>
  );
};
