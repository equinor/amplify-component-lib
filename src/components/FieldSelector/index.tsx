import { useState, MouseEvent, forwardRef, useRef } from 'react';
import {
  Button,
  Icon,
  Menu as EDSMenu,
  Typography,
} from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { check, clear, exit_to_app, platform } from '@equinor/eds-icons';
import styled from 'styled-components';

const { colors, spacings } = tokens;

const Menu = styled(EDSMenu)`
  width: 17rem;
`;

interface MenuItemProps {
  selected?: boolean;
}

const MenuItem = styled(Menu.Item)<MenuItemProps>`
  ${(props) =>
    props.selected &&
    `background: ${colors.interactive.primary__selected_highlight.hex}`};
  > div {
    display: grid;
    grid-template-columns: 1fr 24px;
    justify-content: space-between;
    width: 100%;
  }
  &:hover {
    background: ${colors.interactive.primary__selected_hover.hex};
  }
  border-top: 1px solid ${colors.ui.background__light.hex};
  outline: none !important;
`;

const MenuSection = styled.div`
  border-bottom: 1px solid ${colors.ui.background__light.hex};
`;

const MenuHeader = styled.li`
  padding: 0 ${spacings.comfortable.large};
  margin-bottom: ${spacings.comfortable.small};
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 24px;
  justify-content: space-between;
  > button {
    margin-left: -${spacings.comfortable.medium_small};
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  > h6 {
    text-transform: capitalize;
  }
`;

type Field = {
  guid: string;
  name: string;
  country: string;
};

export type FieldSelectorType = {
  currentField?: Field;
  availableFields: Array<Field>;
  onSelect: (selectedField: Field) => void;
};

const FieldSelector = forwardRef<HTMLButtonElement, FieldSelectorType>(
  ({ currentField, availableFields, onSelect }, ref) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>();
    const [open, setOpen] = useState(false);

    const openMenu = (e: MouseEvent<HTMLButtonElement>) => {
      if (e.target instanceof HTMLButtonElement) {
        setAnchorEl(e.target);
        setOpen(true);
      }
    };

    const closeMenu = () => setOpen(false);

    return (
      <>
        <Button
          variant="ghost_icon"
          onClick={(e) => (open ? closeMenu() : openMenu(e))}
          ref={ref}
        >
          <Icon
            data={platform}
            size={24}
            color={colors.interactive.primary__resting.hsla}
          />
        </Button>
        <Menu
          id="field-menu"
          open={open}
          anchorEl={anchorEl!}
          onClose={closeMenu}
          placement="bottom"
        >
          <MenuSection>
            <MenuHeader>
              <Typography variant="h6">Field selection</Typography>
              <Button variant="ghost_icon" onClick={closeMenu}>
                <Icon
                  data={clear}
                  size={24}
                  color={colors.text.static_icons__secondary.hex}
                />
              </Button>
            </MenuHeader>
            {availableFields.map((field) => {
              if (currentField && field.guid === currentField.guid) {
                return (
                  <MenuItem selected key={field.guid}>
                    <TextContainer>
                      <Typography variant="overline">
                        Current selection:
                      </Typography>
                      <Typography variant="h6">
                        {field.name.toLowerCase()}
                      </Typography>
                    </TextContainer>
                    <Icon
                      data={check}
                      color={colors.interactive.primary__resting.hex}
                      size={24}
                    />
                  </MenuItem>
                );
              }
              return (
                <MenuItem key={field.guid} onClick={() => onSelect(field)}>
                  <TextContainer>
                    <Typography variant="overline">Switch to:</Typography>
                    <Typography variant="h6">
                      {field.name.toLowerCase()}
                    </Typography>
                  </TextContainer>
                </MenuItem>
              );
            })}
          </MenuSection>
          <MenuItem
            onClick={() =>
              window.open('https://accessit.equinor.com/#', '_blank')
            }
          >
            <TextContainer>
              <Typography variant="overline">Missing a field?</Typography>
              <Typography variant="h6">Go to AccessIT</Typography>
            </TextContainer>
            <Icon
              data={exit_to_app}
              color={colors.interactive.primary__resting.hex}
              size={24}
            />
          </MenuItem>
        </Menu>
      </>
    );
  }
);

FieldSelector.displayName = 'FieldSelector';

export default FieldSelector;
