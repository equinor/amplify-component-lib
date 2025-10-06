import { FC, ReactNode, useContext, useMemo, useRef, useState } from 'react';

import { Icon, Radio, Typography } from '@equinor/eds-core-react';
import { settings } from '@equinor/eds-icons';

import { TopBarButton } from './TopBar.styles';
import { TopBarMenu } from './TopBarMenu';
import { Theme } from 'src/atoms/enums';
import { elevation, spacings } from 'src/atoms/style';
import { SettingsSection } from 'src/organisms/TopBar/Settings.types';
import { ThemeProviderContext } from 'src/providers/ThemeProvider/ThemeProvider';

import styled from 'styled-components';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${spacings.x_small};
  padding: 0 ${spacings.large} 0 ${spacings.small};
  justify-content: space-between;
  > span {
    padding: ${spacings.small} ${spacings.x_small};
  }
`;

interface StyledColorBoxProps {
  $color: string;
}

const StyledColorBox = styled.div<StyledColorBoxProps>`
  width: 64px;
  height: 32px;
  background-color: ${(props) => props.$color};
  box-shadow: ${elevation.raised};
  border-radius: 4px;
`;

const SettingsItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium};
  > div > p {
    padding-top: ${spacings.small};
    padding-left: ${spacings.medium};
  }
`;

export interface SettingsProps {
  allSettings?: SettingsSection[];
  children?: ReactNode | ReactNode[];
}

export const Settings: FC<SettingsProps> = ({ allSettings, children }) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const themeContext = useContext(ThemeProviderContext);

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const usingSettings: SettingsSection[] = useMemo(() => {
    // App is using ThemeProvider
    if (themeContext) {
      return [
        {
          title: 'Theme',
          value: themeContext.theme,
          onChange: (value: string) => themeContext.setTheme(value as Theme),
          items: [
            {
              label: 'Light Mode',
              name: 'theme-group',
              value: Theme.LIGHT,
              colorBox: '#ffffff',
            },
            {
              label: 'Dark Mode',
              name: 'theme-group',
              value: Theme.DARK,
              colorBox: '#243746',
            },
          ],
        },
        ...(allSettings ?? []),
      ];
    }

    return allSettings ?? [];
  }, [allSettings, themeContext]);

  if (usingSettings.length === 0) {
    throw new Error('Empty settings in TopBar.Settings!');
  }

  return (
    <>
      <TopBarButton
        variant="ghost_icon"
        onClick={toggleMenu}
        ref={buttonRef}
        data-testid="show-hide-button"
      >
        <Icon data={settings} size={24} />
      </TopBarButton>
      <TopBarMenu
        open={isOpen}
        title="Settings"
        onClose={closeMenu}
        anchorEl={buttonRef.current}
      >
        <SettingsItems>
          {usingSettings.map((section, index) => (
            <div key={index}>
              <Typography variant="overline">{section.title}</Typography>
              {section.items.map((item, itemIndex) => (
                <ContentWrapper key={itemIndex}>
                  <Radio
                    id={item.label}
                    disabled={item.disabled}
                    label={item.label}
                    name={section.title}
                    value={`${item.label}-${itemIndex}`}
                    checked={section.value === item.value}
                    onChange={() => section.onChange?.(item.value as never)}
                  />
                  {item.colorBox && (
                    <StyledColorBox
                      $color={item.colorBox}
                      data-testid={`colorbox-${item.colorBox}`}
                    />
                  )}
                  {item.text && (
                    <Typography variant="h6">{item.text}</Typography>
                  )}
                  {item.element && item.element}
                </ContentWrapper>
              ))}
            </div>
          ))}
        </SettingsItems>
        {children}
      </TopBarMenu>
    </>
  );
};

Settings.displayName = 'TopBar.Settings';
