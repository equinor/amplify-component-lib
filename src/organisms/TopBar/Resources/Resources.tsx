import {
  FC,
  MouseEvent,
  MutableRefObject,
  ReactElement,
  ReactNode,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Button, Dialog, Divider, Icon } from '@equinor/eds-core-react';
import {
  arrow_back,
  file_description,
  lightbulb,
  report_bug,
  school,
  youtube_alt,
} from '@equinor/eds-icons';

import { TopBarButton } from '../TopBar.styles';
import { TopBarMenu } from '../TopBarMenu';
import { TransferToAppDialog } from '../TransferToAppDialog';
import { Feedback } from './Feedback/Feedback';
import { FeedbackType } from './Feedback/Feedback.types';
import { ReleaseNotes } from './ReleaseNotesDialog/ReleaseNotes';
import {
  TutorialInfoDialog,
  tutorialOptions,
} from './Tutorials/TutorialInfoDialog';
import { ResourceMenuItem } from './ResourceMenuItem';
import { amplify_resources, amplify_small_portal } from 'src/atoms/icons';
import { spacings } from 'src/atoms/style';
import { environment } from 'src/atoms/utils';
import { useReleaseNotes } from 'src/providers/ReleaseNotesProvider';

import styled from 'styled-components';

const { PORTAL_URL_WITHOUT_LOCALHOST } = environment;

const FeedbackFormDialog = styled(Dialog)`
  width: fit-content;
`;

const BackButton = styled.div`
  padding: ${spacings.medium} ${spacings.medium} ${spacings.small}
    ${spacings.medium};
`;

type ResourceSection = 'learn-more' | 'feedback';

export interface ResourcesProps {
  field?: string;
  hideFeedback?: boolean;
  hideReleaseNotes?: boolean;
  hideLearnMore?: boolean;
  children?: ReactNode;
  showTutorials?: boolean;
  tutorialOptions?: tutorialOptions[];
  customButton?: (
    ref: MutableRefObject<HTMLButtonElement | null>,
    onToggle: () => void
  ) => ReactElement;
}

export const Resources: FC<ResourcesProps> = ({
  field,
  hideFeedback = false,
  hideReleaseNotes = false,
  hideLearnMore = false,
  children,
  tutorialOptions,
  showTutorials,
  customButton,
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

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [feedbackType, setFeedbackType] = useState<FeedbackType | undefined>(
    undefined
  );

  const closeMenu = () => {
    setShowingResourceSection(undefined);
    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleOnOpenFeedbackDialog = (event?: MouseEvent<HTMLDivElement>) => {
    setFeedbackType(event?.currentTarget.id as FeedbackType);
    setShowFeedbackDialog(true);
  };

  const handleOnCloseFeedbackDialog = () => {
    setFeedbackType(undefined);
    closeMenu();
    setShowFeedbackDialog(false);
  };

  const handleGoBack = () => setShowingResourceSection(undefined);

  const handleLearnMoreClick = () => setShowingResourceSection('learn-more');

  const handleOnOpenPortal = () => {
    setOpenPortal(true);
  };

  const handleOnClosePortal = () => {
    setOpenPortal(false);
    closeMenu();
  };

  const handleOnOpenTutorialDialog = () => {
    setOpenTutorials(true);
  };

  const handleOnCloseTutorialDialog = () => {
    setOpenTutorials(false);
    closeMenu();
  };

  const resourceSectionContent = useMemo(() => {
    switch (showingResourceSection) {
      case 'learn-more':
        return (
          <>
            <ResourceMenuItem
              text="Open Application portal"
              icon={amplify_small_portal}
              onClick={handleOnOpenPortal}
              isHref
            />
            {showTutorials && (
              <ResourceMenuItem
                text="Tutorials"
                icon={youtube_alt}
                onClick={handleOnOpenTutorialDialog}
                lastItem
              />
            )}

            {/*// TODO: Remove children when PWEX has change layout in topbar */}
            {children && !hideFeedback && !hideReleaseNotes && (
              <Divider style={{ margin: 0 }} />
            )}
            {children && <div onClick={closeMenu}>{children}</div>}
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
    hideFeedback,
    hideReleaseNotes,
    showTutorials,
    showingResourceSection,
  ]);

  return (
    <>
      {customButton ? (
        customButton(buttonRef, toggleMenu)
      ) : (
        <TopBarButton
          variant="ghost"
          ref={buttonRef}
          id="anchor-match"
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-controls="menu-match"
          onClick={toggleMenu}
          $isSelected={isOpen}
        >
          <Icon data={amplify_resources} />
        </TopBarButton>
      )}

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
              icon={lightbulb}
              text="Suggest idea"
              lastItem
            />
            {!hideReleaseNotes && (
              <ResourceMenuItem
                id="release-notes"
                icon={file_description}
                onClick={toggleReleaseNotes}
                text="Open release notes"
                isHref
              />
            )}

            {!hideLearnMore && (
              <ResourceMenuItem
                text="Learn more"
                icon={school}
                onClick={handleLearnMoreClick}
              />
            )}
          </>
        )}
      </TopBarMenu>
      {openTutorials && tutorialOptions && (
        <TutorialInfoDialog
          options={tutorialOptions}
          open={openTutorials}
          onClose={handleOnCloseTutorialDialog}
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
        <TransferToAppDialog
          onClose={handleOnClosePortal}
          url={PORTAL_URL_WITHOUT_LOCALHOST}
          applicationName="Portal"
        />
      )}
    </>
  );
};
