import { tokens } from '@equinor/eds-tokens';

import { spacings } from 'src/atoms/style';

import styled from 'styled-components';

const { colors } = tokens;

interface ContainerProps {
  $width: string;
}

export const NavigationContainer = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  align-items: flex-start;
  justify-content: space-between;
  width: ${(props) => props.$width};
  min-width: ${(props) => props.$width};
  height: calc(100vh - 64px);
  position: sticky;
  top: 64px;
  overflow: hidden;
  border-right: 1px solid ${colors.ui.background__medium.rgba};
  background-color: ${colors.ui.background__default.rgba};
`;

export const TopItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
  align-self: stretch;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const BottomItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  border-top: 1px solid ${colors.ui.background__medium.rgba};
`;

export const EquinorIconContainer = styled.div`
  display: flex;
  align-self: stretch;
  justify-content: center;
  padding: 20px ${spacings.medium};
`;
