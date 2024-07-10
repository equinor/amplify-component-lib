import { FC } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { first_page, last_page } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { IconContainer } from './MenuItem.styles';
import { Container } from './ToggleOpen.styles';
import OptionalTooltip from 'src/molecules/OptionalTooltip/OptionalTooltip';

const { colors } = tokens;

export interface ToggleOpenProps {
  isOpen: boolean;
  toggle: () => void;
}

const ToggleOpen: FC<ToggleOpenProps> = ({ isOpen, toggle }) => {
  if (isOpen) {
    return (
      <Container $open={isOpen} onClick={toggle}>
        <IconContainer data-testid="icon-container">
          <Icon
            size={24}
            data={first_page}
            color={colors.interactive.primary__resting.rgba}
          />
        </IconContainer>
        <Typography
          variant="button"
          group="navigation"
          color={colors.text.static_icons__default.rgba}
        >
          Collapse
        </Typography>
      </Container>
    );
  }
  return (
    <Container $open={isOpen} onClick={toggle}>
      <OptionalTooltip title="Expand" placement="right">
        <IconContainer data-testid="icon-container">
          <Icon
            size={24}
            data={last_page}
            color={colors.interactive.primary__resting.rgba}
          />
        </IconContainer>
      </OptionalTooltip>
    </Container>
  );
};

export default ToggleOpen;
