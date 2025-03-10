import { createContext, FC, ReactNode, useContext, useState } from 'react';

import {
  ReleaseNote,
  useReleaseNotesQuery,
} from '@equinor/subsurface-app-management';

import { environment, EnvironmentType } from 'src/atoms';
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
