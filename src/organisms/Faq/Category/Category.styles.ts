import { spacings } from 'src/atoms';

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${spacings.large};
  gap: ${spacings.medium};
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  gap: ${spacings.small};
  align-items: center;
`;
