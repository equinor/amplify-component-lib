import { spacings } from 'src/atoms/style';

import styled from 'styled-components';

interface ContainerProps {
  $isOpen: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-self: stretch;
  align-items: center;
  justify-content: ${({ $isOpen }) => ($isOpen ? 'flex-end' : 'center')};
  padding: ${spacings.medium} ${spacings.medium} 0;
  box-sizing: border-box;
  transition: background 0.1s ease-out;
  > button {
    flex-shrink: 0;
  }
`;
