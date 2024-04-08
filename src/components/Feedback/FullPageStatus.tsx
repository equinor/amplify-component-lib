import { FC } from 'react';

import { Icon, Progress, Typography } from '@equinor/eds-core-react';
import { warning_filled } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { colors } = tokens;

import { spacings } from 'src/style';

export interface FullPageStatusProps {
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

const Center = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacings.large};
`;

const CircularProgress = styled(Progress.Circular)`
  circle {
    stroke: ${colors.interactive.primary__resting.rgba};
  }
  circle:first-child {
    stroke: ${colors.interactive.primary__hover_alt.rgba};
  }
`;

const FullPageStatus: FC<FullPageStatusProps> = ({
  loading,
  error,
  errorMessage,
}) => {
  return (
    <Center>
      {loading && <CircularProgress />}
      {error && !loading && (
        <ErrorWrapper>
          <Icon
            data={warning_filled}
            size={48}
            color={colors.interactive.warning__resting.rgba}
          />
          <Typography variant="h5">{errorMessage}</Typography>
        </ErrorWrapper>
      )}
    </Center>
  );
};

export default FullPageStatus;
