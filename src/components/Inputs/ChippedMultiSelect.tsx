import { FC, useRef, useState } from 'react';

import {
  Chip as EDSChip,
  Icon,
  Label,
  Menu as EDSMenu,
  Typography,
} from '@equinor/eds-core-react';
import {
  arrow_drop_down,
  arrow_drop_up,
  checkbox,
  checkbox_outline,
} from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { useOutsideClick } from '@equinor/eds-utils';

import styled from 'styled-components';

const { spacings, colors, shape } = tokens;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.xx_small};
`;

interface SelectElementProps {
  $open: boolean;
}

const SelectElement = styled.div<SelectElementProps>`
  background: ${colors.ui.background__light.rgba};
  ${(props) =>
    props.$open
      ? `box-shadow: inset 0px -2px 0px 0px ${colors.interactive.primary__resting.rgba}`
      : `box-shadow: inset 0px -1px 0px 0px ${colors.text.static_icons__tertiary.rgba}`};
  position: relative;
  &:hover {
    cursor: pointer;
  }
  > div {
    min-height: 36px;
    align-items: center;
    padding: ${spacings.x_small};
    margin-right: ${spacings.xx_large};
    gap: ${spacings.x_small};
    display: flex;
    flex-wrap: wrap;
  }
`;

const Placeholder = styled(Typography)`
  color: ${colors.text.static_icons__secondary.rgba};
  height: 36px;
  display: flex;
  align-items: center;
  padding-left: ${spacings.small};
`;

const Arrow = styled(Icon)`
  position: absolute;
  right: ${spacings.small};
  top: 50%;
  transform: translateY(-50%);
  height: 24px;
  width: 24px;
  &:hover {
    border-radius: ${shape.circle.borderRadius};
    background: ${colors.interactive.primary__hover_alt.rgba};
  }
`;

const Menu = styled(EDSMenu)`
  overflow: auto !important;
`;

const MenuItem = styled(EDSMenu.Item)`
  display: grid;
  grid-template-columns: auto 1fr;
  &:focus {
    outline: none;
  }
`;

const Chip = styled(EDSChip)`
  color: ${colors.text.static_icons__default.rgba};
  background: ${colors.ui.background__light.rgba};
  border: 1px solid ${colors.ui.background__medium.rgba};
  line-height: normal;
  transition: background 0.15s ease-in;
  > svg {
    z-index: auto;
    fill: ${colors.text.static_icons__default.rgba};
    &:hover {
      fill: ${colors.interactive.primary__hover.rgba};
    }
  }

  &:hover {
    color: ${colors.interactive.primary__hover.rgba};

    background: ${colors.ui.background__medium.rgba};
  }
`;

export interface ChippedMultiSelectProps {
  label: string;
  placeholder: string;
  items: string[];
  onSelect: (selectedItems: string[]) => void;
  values: string[];
  maxHeight?: string;
  disabled?: boolean;
  formatter?: (val: string) => string;
  inDialog?: boolean;
}

const ChippedMultiSelect: FC<ChippedMultiSelectProps> = ({
  label,
  placeholder,
  items,
  onSelect,
  values,
  maxHeight,
  formatter,
  disabled = false,
  inDialog = false,
}) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(containerRef.current, (e: MouseEvent) => {
    if (
      open &&
      menuRef.current &&
      !menuRef.current.contains(e.target as Node)
    ) {
      setOpen(false);
    }
  });

  const handleClick = (selectedItem: string) => {
    let newSelectedItems: string[];
    // Select
    if (!values.includes(selectedItem)) {
      newSelectedItems = [...values, selectedItem];
    } else {
      // De-select
      newSelectedItems = values.filter((item) => item !== selectedItem);
    }
    onSelect(newSelectedItems);
  };

  return (
    <div ref={containerRef}>
      <Container>
        <Label label={label} />
        <SelectElement
          ref={anchorRef}
          $open={open}
          role="combobox"
          onClick={() => {
            if (!disabled) {
              setOpen((o) => !o);
            }
          }}
        >
          {values.length === 0 ? (
            <Placeholder>{placeholder}</Placeholder>
          ) : (
            <div>
              {values.map((item) => (
                <Chip key={item} onDelete={() => handleClick(item)}>
                  {formatter ? formatter(item) : item}
                </Chip>
              ))}
            </div>
          )}
          <Arrow
            data={open ? arrow_drop_up : arrow_drop_down}
            color={colors.interactive.primary__resting.rgba}
          />
        </SelectElement>
      </Container>
      {open && (
        <Menu
          open={open}
          anchorEl={anchorRef.current}
          placement="bottom"
          ref={menuRef}
          style={{
            maxHeight: maxHeight ? maxHeight : '16rem',
            width: `${anchorRef.current?.offsetWidth}px`,
            zIndex: inDialog ? 1400 : 'auto',
          }}
        >
          {items.map((item) => (
            <MenuItem key={item} onClick={() => handleClick(item)}>
              <Icon
                data={values.includes(item) ? checkbox : checkbox_outline}
                color={colors.interactive.primary__resting.rgba}
              />
              {formatter ? formatter(item) : item}
            </MenuItem>
          ))}
        </Menu>
      )}
    </div>
  );
};

export default ChippedMultiSelect;
