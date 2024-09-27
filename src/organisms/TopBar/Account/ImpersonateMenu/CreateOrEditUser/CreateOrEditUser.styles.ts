import { tokens } from '@equinor/eds-tokens';

import { spacings } from 'src/atoms/style/spacings';

import styled from 'styled-components';

const { colors } = tokens;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium};
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: ${spacings.medium};
  padding: 0 ${spacings.small} ${spacings.small};
  border-bottom: 1px solid ${colors.ui.background__medium.rgba};
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${spacings.small};
  padding: 0 ${spacings.medium} ${spacings.medium};
  border-bottom: 1px solid ${colors.ui.background__medium.rgba};
  &:last-child {
    flex-direction: row;
    border-bottom: none;
    justify-content: flex-end;
  }
`;
