import { Button as EDSButton } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { spacings } = tokens;

interface ButtonProps {
  $isActive?: boolean;
}

const Button = styled(EDSButton)<ButtonProps>`
  color: black;
  font-weight: 700;
  background-color: ${({ $isActive }) => ($isActive ? '#deedee' : 'none')};
  margin-bottom: ${spacings.comfortable.medium};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: sticky;
`;

const MonthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 40px;
`;

const YearContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export { Button, Container, MonthContainer, YearContainer };
