import { FC } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { first_page, last_page } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { IconContainer } from './MenuItem/MenuItem.styles';
import { Container } from './ToggleOpen.styles';
import { Tooltip } from 'src/molecules/Tooltip/Tooltip';

const { colors } = tokens;

export interface ToggleOpenProps {
  isOpen: boolean;
  toggle: () => void;
}

export const ToggleOpen: FC<ToggleOpenProps> = ({ isOpen, toggle }) => (
  <Tooltip title={isOpen ? 'Collapse' : 'Expand'} placement="right">
    <Container $isOpen={isOpen} onClick={toggle}>
      <IconContainer>
        <Icon
          size={24}
          data={isOpen ? first_page : last_page}
          color={colors.interactive.primary__resting.rgba}
        />
      </IconContainer>
      {isOpen && (
        <Typography
          variant="button"
          group="navigation"
          color={colors.text.static_icons__default.rgba}
        >
          Collapse
        </Typography>
      )}
    </Container>
  </Tooltip>
);
