import { FC, MouseEvent, ReactNode, useRef, useState } from 'react';

import { Button, Dialog, Divider, Icon } from '@equinor/eds-core-react';
import {
  arrow_back,
  file_description,
  help_outline,
  info_circle,
  move_to_inbox,
  report_bug,
  thumbs_up_down,
} from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import {
  amplify_small_portal,
  amplify_tutorials,
} from '../../../Icons/AmplifyIcons';
import Feedback from './Feedback/Feedback';
import ReleaseNotes from './ReleaseNotesDialog/ReleaseNotes';
import Tutorial from './Tutorials/TutorialDialog';
import PortalTransit from './PortalTransit';
import { FeedbackType } from 'src/components/Navigation/TopBar/Help/Feedback/Feedback.types';
import HelpMenuItem from 'src/components/Navigation/TopBar/Help/HelpMenuItem';
import TopBarMenu from 'src/components/Navigation/TopBar/TopBarMenu';
import { useReleaseNotes } from 'src/providers/ReleaseNotesProvider';

import styled from 'styled-components';

const { colors, spacings } = tokens;

const FeedbackFormDialog = styled(Dialog)`
  width: fit-content;
`;

const PortalDialog = styled(Dialog)`
  width: 400px;
  height: 323px;
`;

const ContentWrapper = styled.div`
  padding: 0 ${spacings.comfortable.medium};
`;

export interface HelpProps {
  hideFeedback?: boolean;
  hideReleaseNotes?: boolean;
  children?: ReactNode;
  tutorialDescription?: string;
  tutorialSteps?: string;
  tutorialDuration?: string;
}

export const Help: FC<HelpProps> = ({
  hideFeedback = false,
  hideReleaseNotes = false,
  children,
  tutorialDescription,
  tutorialDuration,
  tutorialSteps,
}) => {
  const { open: showReleaseNotes, toggle: toggleReleaseNotes } =
    useReleaseNotes();
  const [isOpen, setIsOpen] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [openPortal, setOpenPortal] = useState(false);
  const [openTutorials, setOpenTutorials] = useState(false);

  const buttonRef = useRef<HTMLDivElement | null>(null);

  const [feedbackType, setFeedbackType] = useState<FeedbackType | undefined>(
    undefined
  );
  const closeMenu = () => {
    setIsOpen(false);
    setShowFeedback(false);
    setShowLearnMore(false);
  };

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
    if (openPortal) {
      setOpenPortal(false);
    }
  };

  const handleFeedbackClick = () => {
    if (showFeedback) {
      setShowFeedback(false);
      setShowLearnMore(false);
    } else {
      setShowFeedback(true);
    }
  };

  const handleLearnMoreClick = () => {
    if (showLearnMore) {
      setShowLearnMore(false);
      setShowFeedback(false);
      setOpenTutorials(false);
    } else {
      setShowLearnMore(true);
    }
  };

  const handleOpenPortal = () => {
    setOpenPortal(true);
    setShowLearnMore(false);
    setShowFeedback(false);
    setIsOpen(false);
  };

  const handleOpenTutorials = () => {
    setOpenTutorials(true);
  };

  console.log(openPortal);
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
          color={colors.interactive.primary__resting.hsla}
        />
      </Button>

      <TopBarMenu
        open={isOpen}
        title="Resources"
        onClose={closeMenu}
        anchorEl={buttonRef.current}
      >
        {!hideReleaseNotes && !showFeedback && !showLearnMore && (
          <HelpMenuItem
            id="release-notes"
            icon={file_description}
            onClick={handleOnReleaseNotesClick}
            text="Open release notes"
          />
        )}
        {!hideFeedback && (
          <>
            {!showFeedback && !showLearnMore && (
              <HelpMenuItem
                text="Submit feedback"
                icon={thumbs_up_down}
                onClick={handleFeedbackClick}
              />
            )}

            {showFeedback && (
              <FeedbackItems>
                <HelpMenuItem
                  id={FeedbackType.BUG}
                  onClick={handleOnFeedbackClick}
                  icon={report_bug}
                  text="Report a bug"
                  lastItem
                />
                <HelpMenuItem
                  id={FeedbackType.SUGGESTION}
                  onClick={handleOnFeedbackClick}
                  icon={move_to_inbox}
                  text="Suggest a feature"
                  lastItem
                />
              </FeedbackItems>
            )}
          </>
        )}
        {!showLearnMore && !showFeedback && (
          <HelpMenuItem
            text="Learn more"
            icon={info_circle}
            onClick={handleLearnMoreClick}
          />
        )}
        {openTutorials &&
          tutorialSteps &&
          tutorialDuration &&
          tutorialDescription && (
            <Tutorial
              description={tutorialDescription}
              duration={tutorialDuration}
              steps={tutorialSteps}
            />
          )}
        {showLearnMore && (
          <>
            {!openTutorials && (
              <>
                <HelpMenuItem
                  text="Open Application portal"
                  icon={amplify_small_portal}
                  onClick={handleOpenPortal}
                  lastItem
                />
                <HelpMenuItem
                  text="Active tutorials"
                  icon={amplify_tutorials}
                  onClick={handleOpenTutorials}
                  lastItem
                />
              </>
            )}

            <div style={{ paddingTop: '5px' }}>
              <Button variant="outlined" onClick={handleLearnMoreClick}>
                {' '}
                <Icon data={arrow_back} /> Back{' '}
              </Button>
            </div>
          </>
        )}
        {/*TODO: Remove children ?*/}
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
          <Feedback selectedType={feedbackType} onClose={handleOnDialogClose} />
        </FeedbackFormDialog>
      )}

      {openPortal && (
        <PortalDialog open={openPortal} onClose={handleOnDialogClose}>
          <Dialog.Header> Open link</Dialog.Header>
          <PortalTransit />
        </PortalDialog>
      )}
    </>
  );
};

const FeedbackItems = styled.div``;
