import { LinearProgress as EDSLinearProgress } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { spacings } from 'src/style';

import styled from 'styled-components';

const { colors } = tokens;

interface ContainerProps {
  $isError?: boolean;
}

export const Container = styled.div<ContainerProps>`
  max-width: 555px;
  padding: ${spacings.medium} ${spacings.large};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${spacings.medium};
  border: 1px solid
    ${({ $isError }) =>
      $isError
        ? colors.ui.background__danger.rgba
        : colors.ui.background__medium.rgba};
  border-radius: 4px;
`;

export const RegularFileProgressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FileName = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const RegularFileProgressDetails = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-top: ${spacings.small};
`;

export const ProgressWrapper = styled.div`
  min-height: 4px;
`;

export const LinearProgress = styled(EDSLinearProgress)`
  background-color: ${colors.interactive.primary__hover_alt.rgba};

  div {
    background-color: ${colors.interactive.primary__resting.rgba};
  }
`;
