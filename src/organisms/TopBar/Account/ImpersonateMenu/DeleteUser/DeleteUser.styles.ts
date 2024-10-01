import { spacings } from 'src/atoms';

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 20rem;
  > div:nth-child(2) {
    margin-top: ${spacings.medium};
    align-self: center;
  }
  > section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 ${spacings.medium};
    margin-top: ${spacings.small};
    margin-bottom: ${spacings.large};
  }
  > div:last-child {
    display: flex;
    flex-direction: column;
    gap: ${spacings.x_small};
    padding: 0 ${spacings.medium};
  }
`;
