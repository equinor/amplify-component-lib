import { FC } from 'react';

import {
  Button,
  Card,
  Icon,
  Progress,
  Tooltip,
  Typography,
} from '@equinor/eds-core-react';
import {
  check_circle_outlined,
  close_circle_outlined,
} from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { elevation, colors, spacings } = tokens;

const StyledCard = styled(Card)`
  box-shadow: ${elevation.raised};
  padding-top: ${spacings.comfortable.medium};
  overflow: hidden;
  margin: 10px 0;
`;

const CardHeader = styled(Card.Header)`
  display: grid;
  grid-template-columns: 1fr auto auto;
`;

const CheckIcon = styled(Icon) `
margin-right: ${spacings.comfortable.x_small}; 
`

const StyledButton = styled(Button)`
  margin-left: 0 !important;

`;

interface TopProgressProps {
  $error?: boolean;
}

const TopProgress = styled(Progress.Linear)<TopProgressProps>`
  position: absolute;
  top: 0;
  div {
    background-color: ${(props) =>
      props.$error ? colors.interactive.danger__resting.hsla : ''};
  }
`;

const TruncatedTypography = styled(Typography)`
  text-overflow: ellipsis;
  max-width: fit-content;
  overflow: hidden;
  white-space: nowrap;
`;

const getTitle = (status: 'loading' | 'error' | 'done', errorMsg?: string) => {
  switch (status) {
    case 'loading':
      return <Typography variant="overline">Uploading</Typography>;
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
  loading?: boolean;
  name: string;
  progress?: number;
  onDelete: () => void;
  onAbort: () => void;
}

const FileProgress: FC<FileProgressProps> = ({
  error,
  errorMsg,
  name,
  onDelete,
  onAbort,
  loading,
  progress,
}) => {
  return (
    <StyledCard>
      <TopProgress
        variant={
          error || !loading || (progress && progress !== 100)
            ? 'determinate'
            : 'indeterminate'
        }
        value={error || !loading ? 100 : progress ? progress : undefined}
        $error={error}
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
        {!error && !loading ? (
            <CheckIcon data={check_circle_outlined} size={24} color={colors.interactive.primary__resting.hex}/>
        ) : (
          <div />
        )}
        <StyledButton
          variant="ghost_icon"
          onClick={() => (loading ? onAbort() : onDelete())}
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


