import { LinearProgress as EDSLinearProgress } from '@equinor/eds-core-react';

import { colors, spacings } from 'src/atoms/style';

import styled from 'styled-components';

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
        ? colors.interactive.warning__hover.rgba
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
  gap: ${spacings.small};
  justify-content: space-between;
  min-height: 40px;
  word-break: break-word;
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
