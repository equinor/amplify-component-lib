import { FC, MouseEvent, ReactNode, useMemo, useRef, useState } from 'react';

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

import { environment } from '../../../../utils';
import {
  amplify_small_portal,
  amplify_tutorials,
} from '../../../Icons/AmplifyIcons';
import { EnvironmentType } from '../TopBar';
import { TopBarButton } from '../TopBar.styles';
import PortalTransit from './ApplicationTransit/PortalTransit';
import Feedback from './Feedback/Feedback';
import ReleaseNotes from './ReleaseNotesDialog/ReleaseNotes';
import Tutorial, { tutorialOptions } from './Tutorials/TutorialDialog';
import { PORTAL_URL } from 'src/components/Navigation/TopBar/ApplicationDrawer/ApplicationDrawer';
import { FeedbackType } from 'src/components/Navigation/TopBar/Resources/Feedback/Feedback.types';
import ResourceMenuItem from 'src/components/Navigation/TopBar/Resources/ResourceMenuItem';
import TopBarMenu from 'src/components/Navigation/TopBar/TopBarMenu';
import { useReleaseNotes } from 'src/providers/ReleaseNotesProvider';
import { spacings } from 'src/style';

import styled from 'styled-components';

const { colors } = tokens;
const { getEnvironmentName } = environment;

const FeedbackFormDialog = styled(Dialog)`
  width: fit-content;
`;

const BackButton = styled.div`
  padding-top: ${spacings.medium};
`;

type ResourceSection = 'learn-more' | 'feedback';

export interface ResourcesProps {
  field?: string;
  hideFeedback?: boolean;
  hideReleaseNotes?: boolean;
  children?: ReactNode;
  tutorialOptions?: tutorialOptions[];
  hasChildren?: boolean;
}

export const Resources: FC<ResourcesProps> = ({
  field,
  hideFeedback = false,
  hideReleaseNotes = false,
  children,
  hasChildren = false,
  tutorialOptions,
}) => {
  const { open: showReleaseNotes, toggle: toggleReleaseNotes } =
    useReleaseNotes();
  const [isOpen, setIsOpen] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [openPortal, setOpenPortal] = useState(false);
  const [openTutorials, setOpenTutorials] = useState(false);
  const [showingResourceSection, setShowingResourceSection] = useState<
    ResourceSection | undefined
  >(undefined);

  const buttonRef = useRef<HTMLDivElement | null>(null);
  const goToUrl = useRef<string | undefined>(undefined);

  const [feedbackType, setFeedbackType] = useState<FeedbackType | undefined>(
    undefined
  );

  const environmentName = getEnvironmentName(
    import.meta.env.VITE_ENVIRONMENT_NAME
  );

  const environmentNameWithoutLocalHost =
    environmentName === EnvironmentType.LOCALHOST
      ? EnvironmentType.DEVELOP
      : environmentName;

  const closeMenu = () => {
    setShowingResourceSection(undefined);
    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleOnOpenFeedbackDialog = (event?: MouseEvent<HTMLDivElement>) => {
    setFeedbackType(event?.currentTarget.id as FeedbackType);
    setShowFeedbackDialog(true);
  };

  const handleOnCloseFeedbackDialog = () => setFeedbackType(undefined);

  const handleGoBack = () => setShowingResourceSection(undefined);

  const handleFeedbackClick = () => setShowingResourceSection('feedback');
  const handleLearnMoreClick = () => setShowingResourceSection('learn-more');

  const handlePortalClick = () => setOpenPortal(true);

  const handleTutorialClick = () => setOpenTutorials((prev) => !prev);

  const handleMoreAccess = () => {
    goToUrl.current = `https://client-amplify-portal-${environmentNameWithoutLocalHost}.radix.equinor.com/dashboard`;
  };

  const resourceSectionContent = useMemo(() => {
    switch (showingResourceSection) {
      case 'learn-more':
        return (
          <>
            <ResourceMenuItem
              text="Open Application portal"
              icon={amplify_small_portal}
              onClick={handlePortalClick}
              lastItem
            />
            <ResourceMenuItem
              text="Tutorials"
              icon={amplify_tutorials}
              onClick={handleTutorialClick}
              lastItem
            />
            {/*// TODO: Remove children when PWEX has change layout in topbar */}
            {hasChildren && !hideFeedback && !hideReleaseNotes && (
              <Divider style={{ margin: 0 }} />
            )}
            {hasChildren && <div onClick={closeMenu}>{children}</div>}
            <BackButton>
              <Button variant="outlined" onClick={handleGoBack}>
                <Icon data={arrow_back} /> Back
              </Button>
            </BackButton>
          </>
        );
      case 'feedback':
        return (
          <>
            <ResourceMenuItem
              id={FeedbackType.BUG}
              onClick={handleOnOpenFeedbackDialog}
              icon={report_bug}
              text="Report a bug"
              lastItem
            />
            <ResourceMenuItem
              id={FeedbackType.SUGGESTION}
              onClick={handleOnOpenFeedbackDialog}
              icon={move_to_inbox}
              text="Suggest a idea"
              lastItem
            />
            <BackButton>
              <Button variant="outlined" onClick={handleGoBack}>
                <Icon data={arrow_back} /> Back
              </Button>
            </BackButton>
          </>
        );
      default:
        return null;
    }
  }, [
    children,
    hasChildren,
    hideFeedback,
    hideReleaseNotes,
    showingResourceSection,
  ]);

  return (
    <>
      <TopBarButton
        variant="ghost_icon"
        ref={buttonRef}
        id="anchor-match"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="menu-match"
        onClick={toggleMenu}
        $isSelected={isOpen}
      >
        <Icon
          data={help_outline}
          color={colors.interactive.primary__resting.rgba}
        />
      </TopBarButton>

      <TopBarMenu
        open={isOpen && !showReleaseNotes && !showFeedbackDialog}
        title="Resources"
        onClose={closeMenu}
        anchorEl={buttonRef.current}
      >
        {resourceSectionContent ? (
          resourceSectionContent
        ) : (
          <>
            {!hideReleaseNotes && (
              <ResourceMenuItem
                id="release-notes"
                icon={file_description}
                onClick={toggleReleaseNotes}
                text="Open release notes"
              />
            )}

            {!hideFeedback && (
              <ResourceMenuItem
                text="Submit feedback"
                icon={thumbs_up_down}
                onClick={handleFeedbackClick}
              />
            )}

            <ResourceMenuItem
              text="Learn more"
              icon={info_circle}
              onClick={handleLearnMoreClick}
            />
          </>
        )}
      </TopBarMenu>
      {openTutorials && tutorialOptions && (
        <Tutorial
          options={tutorialOptions}
          open={openTutorials}
          onClose={handleTutorialClick}
        />
      )}
      {showReleaseNotes && <ReleaseNotes />}
      {!hideFeedback && feedbackType !== undefined && (
        <FeedbackFormDialog
          open={
            feedbackType === FeedbackType.BUG ||
            feedbackType === FeedbackType.SUGGESTION
          }
          onClose={handleOnCloseFeedbackDialog}
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
            onClose={handleOnCloseFeedbackDialog}
          />
        </FeedbackFormDialog>
      )}

      {openPortal && (
        <PortalTransit
          onClose={handlePortalClick}
          url={PORTAL_URL}
          applicationName="Portal"
        />
      )}
    </>
  );
};
