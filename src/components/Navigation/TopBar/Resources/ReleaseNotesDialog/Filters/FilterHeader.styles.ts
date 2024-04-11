import { spacings } from 'src/style';

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium};
  padding-right: ${spacings.xxx_large};
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
  gap: ${spacings.small};

  .sieve-container {
    flex: 1;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${spacings.medium};
`;

const ChipWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-family: 'Equionor', sans-serif;
  font-size: 12px;
  align-items: center;
  grid-gap: ${spacings.small};
  justify-items: start;
  flex-wrap: wrap;
  width: 77%;
  > p {
    line-height: normal;
    height: min-content;
    font-size: 12px;
  }
`;

export { ButtonContainer, ChipWrapper, SieveWrapper, Wrapper };
