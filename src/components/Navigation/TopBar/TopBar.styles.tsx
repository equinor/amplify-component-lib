import { Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { colors } = tokens;

interface ButtonProps {
  $isSelected: boolean;
  $fieldSelector?: boolean;
}

export const TopBarButton = styled(Button)<ButtonProps>`
  height: ${({ $fieldSelector }) => ($fieldSelector ? '' : '36px')};
  width: ${({ $fieldSelector }) => ($fieldSelector ? '' : '36px')};
  border: ${({ $isSelected }) => ($isSelected ? `1px solid #132E31` : 'none')};
  color: ${({ $isSelected }) => ($isSelected ? '#132E31' : colors.interactive.primary__resting.rgba)};
}

`;
