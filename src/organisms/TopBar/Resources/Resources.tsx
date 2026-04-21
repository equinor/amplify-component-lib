import {
  FC,
  MouseEvent,
  ReactElement,
  ReactNode,
  RefObject,
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
} from '@equinor/eds-icons';

import { TopBarButton } from '../TopBar.styles';
import { TopBarMenu } from '../TopBarMenu';
import { TransferToAppDialog } from '../TransferToAppDialog';
import { Feedback } from './Feedback/Feedback';
import { FeedbackType } from './Feedback/Feedback.types';
import { ResourceMenuItem } from './ResourceMenuItem';
import { amplify_resources, amplify_small_portal } from 'src/atoms/icons';
import { spacings } from 'src/atoms/style';
import { environment } from 'src/atoms/utils';
import { ReleaseNotesDialog } from 'src/organisms/TopBar/Resources/ReleaseNotesDialog/ReleaseNotesDialog';
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
  hideFeedback?: boolean;
  hideReleaseNotes?: boolean;
  hideLearnMore?: boolean;
  children?: ReactNode;
  customButton?: (
    ref: RefObject<HTMLButtonElement | null>,
    onToggle: () => void
  ) => ReactElement;
}

export const Resources: FC<ResourcesProps> = ({
  hideFeedback = false,
  hideReleaseNotes = false,
  hideLearnMore = false,
  children,
  customButton,
}) => {
  const { open: showReleaseNotes, setOpen: setOpenReleaseNotes } =
    useReleaseNotes();
  const [isOpen, setIsOpen] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [openPortal, setOpenPortal] = useState(false);
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

  const handleOnOpenReleaseNoteDialog = () => {
    setOpenReleaseNotes(true);
    closeMenu();
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
  }, [children, hideFeedback, hideReleaseNotes, showingResourceSection]);

  return (
    <>
      {customButton ? (
        customButton(buttonRef, toggleMenu)
      ) : (
        <TopBarButton
          variant="ghost_icon"
          ref={buttonRef}
          id="anchor-match"
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-controls="menu-match"
          onClick={toggleMenu}
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
          <section>
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
                onClick={handleOnOpenReleaseNoteDialog}
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
          </section>
        )}
      </TopBarMenu>
      {showReleaseNotes && <ReleaseNotesDialog />}
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
