import { Button, Icon, Menu, Radio, Typography } from '@equinor/eds-core-react';
import React, { forwardRef, useState } from 'react';
import { clear, settings } from '@equinor/eds-icons';

import { Box } from '@mui/material';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';

const { colors, elevation } = tokens;

const StyledMenu = styled(Menu)`
  width: 320px;
  padding: 16px;
`;

interface StyledColorBoxProps {
  color: string;
}

const StyledColorBox = styled.div<StyledColorBoxProps>`
  width: 64px;
  height: 32px;
  background-color: ${(props) => props.color};
  box-shadow: ${elevation.raised};
  border-radius: 4px;
`;

export interface ISettingsSections {
  title: string;
  type: string;
  onChange?: (val: any) => void;
  items: {
    label: string;
    name: string;
    value: string;
    colorBox?: string;
    element?: string;
  }[];
}

export interface ISettingsProps {
  allSettings: ISettingsSections[];
}

export const Settings = forwardRef<HTMLButtonElement, ISettingsProps>(
  ({ allSettings }, ref) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const isOpen = Boolean(anchorEl);

    const openMenu = (
      e:
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
        | React.KeyboardEvent<HTMLButtonElement>
    ) => {
      const target = e.target as HTMLButtonElement;
      setAnchorEl(target);
    };

    const closeMenu = () => {
      setAnchorEl(null);
    };

    return (
      <>
        <Button
          variant="ghost_icon"
          onClick={(e) => (isOpen ? closeMenu() : openMenu(e))}
          ref={ref}
        >
          <Icon
            data={settings}
            size={24}
            color={colors.interactive.primary__resting.hsla}
          />
        </Button>
        {isOpen && (
          <StyledMenu
            id="menu-on-button"
            aria-labelledby="menuButton"
            open={isOpen}
            anchorEl={anchorEl}
            onClose={closeMenu}
            placement="bottom-start"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" as="span">
                Settings
              </Typography>
              <Button variant="ghost_icon" onClick={closeMenu}>
                <Icon data={clear} />
              </Button>
            </Box>
            {allSettings.map((items, ind) => (
              <div key={ind}>
                <Typography variant="overline">{items.title}</Typography>
                {items.items.map((item, index) => (
                  <Box paddingRight="40px" key={index}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Radio
                        label={item.label}
                        name={item.name}
                        value={item.value}
                        checked={items.type === item.value}
                        onChange={() => items.onChange?.(item.value)}
                      />
                      {item.colorBox && (
                        <StyledColorBox color={item.colorBox} />
                      )}
                      {item.element && (
                        <Typography variant="h6">{item.element}</Typography>
                      )}
                    </Box>
                  </Box>
                ))}
              </div>
            ))}
          </StyledMenu>
        )}
      </>
    );
  }
);

export default Settings;
Settings.displayName = 'TopBar.Settings';
