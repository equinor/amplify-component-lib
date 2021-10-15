import React, { Dispatch, SetStateAction } from 'react';
import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { first_page, last_page } from '@equinor/eds-icons';
import styled from 'styled-components';

const { colors, spacings, shape } = tokens;

const LargeButton = styled.button`
  grid-column: 2 / 8;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  background: none;
  border: none;
  border-radius: ${shape.button.borderRadius};
  padding: ${spacings.comfortable.medium_small} ${spacings.comfortable.medium};
  margin-left: -${spacings.comfortable.medium};
  margin-right: -${spacings.comfortable.medium};
  > p {
    grid-column: 2;
  }
  &:hover {
    cursor: pointer;
    background: ${colors.interactive.secondary__highlight.hex};
  }
`;

interface ToggleOpenProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ToggleOpen: React.FC<ToggleOpenProps> = ({ open, setOpen }) => {
  if (!open) {
    return (
      <Button
        onClick={() => setOpen((o) => !o)}
        color="secondary"
        variant="ghost_icon"
      >
        <Icon size={24} data={last_page} />
      </Button>
    );
  }
  return (
    <LargeButton onClick={() => setOpen((o) => !o)}>
      <Icon size={24} data={first_page} />
      <Typography variant="cell_text" group="table">
        Collapse
      </Typography>
    </LargeButton>
  );
};

export default ToggleOpen;
