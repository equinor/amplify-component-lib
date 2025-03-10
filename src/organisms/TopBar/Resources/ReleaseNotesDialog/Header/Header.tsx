import { FC, useMemo } from 'react';

import { Button, Icon, Tooltip, Typography } from '@equinor/eds-core-react';
import { close, external_link } from '@equinor/eds-icons';

import { ButtonContainer, Wrapper } from './Header.styles';
import { EnvironmentType } from 'src/atoms/enums/Environment';
import { environment } from 'src/atoms/utils';
import { useReleaseNotes } from 'src/providers/ReleaseNotesProvider';

const { getEnvironmentName, getAppName } = environment;

export const Header: FC = () => {
  const applicationName = getAppName(import.meta.env.VITE_NAME);
  const environmentName = getEnvironmentName(
    import.meta.env.VITE_ENVIRONMENT_NAME
  );
  const environmentNameWithoutLocalHost =
    environmentName === EnvironmentType.LOCALHOST
      ? EnvironmentType.DEVELOP
      : environmentName;
  const { setOpen } = useReleaseNotes();

  const openReleaseNotesUrl = useMemo(() => {
    if (
      environmentNameWithoutLocalHost &&
      environmentNameWithoutLocalHost !== EnvironmentType.PRODUCTION
    ) {
      return `https://client-subsurfappmanagement-frontend-${environmentNameWithoutLocalHost}.radix.equinor.com/release-notes?filters={"applications"%3A["${encodeURIComponent(applicationName)}"]}`;
    }
    return `https://subsurfappmanagement.equinor.com/release-notes?filters={"applications"%3A["${encodeURIComponent(applicationName)}"]}`;
  }, [applicationName, environmentNameWithoutLocalHost]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Wrapper>
      <Typography variant="h1" bold>
        What&apos;s new?
      </Typography>
      <ButtonContainer>
        <Tooltip title="Release notes in SAM">
          <Button
            variant="ghost_icon"
            href={openReleaseNotesUrl}
            target="_blank"
          >
            <Icon data={external_link} />
          </Button>
        </Tooltip>
        <Button
          variant="ghost_icon"
          onClick={handleClose}
          aria-label="close modal"
        >
          <Icon data={close} />
        </Button>
      </ButtonContainer>
    </Wrapper>
  );
};
