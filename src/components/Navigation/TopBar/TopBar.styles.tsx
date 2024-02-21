import { Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { colors } = tokens;

interface ButtonProps {
  $isSelected: boolean;
  $fieldSelector?: boolean;
}

export const UnreadRedDot = styled.div`
  background-color: ${colors.interactive.danger__resting.rgba};
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: absolute;
  right: 2px;
  top: 4px;
  border: 2px solid ${colors.text.static_icons__primary_white.rgba};
  // Box-sizing is a quickfix for use in PWEX because of global styling
  box-sizing: content-box;
`;
export const TopBarButton = styled(Button)<ButtonProps>`
  height: ${({ $fieldSelector }) => ($fieldSelector ? '' : '36px')};
  width: ${({ $fieldSelector }) => ($fieldSelector ? '' : '36px')};
  border: ${({ $isSelected }) => ($isSelected ? `1px solid #132E31` : '1px solid none')};
  color: ${({ $isSelected }) => ($isSelected ? '#132E31' : colors.interactive.primary__resting.rgba)};
    &:hover ${UnreadRedDot} {
        border: 2px solid ${colors.interactive.primary__hover_alt.rgba};
     
    }
}

`;
