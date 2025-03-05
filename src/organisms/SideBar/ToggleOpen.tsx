import { FC } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { collapse, expand } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { Container } from './ToggleOpen.styles';
import { Button } from 'src/molecules';
import { OptionalTooltip } from 'src/molecules/OptionalTooltip/OptionalTooltip';

const { colors } = tokens;

export interface ToggleOpenProps {
  isOpen: boolean;
  toggle: () => void;
}

export const ToggleOpen: FC<ToggleOpenProps> = ({ isOpen, toggle }) => (
  <Container $isOpen={isOpen}>
    <OptionalTooltip title={isOpen ? 'Collapse' : 'Expand'} placement="right">
      <Button variant="ghost_icon" onClick={toggle}>
        <Icon
          size={24}
          data={isOpen ? collapse : expand}
          color={colors.interactive.primary__resting.rgba}
        />
      </Button>
    </OptionalTooltip>
  </Container>
);
