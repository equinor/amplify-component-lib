import { colors, spacings } from 'src/atoms/style';

import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: ${spacings.medium};
  padding: 0 ${spacings.small} ${spacings.small};
  border-bottom: 1px solid ${colors.ui.background__medium.rgba};
`;
