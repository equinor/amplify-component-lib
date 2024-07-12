import { FC } from 'react';

import { FilterHeader } from './FilterHeader/FilterHeader';
import {
  FilterContainer,
  HeaderWrapper,
  HeadingContainer,
} from './ReleaseNotesHeader.styles';
import { Typography } from 'src/molecules';

export const ReleaseNotesHeader: FC = () => {
  return (
    <HeaderWrapper>
      <HeadingContainer className="release-notes-header-container">
        <Typography variant="h4">Release Notes</Typography>
      </HeadingContainer>
      <FilterContainer>
        <FilterHeader />
      </FilterContainer>
    </HeaderWrapper>
  );
};
