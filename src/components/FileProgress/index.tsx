import { FC } from 'react';
import {
  Card,
  Typography,
  Icon,
  Progress,
  Button,
  Tooltip,
} from '@equinor/eds-core-react';
import {
  check_circle_outlined,
  close_circle_outlined,
  refresh,
} from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

const { elevation, colors } = tokens;

const StyledCard = styled(Card)`
  box-shadow: ${elevation.raised};
  overflow: hidden;
  margin: 10px 0;
`;

const CardHeader = styled(Card.Header)`
  display: grid;
  grid-template-columns: 1fr auto auto;
`;

const StyledButton = styled(Button)`
  margin-left: 0 !important;
`;

interface TopProgressProps {
  paused?: boolean;
  error?: boolean;
}

const TopProgress = styled(Progress.Linear)<TopProgressProps>`
  position: absolute;
  top: 0;
  div {
    background-color: ${(props) =>
      props.paused ? colors.interactive.warning__resting.hsla : ''};
    background-color: ${(props) =>
      props.error ? colors.interactive.danger__resting.hsla : ''};
  }
`;

const TruncatedTypography = styled(Typography)`
  text-overflow: ellipsis;
  max-width: fit-content;
  overflow: hidden;
  white-space: nowrap;
`;

const getTitle = (
  status: 'loading' | 'paused' | 'error' | 'done',
  errorMsg?: string
) => {
  switch (status) {
    case 'loading':
      return <Typography variant="overline">Uploading</Typography>;
    case 'paused':
      return <Typography variant="overline">Upload is paused</Typography>;
    case 'error':
      return (
        <Tooltip title={errorMsg} placement="top">
          <TruncatedTypography variant="overline">{`${errorMsg}`}</TruncatedTypography>
        </Tooltip>
      );
    case 'done':
      return <Typography variant="overline">Success!</Typography>;
  }
};

const getStatus = (loading?: boolean, error?: boolean) => {
  if (error) return 'error';
  if (loading) return 'loading';
  return 'done';
};

export interface FileProgressProps {
  error?: boolean;
  errorMsg?: string;
  fileId: string;
  loading?: boolean;
  name: string;
  onDelete: (fileId: string) => void;
  onRetry: (fileId: string) => void;
}

const FileProgress: FC<FileProgressProps> = ({
  error,
  errorMsg,
  fileId,
  name,
  onDelete,
  onRetry,
  loading,
}) => {
  return (
    <StyledCard>
      <TopProgress
        variant={error || !loading ? 'determinate' : 'indeterminate'}
        value={error || !loading ? 100 : undefined}
        error={error}
      />
      <CardHeader>
        <Card.HeaderTitle>
          {getTitle(getStatus(loading, error), errorMsg)}
          <Tooltip title={name}>
            <TruncatedTypography variant="h4" token={{ fontWeight: 500 }}>
              {name}
            </TruncatedTypography>
          </Tooltip>
        </Card.HeaderTitle>
        {error ? (
          <StyledButton
            variant="ghost_icon"
            onClick={!loading ? () => onRetry(fileId) : undefined}
          >
            <Icon
              color={colors.text.static_icons__tertiary.hex}
              data={refresh}
              size={24}
            />
          </StyledButton>
        ) : !error && !loading ? (
          <StyledButton variant="ghost_icon" color="primary">
            <Icon data={check_circle_outlined} size={24} />
          </StyledButton>
        ) : (
          <div />
        )}
        <StyledButton
          variant="ghost_icon"
          onClick={() => onDelete(fileId)}
          disabled={loading}
        >
          <Icon
            color={colors.text.static_icons__tertiary.hex}
            data={close_circle_outlined}
            size={24}
          />
        </StyledButton>
      </CardHeader>
    </StyledCard>
  );
};

export default FileProgress;
