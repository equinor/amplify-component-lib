import { FC } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { first_page, last_page } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { IconContainer } from './MenuItem/MenuItem.styles';
import { Container } from './ToggleOpen.styles';
import { OptionalTooltip } from 'src/molecules/OptionalTooltip/OptionalTooltip';

const { colors } = tokens;

export interface ToggleOpenProps {
  isOpen: boolean;
  toggle: () => void;
}

export const ToggleOpen: FC<ToggleOpenProps> = ({ isOpen, toggle }) => (
  <OptionalTooltip title={isOpen ? 'Collapse' : 'Expand'} placement="right">
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
  </OptionalTooltip>
);
