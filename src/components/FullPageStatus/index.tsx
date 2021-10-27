import { FC } from 'react';
import { Progress, Typography, Icon } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { warning_filled } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

const { colors, spacings } = tokens;

export interface FullPageStatusProps {
  loading: boolean;
  error: boolean;
  errorMessage: string;
}

const Center = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
  justify-content: center;
  align-items: center;
`;

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacings.comfortable.large};
`;

const FullPageStatus: FC<FullPageStatusProps> = ({
  loading,
  error,
  errorMessage,
}) => {
  return (
    <Center>
      {loading && <Progress.Circular />}
      {error && !loading && (
        <ErrorWrapper>
          <Icon
            data={warning_filled}
            size={48}
            color={colors.interactive.warning__resting.hex}
          />
          <Typography variant="h5">{errorMessage}</Typography>
        </ErrorWrapper>
      )}
    </Center>
  );
};

export default FullPageStatus;
