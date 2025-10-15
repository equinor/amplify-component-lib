import { FC } from 'react';

import { CircularProgress } from '@equinor/eds-core-react';
import {
  ReleaseNotesService,
  useReleaseNotesQuery,
} from '@equinor/subsurface-app-management';
import { Link } from '@tanstack/react-router';

import { Header } from './Header/Header';
import {
  AllReleaseNotesWrapper,
  LoadingWrapper,
  StyledDialog,
} from './ReleaseNotesDialog.styles';
import { usePrefetchRichTextImages } from 'src/atoms';
import { Button } from 'src/molecules/Button/Button';
import { ReleaseNote } from 'src/organisms/ReleaseNote/ReleaseNote';
import { Status } from 'src/organisms/Status';
import { useReleaseNotes } from 'src/providers/ReleaseNotesProvider';

interface ReleaseNotesDialogProps {
  enabled?: boolean;
}

export const ReleaseNotesDialog: FC<ReleaseNotesDialogProps> = ({
  enabled,
}) => {
  const { setOpen, open, mostRecentReleaseNote } = useReleaseNotes();
  const { isLoading } = useReleaseNotesQuery({ enabled });
  const { isPrefetching } = usePrefetchRichTextImages({
    richTextValues: mostRecentReleaseNote?.body
      ? [mostRecentReleaseNote.body]
      : [],
    onImageRead: ReleaseNotesService.getReleaseNoteImage,
  });

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <StyledDialog open={open} onClose={handleCloseModal} isDismissable>
      <Header />
      {isLoading || isPrefetching ? (
        <LoadingWrapper>
          <CircularProgress />
        </LoadingWrapper>
      ) : mostRecentReleaseNote ? (
        <>
          <ReleaseNote {...mostRecentReleaseNote} expanded />
          <AllReleaseNotesWrapper>
            <Button
              as={Link}
              variant="ghost"
              to="/release-notes"
              onClick={handleCloseModal}
            >
              See all release notes
            </Button>
          </AllReleaseNotesWrapper>
        </>
      ) : (
        <Status>
          <Status.Title title="No published release notes" />
          <Status.Description text="This application has no published release notes yet." />
        </Status>
      )}
    </StyledDialog>
  );
};
