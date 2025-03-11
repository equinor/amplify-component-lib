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

import { EnvironmentType } from 'src/atoms/enums/Environment';
import { useLocalStorage } from 'src/atoms/hooks/useLocalStorage';
import { environment } from 'src/atoms/utils';
import { environmentAndAppNameToURL } from 'src/organisms/TopBar/Resources/ReleaseNotesDialog/ReleaseNotesDialog.utils';
import { sortReleaseNotesByDate } from 'src/providers/ReleaseNotesProvider.utils';

const { getEnvironmentName, getAppName } = environment;

interface ReleaseNotesContextState {
  open: boolean;
  setOpen: (open: boolean) => void;
  mostRecentReleaseNote: ReleaseNote | undefined;
  showAllReleaseNotesLink: string;
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
}

export const ReleaseNotesProvider: FC<ReleaseNotesContextProviderProps> = ({
  children,
  enabled,
}) => {
  const { data } = useReleaseNotesQuery({ enabled });
  const [open, setOpen] = useState(false);
  const [lastSeenReleaseId, setLastSeenReleaseId] = useLocalStorage(
    RELEASE_NOTES_WAS_VIEWED_KEY,
    '',
    TWO_WEEKS_IN_MS
  );

  const mostRecentReleaseNote = data?.toSorted(sortReleaseNotesByDate).at(0);

  const applicationName = getAppName(import.meta.env.VITE_NAME);
  const environmentName = getEnvironmentName(
    import.meta.env.VITE_ENVIRONMENT_NAME
  );
  const environmentNameWithoutLocalHost =
    environmentName === EnvironmentType.LOCALHOST
      ? EnvironmentType.DEVELOP
      : environmentName;
  const showAllReleaseNotesLink = environmentAndAppNameToURL(
    environmentNameWithoutLocalHost,
    applicationName
  );

  useEffect(() => {
    if (!mostRecentReleaseNote) return;

    const recentReleaseNoteDate = new Date(
      mostRecentReleaseNote.releaseDate ?? mostRecentReleaseNote.createdDate
    ).getTime();
    const nowInMs = Date.now();
    const timeSinceLastReleaseInMs = nowInMs - recentReleaseNoteDate;
    if (
      timeSinceLastReleaseInMs <= TWO_WEEKS_IN_MS &&
      lastSeenReleaseId !== mostRecentReleaseNote.releaseId
    ) {
      setOpen(true);
      setLastSeenReleaseId(mostRecentReleaseNote.releaseId ?? '');
    }
  }, [lastSeenReleaseId, mostRecentReleaseNote, setLastSeenReleaseId]);

  return (
    <ReleaseNotesContext.Provider
      value={{
        open,
        setOpen,
        mostRecentReleaseNote,
        showAllReleaseNotesLink,
      }}
    >
      {children}
    </ReleaseNotesContext.Provider>
  );
};
