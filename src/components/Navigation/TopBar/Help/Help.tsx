import { FC, MouseEvent, ReactNode, useRef, useState } from 'react';

import { Button, Dialog, Divider, Icon } from '@equinor/eds-core-react';
import {
  file_description,
  help_outline,
  move_to_inbox,
  report_bug,
} from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import FeedbackForm from './FeedbackForm/FeedbackForm';
import { FeedbackEnum } from 'src/components/Navigation/TopBar/Help/FeedbackForm/FeedbackForm.types';
import HelpMenuItem from 'src/components/Navigation/TopBar/Help/HelpMenuItem';
import TopBarMenu from 'src/components/Navigation/TopBar/TopBarMenu';

import styled from 'styled-components';

const { colors, spacings } = tokens;

const FeedbackFormDialog = styled(Dialog)`
  width: fit-content;
`;

const ContentWrapper = styled.div`
  padding: 0 ${spacings.comfortable.medium};
`;

export interface HelpProps {
  applicationName: string;
  hideFeedback?: boolean;
  hideReleaseNotes?: boolean;
  children?: ReactNode;
}

export const Help: FC<HelpProps> = ({
  applicationName,
  hideFeedback = false,
  hideReleaseNotes = false,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const [feedbackType, setFeedbackType] = useState<FeedbackEnum | undefined>(
    undefined
  );
  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const handleOnFeedbackClick = (event?: MouseEvent<HTMLDivElement>) => {
    setFeedbackType(event?.currentTarget.id as FeedbackEnum);
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
          color={colors.interactive.primary__resting.hsla}
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
            onClick={closeMenu}
            icon={file_description}
            text="Release notes"
            href={`https://amplify.equinor.com/releasenotes?applications=%5B"${applicationName}"%5D`}
          />
        )}
        {!hideFeedback && (
          <>
            <HelpMenuItem
              id={FeedbackEnum.BUG}
              onClick={handleOnFeedbackClick}
              icon={report_bug}
              text="Report a bug"
            />
            <HelpMenuItem
              id={FeedbackEnum.SUGGESTION}
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
      {!hideFeedback && feedbackType !== undefined && (
        <FeedbackFormDialog
          open={
            feedbackType === FeedbackEnum.BUG ||
            feedbackType === FeedbackEnum.SUGGESTION
          }
          onClose={handleOnDialogClose}
          isDismissable={true}
        >
          <Dialog.Header>
            {feedbackType === FeedbackEnum.BUG
              ? 'Report a bug'
              : 'Suggest a feature'}
          </Dialog.Header>
          <FeedbackForm
            selectedType={feedbackType}
            onClose={handleOnDialogClose}
          />
        </FeedbackFormDialog>
      )}
    </>
  );
};
