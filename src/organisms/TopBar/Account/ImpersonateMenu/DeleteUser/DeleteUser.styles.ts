import { spacings } from 'src/atoms/style';

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 20rem;
  > section:nth-child(2) {
    margin-top: ${spacings.medium};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 ${spacings.medium};
    margin-bottom: ${spacings.medium};
  }
  > section:nth-child(5) {
    max-width: unset;
    margin-bottom: ${spacings.large};
    padding: 0 ${spacings.medium};
  }
  > div:nth-child(3) {
    align-self: center;
  }
  > div:last-child {
    display: flex;
    flex-direction: column;
    gap: ${spacings.x_small};
    padding: 0 ${spacings.medium};
  }
`;
