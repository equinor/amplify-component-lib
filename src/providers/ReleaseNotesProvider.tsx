import { createContext, FC, ReactNode, useContext, useState } from 'react';

import {
  ReleaseNote,
  useReleaseNotesQuery,
} from '@equinor/subsurface-app-management';

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
