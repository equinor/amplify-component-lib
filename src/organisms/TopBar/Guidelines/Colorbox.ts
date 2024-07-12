import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { elevation } = tokens;

interface ColorboxProps {
  $color: string;
}
export const Colorbox = styled.div<ColorboxProps>`
  width: 52px;
  height: 32px;
  background-color: ${(props) => props.$color};
  box-shadow: ${elevation.raised};
`;
