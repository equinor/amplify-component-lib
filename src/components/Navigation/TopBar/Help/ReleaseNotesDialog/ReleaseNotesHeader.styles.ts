import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { spacings } = tokens;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  grid-template-columns: 1fr 5fr;
  column-gap: ${spacings.comfortable.xx_large};
  .release-notes-header-container {
    display: flex;
    flex-direction: column;
    min-width: 200px;
    @media (max-width: 1000px) {
      max-width: 150px;
    }
  }
`;

const HeadingContainer = styled.div`
  display: flex;
  padding-top: 50px;
`;

const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 -${spacings.comfortable.small};
  padding: 50px ${spacings.comfortable.small} 0px ${spacings.comfortable.small};
`;

export { FilterContainer, HeaderWrapper, HeadingContainer };
