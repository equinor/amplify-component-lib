import { FC } from 'react';

import { CircularProgress } from '@equinor/eds-core-react';
import {
  ReleaseNotesService,
  useReleaseNotesQuery,
} from '@equinor/subsurface-app-management';

import { Header } from './Header/Header';
import {
  AllReleaseNotesWrapper,
  LoadingWrapper,
  StyledDialog,
} from './ReleaseNotesDialog.styles';
import { usePrefetchRichTextImages } from 'src/atoms';
import { Button } from 'src/molecules';
import { ReleaseNote } from 'src/organisms/ReleaseNote/ReleaseNote';
import { Status } from 'src/organisms/Status';
import { useReleaseNotes } from 'src/providers/ReleaseNotesProvider';

interface ReleaseNotesDialogProps {
  enabled?: boolean;
}

export const ReleaseNotesDialog: FC<ReleaseNotesDialogProps> = ({
  enabled,
}) => {
  const { setOpen, open, mostRecentReleaseNote, showAllReleaseNotesLink } =
    useReleaseNotes();
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
          <ReleaseNote {...mostRecentReleaseNote} startExpanded />
          <AllReleaseNotesWrapper>
            <Button
              variant="ghost"
              href={showAllReleaseNotesLink}
              target="_blank"
            >
              See all release notes in SAM
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
