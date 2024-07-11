import { FC } from 'react';

import { Typography } from '@equinor/eds-core-react';

import { FilterHeader } from './FilterHeader/FilterHeader';
import {
  FilterContainer,
  HeaderWrapper,
  HeadingContainer,
} from './ReleaseNotesHeader.styles';

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
