import { Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { colors } = tokens;

interface ButtonProps {
  $isSelected: boolean;
}

export const TopBarButton = styled(Button)<ButtonProps>`
  background: ${({ $isSelected }) =>
    $isSelected ? colors.interactive.primary__hover_alt.rgba : 'none'};
`;
