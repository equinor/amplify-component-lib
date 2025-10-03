import { FC } from 'react';

import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { close } from '@equinor/eds-icons';

import { Wrapper } from './Header.styles';
import { useReleaseNotes } from 'src/providers/ReleaseNotesProvider';

export const Header: FC = () => {
  const { setOpen } = useReleaseNotes();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Wrapper>
      <Typography variant="h1" bold>
        What&apos;s new?
      </Typography>
      <Button
        variant="ghost_icon"
        onClick={handleClose}
        aria-label="close modal"
      >
        <Icon data={close} />
      </Button>
    </Wrapper>
  );
};
