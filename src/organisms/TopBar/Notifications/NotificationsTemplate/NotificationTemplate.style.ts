import { Button, Divider as EDSDivider } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { spacings, colors } = tokens;

export const Wrapper = styled.div`
  padding: ${spacings.comfortable.medium};
  //border-bottom: 1px solid ${colors.ui.background__medium.rgba};
  &:hover {
    background: #f2f2f2;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: span 3;
  padding: ${spacings.comfortable.small};
  cursor: pointer;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 10px 1fr;
  grid-gap: ${spacings.comfortable.medium_small};
  align-items: center;
`;

export const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${colors.infographic.substitute__blue_overcast.rgba};
  position: relative;
`;

export const TopContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  gap: ${spacings.comfortable.medium_small};
  justify-items: end;
  grid-column: span 3;
`;

interface UserInformationProps {
  $systemUser?: boolean;
}

export const UserInformation = styled.div<UserInformationProps>`
  display: flex;
  flex-direction: row;
  align-items: ${({ $systemUser }) => ($systemUser ? 'flex-start' : 'center')};
  gap: ${spacings.comfortable.small};
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${spacings.comfortable.medium_small};
  grid-column: span 3;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 0 ${spacings.comfortable.small};
`;
export const DeleteButton = styled(Button)`
  display: none;
  ${GridContainer}:hover & {
    display: initial;
  }
`;

export const Divider = styled(EDSDivider)`
  display: flex;
  margin: 0 ${spacings.comfortable.medium_small};
`;
