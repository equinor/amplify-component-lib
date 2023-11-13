import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { spacings } = tokens;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.medium};
  padding-right: ${spacings.comfortable.x_large};
  flex-wrap: wrap;
  > section {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    @media (max-width: 1060px) {
      flex-wrap: nowrap;
    }
  }
`;

const SieveWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: ${spacings.comfortable.small};

  .sieve-container {
    flex: 1;
  }
`;

const ChipWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-family: 'Equionor', sans-serif;
  font-size: 12px;
  align-items: center;
  grid-gap: ${spacings.comfortable.small};
  height: 24px;
  justify-items: start;
  flex-wrap: wrap;
  width: 77%;
  > p {
    line-height: normal;
    height: min-content;
    font-size: 12px;
  }
`;

export { ChipWrapper, SieveWrapper, Wrapper };
