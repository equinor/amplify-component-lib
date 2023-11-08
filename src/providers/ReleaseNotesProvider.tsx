import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

import { ReleaseNote } from 'src/api/models/ReleaseNote';
import { Option, SieveValue } from 'src/components';
import { useReleaseNotesQuery } from 'src/hooks/useReleaseNotesQuery';
import { extractYearsData, YearData } from 'src/utils/releaseNotes';

interface ReleaseNotesContextState {
  search: SieveValue;
  setSearch: Dispatch<SetStateAction<SieveValue>>;
  selectedReleaseNoteTypes?: Option[];
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  filteredData: ReleaseNote[];
  releaseNotesYears: YearData[];
}

const defaultSearchState: SieveValue = {
  filterValues: undefined,
  searchValue: undefined,
  sortValue: undefined,
};

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
}

const ReleaseNotesProvider: FC<ReleaseNotesContextProviderProps> = ({
  children,
}) => {
  const { data } = useReleaseNotesQuery();
  const [search, setSearch] = useState<SieveValue>(defaultSearchState);
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((previous) => !previous);
  };

  const releaseNotesYears = useMemo(() => extractYearsData(data || []), [data]);

  const selectedReleaseNoteTypes = search.filterValues?.Type;

  const filteredData = useMemo(() => {
    const selectedReleaseNoteTypes = search?.filterValues?.Type;
    let filteredList = data || [];

    if (selectedReleaseNoteTypes && selectedReleaseNoteTypes.length > 0) {
      filteredList = filteredList.filter(
        (item) =>
          item.tags?.some((tag) =>
            selectedReleaseNoteTypes.map((t: any) => t.value).includes(tag)
          )
      );
    }

    if (search?.searchValue && search?.searchValue?.trim() !== '') {
      const searchTerms = search.searchValue.trim().toLowerCase().split(' ');
      filteredList = filteredList.filter((item) => {
        return Object.values(item)
          .join(' ')
          .toLowerCase()
          .includes(searchTerms.join(' '));
      });
    }
    filteredList.sort((a, b) => {
      const dateA = new Date(a.createdDate ?? '');
      const dateB = new Date(b.createdDate ?? '');
      return dateB.getTime() - dateA.getTime();
    });

    return filteredList;
  }, [data, search]);

  const contextValue: ReleaseNotesContextState = {
    search,
    setSearch,
    selectedReleaseNoteTypes,
    open,
    setOpen,
    toggle,
    filteredData,
    releaseNotesYears,
  };

  return (
    <ReleaseNotesContext.Provider value={contextValue}>
      {children}
    </ReleaseNotesContext.Provider>
  );
};

export default ReleaseNotesProvider;
