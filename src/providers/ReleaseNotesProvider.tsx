import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  ReleaseNote,
  useReleaseNotesQuery,
} from '@equinor/subsurface-app-management';

import { useLocalStorage } from 'src/atoms/hooks/useLocalStorage';
import { usingReleaseNoteDate } from 'src/organisms/ReleaseNote/ReleaseNote.utils';
import { sortReleaseNotesByDate } from 'src/providers/ReleaseNotesProvider.utils';

interface ReleaseNotesContextState {
  open: boolean;
  setOpen: (open: boolean) => void;
  mostRecentReleaseNote: ReleaseNote | undefined;
}

const ReleaseNotesContext = createContext<ReleaseNotesContextState | undefined>(
  undefined
);

export const useReleaseNotes = (): ReleaseNotesContextState => {
  const context = useContext(ReleaseNotesContext);
  if (context === undefined) {
    throw new Error(
      'useReleaseNotes must be used within a ReleaseNotesProvider'
    );
  }
  return context;
};

const TWO_WEEKS_IN_MS = 1000 * 60 * 60 * 24 * 14;
const RELEASE_NOTES_WAS_VIEWED_KEY = 'release-notes-was-viewed-key';

interface ReleaseNotesContextProviderProps {
  children: ReactNode;
  enabled?: boolean;
  popUpNewReleaseNote?: boolean;
}

export const ReleaseNotesProvider: FC<ReleaseNotesContextProviderProps> = ({
  children,
  enabled,
  popUpNewReleaseNote = false,
}) => {
  const { data } = useReleaseNotesQuery({ enabled });
  const [open, setOpen] = useState(false);
  const [lastSeenReleaseId, setLastSeenReleaseId] = useLocalStorage(
    RELEASE_NOTES_WAS_VIEWED_KEY,
    '',
    TWO_WEEKS_IN_MS
  );

  const mostRecentReleaseNote = data?.toSorted(sortReleaseNotesByDate).at(0);

  useEffect(() => {
    if (!mostRecentReleaseNote || !popUpNewReleaseNote) return;

    const recentReleaseNoteDate = new Date(
      usingReleaseNoteDate(mostRecentReleaseNote)
    ).getTime();
    const nowInMs = Date.now();
    const timeSinceLastReleaseInMs = nowInMs - recentReleaseNoteDate;
    if (
      timeSinceLastReleaseInMs <= TWO_WEEKS_IN_MS &&
      lastSeenReleaseId !== mostRecentReleaseNote.releaseId
    ) {
      setOpen(true);
      setLastSeenReleaseId(mostRecentReleaseNote.releaseId);
    }
  }, [
    lastSeenReleaseId,
    mostRecentReleaseNote,
    popUpNewReleaseNote,
    setLastSeenReleaseId,
  ]);

  return (
    <ReleaseNotesContext.Provider
      value={{
        open,
        setOpen,
        mostRecentReleaseNote,
      }}
    >
      {children}
    </ReleaseNotesContext.Provider>
  );
};
