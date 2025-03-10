import { FC } from 'react';

import { Button, Icon, Tooltip, Typography } from '@equinor/eds-core-react';
import { close, external_link } from '@equinor/eds-icons';

import { ButtonContainer, Wrapper } from './Header.styles';
import { useReleaseNotes } from 'src/providers/ReleaseNotesProvider';

export const Header: FC = () => {
  const { setOpen, showAllReleaseNotesLink } = useReleaseNotes();

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
            href={showAllReleaseNotesLink}
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
