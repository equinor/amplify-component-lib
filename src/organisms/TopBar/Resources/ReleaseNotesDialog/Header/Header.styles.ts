import { spacings } from 'src/atoms/style';

import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: ${spacings.medium};
`;
