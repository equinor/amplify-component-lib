import { FC, useMemo } from 'react';

import {
  Button,
  Icon,
  LinearProgress,
  Typography,
} from '@equinor/eds-core-react';
import {
  close_circle_outlined,
  delete_to_trash,
  file as file_icon,
  refresh,
} from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { size } from '../../../utils';
import {
  FileProgressPropsExtension,
  RegularFileProgressBaseProps,
} from './FileProgress';
import {
  Container,
  FileName,
  ProgressWrapper,
  RegularFileProgressDetails,
  RegularFileProgressWrapper,
} from './RegularFileProgress.styles';

const { colors } = tokens;
const { formatBytes } = size;

interface RegularFileProgressProps
  extends RegularFileProgressBaseProps,
    FileProgressPropsExtension {}
const RegularFileProgress: FC<RegularFileProgressProps> = ({
  onDelete,
  onCancel,
  onRetry,
  file,
  progressPercent,
  customLoadingText,
  customCompleteText,
  isError,
  fullErrorText,
  showCompleteState,
}) => {
  const fileSizeProgress = useMemo(() => {
    if (!file?.size || !progressPercent) return 1;
    const progressInSize = (file.size / 100) * progressPercent;
    return formatBytes(progressInSize, 1);
  }, [file?.size, progressPercent]);

  const detailsText = useMemo(() => {
    if (isError) {
      return fullErrorText ?? 'An error has occurred';
    }
    const loadingText = customLoadingText ?? 'loading...';
    const completeText = customCompleteText ?? 'File uploaded!';
    return showCompleteState ? completeText : loadingText;
  }, [
    customCompleteText,
    customLoadingText,
    fullErrorText,
    showCompleteState,
    isError,
  ]);

  const handleOnClick = () => {
    if (!showCompleteState && onCancel) {
      onCancel();
    } else {
      onDelete();
    }
  };

  return (
    <Container $isError={isError}>
      <Icon
        data={file_icon}
        color={
          isError
            ? colors.interactive.danger__hover.hex
            : colors.interactive.primary__resting.hex
        }
        size={32}
      />
      <RegularFileProgressWrapper>
        <FileName>
          <Typography variant="caption">{file?.name ?? 'filename'}</Typography>
          <div>
            <Button variant="ghost_icon" onClick={handleOnClick}>
              <Icon
                data={
                  showCompleteState ? delete_to_trash : close_circle_outlined
                }
                color={colors.text.static_icons__tertiary.hex}
                size={24}
              />
            </Button>
            {isError && onRetry && (
              <Button variant="ghost_icon" onClick={onRetry}>
                <Icon
                  data={refresh}
                  color={colors.text.static_icons__tertiary.hex}
                  size={24}
                />
              </Button>
            )}
          </div>
        </FileName>
        <ProgressWrapper>
          {!showCompleteState && (
            <LinearProgress
              variant={
                progressPercent === undefined ? 'indeterminate' : 'determinate'
              }
              value={progressPercent}
            />
          )}
        </ProgressWrapper>
        <RegularFileProgressDetails>
          <Typography variant="overline">{detailsText}</Typography>
          {file?.size && (
            <Typography variant="overline">
              {showCompleteState
                ? formatBytes(file.size, 1)
                : `${fileSizeProgress} of ${formatBytes(file.size, 1)}`}
            </Typography>
          )}
        </RegularFileProgressDetails>
      </RegularFileProgressWrapper>
    </Container>
  );
};

export default RegularFileProgress;
