import { FC } from 'react';

import { CircularProgress } from '@equinor/eds-core-react';
import { useReleaseNotesQuery } from '@equinor/subsurface-app-management';

import { Header } from './Header/Header';
import { LoadingWrapper, StyledDialog } from './ReleaseNotes.styles';
import { ReleaseNote } from 'src/organisms';
import { useReleaseNotes } from 'src/providers/ReleaseNotesProvider';

interface ReleaseNotesProps {
  enabled?: boolean;
}

export const ReleaseNotes: FC<ReleaseNotesProps> = ({ enabled }) => {
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
        <div>empty</div>
      )}
    </StyledDialog>
  );
};
