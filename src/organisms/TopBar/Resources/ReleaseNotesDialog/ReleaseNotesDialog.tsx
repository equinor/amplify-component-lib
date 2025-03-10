import { FC } from 'react';

import { CircularProgress } from '@equinor/eds-core-react';
import { useReleaseNotesQuery } from '@equinor/subsurface-app-management';

import { Header } from './Header/Header';
import { LoadingWrapper, StyledDialog } from './ReleaseNotesDialog.styles';
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

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <StyledDialog open={open} onClose={handleCloseModal} isDismissable>
      <Header />
      {isLoading ? (
        <LoadingWrapper>
          <CircularProgress />
        </LoadingWrapper>
      ) : mostRecentReleaseNote ? (
        <ReleaseNote {...mostRecentReleaseNote} startExpanded />
      ) : (
        <Status>
          <Status.Title title="No published release notes" />
          <Status.Description text="This application has no published release notes yet." />
        </Status>
      )}
    </StyledDialog>
  );
};
