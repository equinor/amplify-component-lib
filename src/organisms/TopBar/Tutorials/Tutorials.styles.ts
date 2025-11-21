import { spacings } from 'src/atoms/style';

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${spacings.large};
  width: 520px;
  height: 100%;
  > h4:not(:last-child) {
    margin-bottom: ${spacings.x_large};
  }
`;

export const TutorialList = styled.section`
  display: flex;
  flex-direction: column;
  > p:first-child {
    margin-bottom: ${spacings.medium_small};
  }
`;
