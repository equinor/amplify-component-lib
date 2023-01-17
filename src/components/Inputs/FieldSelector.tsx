import { forwardRef, useRef, useState } from 'react';

import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { check, clear, exit_to_app, platform } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { useOutsideClick } from '@equinor/eds-utils';

import { Field } from '../../types/Field';

import styled from 'styled-components';

const { colors, spacings, elevation, shape } = tokens;

type MenuProps = {
  placement: 'bottom-start' | 'bottom' | 'bottom-end';
};

const Menu = styled.div<MenuProps>`
  width: 17rem;
  background-color: white;
  box-shadow: ${elevation.raised};
  position: absolute;
  transform: translate(
    -${(props) => (props.placement === 'bottom' ? spacings.comfortable.xxx_large : props.placement === 'bottom-end' ? '15rem' : '0')},
    ${spacings.comfortable.x_small}
  );

  border-radius: ${shape.corners.borderRadius};
`;

const ListContainer = styled.div`
  max-height: 25vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;
interface MenuItemProps {
  selected?: boolean;
}

const MenuItem = styled.div<MenuItemProps>`
  ${(props) =>
    props.selected &&
    `background: ${colors.interactive.primary__selected_highlight.hex};
     border-bottom: 1px solid ${colors.interactive.primary__resting.hex};
    `};
  &:hover {
    background: ${colors.interactive.primary__selected_hover.hex};
    cursor: pointer;
  }
  border-top: 1px solid ${colors.ui.background__light.hex};
  outline: none !important;
  padding: ${spacings.comfortable.medium} ${spacings.comfortable.large};
`;

const MenuFixedItem = styled.div<MenuItemProps>`
  ${(props) =>
    props.selected &&
    `background: ${colors.interactive.primary__selected_highlight.hex};
     border-bottom: 1px solid ${colors.interactive.primary__resting.hex};
    `};
  > div {
    display: grid;
    grid-template-columns: 1fr 24px;
    justify-content: space-between;
    width: 100%;
  }
  &:hover {
    background: ${colors.interactive.primary__selected_hover.hex};
    cursor: pointer;
  }
  border-top: 1px solid ${colors.ui.background__light.hex};
  outline: none !important;
  padding: ${spacings.comfortable.medium} ${spacings.comfortable.large};
`;
const MenuSection = styled.div`
  border-bottom: 1px solid ${colors.ui.background__light.hex};
  display: flex;
  flex-direction: column;
`;

const MenuHeader = styled.li`
  padding: 0 ${spacings.comfortable.large};
  margin: ${spacings.comfortable.small} 0;
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

export type FieldSelectorType = {
  currentField?: Field;
  availableFields: Array<Field>;
  onSelect: (selectedField: Field) => void;
  showAccessITLink?: boolean;
  placement?: 'bottom-start' | 'bottom' | 'bottom-end';
};

const FieldSelector = forwardRef<HTMLDivElement, FieldSelectorType>(
  (
    {
      currentField,
      availableFields,
      onSelect,
      showAccessITLink = true,
      placement = 'bottom',
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const openMenu = () => {
      setOpen(true);
    };

    const closeMenu = () => setOpen(false);

    const handleOnClick = () => {
      if (open) closeMenu();
      else openMenu();
    };

    useOutsideClick(menuRef.current as HTMLElement, (event) => {
      const node = event.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(node) &&
        !buttonRef.current?.contains(node)
      ) {
        closeMenu();
      }
    });

    return (
      <div ref={ref}>
        <Button variant="ghost_icon" onClick={handleOnClick} ref={buttonRef}>
          <Icon
            data={platform}
            size={24}
            color={colors.interactive.primary__resting.hsla}
          />
        </Button>
        {open && (
          <Menu ref={menuRef} id="field-menu" placement={placement}>
            <>
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
                {currentField && (
                  <MenuFixedItem selected>
                    <div>
                      <TextContainer>
                        <Typography variant="overline">
                          Current selection:
                        </Typography>
                        <Typography variant="h6">
                          {currentField.name?.toLowerCase()}
                        </Typography>
                      </TextContainer>
                      <Icon
                        data={check}
                        color={colors.interactive.primary__resting.hex}
                        size={24}
                      />
                    </div>
                  </MenuFixedItem>
                )}
                <ListContainer>
                  {availableFields.map((field) => {
                    if (field.uuid !== currentField?.uuid) {
                      return (
                        <MenuItem
                          key={field.uuid}
                          onClick={() => {
                            onSelect(field);
                            closeMenu();
                          }}
                        >
                          <TextContainer>
                            <Typography variant="overline">
                              Switch to:
                            </Typography>
                            <Typography variant="h6">
                              {field.name?.toLowerCase()}
                            </Typography>
                          </TextContainer>
                        </MenuItem>
                      );
                    }
                    return undefined;
                  })}
                </ListContainer>
              </MenuSection>
              {showAccessITLink && (
                <MenuFixedItem
                  onClick={() =>
                    window.open('https://accessit.equinor.com/#', '_blank')
                  }
                >
                  <div>
                    <TextContainer>
                      <Typography variant="overline">
                        Missing a field?
                      </Typography>
                      <Typography variant="h6">Go to AccessIT</Typography>
                    </TextContainer>
                    <Icon
                      data={exit_to_app}
                      color={colors.interactive.primary__resting.hex}
                      size={24}
                    />
                  </div>
                </MenuFixedItem>
              )}
            </>
          </Menu>
        )}
      </div>
    );
  }
);

FieldSelector.displayName = 'FieldSelector';

export default FieldSelector;
