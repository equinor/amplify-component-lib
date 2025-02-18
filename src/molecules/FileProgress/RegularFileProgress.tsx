import { FC, useMemo } from 'react';

import {
  Button,
  CircularProgress,
  Icon,
  Typography,
} from '@equinor/eds-core-react';
import {
  close_circle_outlined,
  delete_to_trash,
  file as file_icon,
  refresh,
} from '@equinor/eds-icons';

import { colors } from 'src/atoms/style';
import { formatDataSize } from 'src/atoms/utils';
import {
  FileProgressPropsExtension,
  RegularFileProgressBaseProps,
} from 'src/molecules/FileProgress/FileProgress.types';
import {
  Container,
  FileName,
  LinearProgress,
  ProgressWrapper,
  RegularFileProgressDetails,
  RegularFileProgressWrapper,
} from 'src/molecules/FileProgress/RegularFileProgress.styles';

const RegularFileProgress: FC<
  RegularFileProgressBaseProps & FileProgressPropsExtension
> = ({
  onRetry,
  file,
  customLoadingText,
  customCompleteText,
  isError,
  fullErrorText,
  showCompleteState,
  handleOnClick,
  isDeleting,
  ...rest
}) => {
  const fileSizeProgress = useMemo(() => {
    if (
      !file?.size ||
      rest.isDone ||
      rest.indeterminate ||
      rest.progressPercent === undefined
    )
      return 1;
    const progressInSize = (file.size / 100) * rest.progressPercent;
    return formatDataSize({
      inputFormat: 'B',
      size: progressInSize,
      decimals: 1,
    });
  }, [file?.size, rest]);

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

  return (
    <Container $isError={isError}>
      <Icon
        data={file_icon}
        color={
          isError
            ? colors.interactive.danger__hover.rgba
            : colors.interactive.primary__resting.rgba
        }
        size={32}
      />
      <RegularFileProgressWrapper>
        <FileName>
          <Typography variant="caption">{file.name}</Typography>
          <div>
            {isDeleting ? (
              <Button variant="ghost_icon">
                <CircularProgress size={24} />
              </Button>
            ) : (
              <Button variant="ghost_icon" onClick={handleOnClick}>
                <Icon
                  data={
                    showCompleteState ? delete_to_trash : close_circle_outlined
                  }
                  color={colors.text.static_icons__tertiary.rgba}
                  size={24}
                />
              </Button>
            )}
            {isError && onRetry && (
              <Button variant="ghost_icon" onClick={onRetry}>
                <Icon
                  data={refresh}
                  color={colors.text.static_icons__tertiary.rgba}
                  size={24}
                />
              </Button>
            )}
          </div>
        </FileName>
        <ProgressWrapper>
          {!showCompleteState && (
            <LinearProgress
              variant={rest.indeterminate ? 'indeterminate' : 'determinate'}
              value={!rest.indeterminate ? undefined : rest.progressPercent}
            />
          )}
        </ProgressWrapper>
        <RegularFileProgressDetails>
          <Typography variant="overline">{detailsText}</Typography>
          {file?.size && (
            <Typography variant="overline">
              {showCompleteState
                ? formatDataSize({
                    size: file.size,
                    decimals: 1,
                    inputFormat: 'B',
                  })
                : `${fileSizeProgress} of ${formatDataSize({
                    size: file.size,
                    decimals: 1,
                    inputFormat: 'B',
                  })}`}
            </Typography>
          )}
        </RegularFileProgressDetails>
      </RegularFileProgressWrapper>
    </Container>
  );
};

export default RegularFileProgress;
