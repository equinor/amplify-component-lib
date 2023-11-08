import { FC } from 'react';

import { Typography } from '@equinor/eds-core-react';

import FilterHeader from './Filters/FilterHeader';
import {
  FilterContainer,
  HeaderWrapper,
  HeadingContainer,
} from './ReleaseNotesHeader.styles';

const ReleaseNotesHeader: FC = () => {
  return (
    <HeaderWrapper>
      <HeadingContainer className="release-notes-header-container">
        <Typography group="heading" variant="h4">
          Release Notes
        </Typography>
      </HeadingContainer>
      <FilterContainer>
        <FilterHeader />
      </FilterContainer>
    </HeaderWrapper>
  );
};

export default ReleaseNotesHeader;
