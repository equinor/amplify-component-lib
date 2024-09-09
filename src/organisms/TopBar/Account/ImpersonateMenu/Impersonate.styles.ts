import { tokens } from '@equinor/eds-tokens';

import { spacings } from 'src/atoms/style';

import styled from 'styled-components';

const { colors } = tokens;

export const Header = styled.header`
  padding: ${spacings.medium};
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${colors.ui.background__medium.rgba};
  > div:has(input) {
    margin-top: ${spacings.medium};
  }
`;

export const Content = styled.section`
  overflow: auto;
  max-height: 15rem;
  display: flex;
  flex-direction: column;
`;
