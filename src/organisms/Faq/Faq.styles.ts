import { spacings } from 'src/atoms/style';

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.x_large};
  margin: ${spacings.large} 0;
  height: fit-content;
  width: 100%;
`;
