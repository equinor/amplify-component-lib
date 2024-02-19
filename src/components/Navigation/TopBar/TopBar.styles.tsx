import { Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { UnreadRedDot } from 'src/components/Navigation/TopBar/Notifications/NotificationsInner';

import styled from 'styled-components';

const { colors } = tokens;

interface ButtonProps {
  $isSelected: boolean;
  $fieldSelector?: boolean;
}

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
