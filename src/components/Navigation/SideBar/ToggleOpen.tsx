import { FC } from 'react';

import { Button, Icon, Tooltip, Typography } from '@equinor/eds-core-react';
import { first_page, last_page } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { spacings } from 'src/style';

import styled from 'styled-components';

const { colors, shape } = tokens;

interface ContainerProps {
  $open?: boolean;
}

const ToggleContainer = styled.div<ContainerProps>`
  display: ${({ $open }) => ($open ? 'grid' : 'flex')};
  grid-template-columns: repeat(10, 1fr);
  grid-gap: ${spacings.medium};
  justify-content: center;
  margin-top: auto;
  margin-bottom: ${spacings.medium};
  ${({ $open }) =>
    !$open &&
    `
    > button {
      margin-left: -4px;
    }
    `}
  button {
    transition: background 0.1s ease-in;
  }
  > button:hover {
    background: ${colors.interactive.primary__hover_alt.rgba};
  }
`;

const LargeButton = styled.button`
  grid-column: 2 / 10;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: ${spacings.medium};
  align-items: center;
  background: none;
  border: none;
  border-radius: ${shape.button.borderRadius};
  height: 40px;
  margin-left: -${spacings.medium};
  margin-right: -${spacings.medium};
  > p {
    grid-column: 2;
    margin-left: -1px; // border size
  }
  cursor: pointer;
  &:hover {
    background: ${colors.interactive.secondary__highlight.rgba};
  }
`;

const Text = styled(Typography)`
  font-weight: 400;
`;

interface ToggleOpenProps {
  isOpen: boolean;
  toggle: () => void;
}

const ToggleOpen: FC<ToggleOpenProps> = ({ isOpen, toggle }) => {
  if (isOpen) {
    return (
      <ToggleContainer $open={isOpen}>
        <LargeButton onClick={toggle}>
          <Icon
            size={24}
            data={first_page}
            color={colors.text.static_icons__default.rgba}
          />
          <Text
            variant="cell_text"
            group="table"
            color={colors.text.static_icons__default.rgba}
          >
            Collapse
          </Text>
        </LargeButton>
      </ToggleContainer>
    );
  }
  return (
    <ToggleContainer $open={isOpen}>
      <Tooltip title="Expand" placement="right">
        <Button onClick={toggle} color="secondary" variant="ghost_icon">
          <Icon
            size={24}
            data={last_page}
            color={colors.text.static_icons__default.rgba}
          />
        </Button>
      </Tooltip>
    </ToggleContainer>
  );
};

export default ToggleOpen;
