import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { spacings, colors } = tokens;

interface ContainerProps {
  $isError?: boolean;
}

export const Container = styled.div<ContainerProps>`
  max-width: 555px;
  padding: ${spacings.comfortable.medium} ${spacings.comfortable.large};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${spacings.comfortable.medium};
  border: 1px solid
    ${({ $isError }) =>
      $isError
        ? colors.ui.background__danger.hex
        : colors.ui.background__medium.hex};
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
  padding-top: ${spacings.comfortable.small};
`;

export const ProgressWrapper = styled.div`
  min-height: 4px;
`;
