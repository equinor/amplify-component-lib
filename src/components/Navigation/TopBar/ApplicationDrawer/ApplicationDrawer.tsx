import { FC, useRef, useState } from 'react';

import { Button, Icon, Search, Typography } from '@equinor/eds-core-react';
import { apps, more_vertical } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import ApplicationIcon from '../../../Icons/ApplicationIcon/ApplicationIcon';
import TopBarMenu from '../TopBarMenu';
import ShortcutOptions from './ShortcutOptions';

import styled from 'styled-components';

const { spacings, colors, shape } = tokens;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.medium};
`;

const MenuSection = styled.div`
  border-bottom: 1px solid ${colors.ui.background__light.hex};
  display: flex;
  flex-direction: column;
  > p {
    margin-left: ${spacings.comfortable.large};
    margin-bottom: ${spacings.comfortable.small};
  }
`;
type applicationsProps = {
  name: string;
  icon: string;
};

const applications: applicationsProps[] = [
  { name: 'dasha', icon: 'dasha' },
  { name: 'dasha', icon: 'dasha' },
  { name: 'dasha', icon: 'dasha' },
  { name: 'dasha', icon: 'dasha' },
  { name: 'dasha', icon: 'dasha' },
  { name: 'dasha', icon: 'dasha' },
  { name: 'dasha', icon: 'dasha' },
];

const ApplicationDrawer: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [shortcutOptions, setShortcutOptions] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  // const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const showShortcutOptions = () => {
    setShortcutOptions(true);
  };

  const closeShortcutOptions = () => {
    setShortcutOptions(false);
  };

  return (
    <>
      <Button variant="ghost" onClick={toggleMenu}>
        <Icon
          data={apps}
          size={24}
          color={colors.interactive.primary__resting.hsla}
        />
      </Button>
      <TopBarMenu
        open={isOpen}
        title="Application drawer"
        onClose={closeMenu}
        anchorEl={buttonRef.current}
      >
        <MenuSection>
          <SearchContainer>
            <Search
              placeholder="Search application"
              value={[]}
              onChange={() => console.log('search')}
            />
          </SearchContainer>

          <ApplicationContent>
            {applications.map((item, index) => {
              return (
                <Application key={index}>
                  <div style={{ display: 'flex' }}>
                    <ApplicationIcon name={item.icon} />
                    <Button
                      onClick={showShortcutOptions}
                      variant="ghost_icon"
                      ref={setAnchorEl}
                    >
                      <OptionsIcon data={more_vertical} />
                    </Button>
                    {shortcutOptions && (
                      <ShortcutOptions
                        open={shortcutOptions}
                        anchorEl={anchorEl}
                        onClose={closeShortcutOptions}
                      />
                    )}
                  </div>
                  <div style={{ display: 'flex' }}>
                    {' '}
                    <Typography>{item.name}</Typography>
                  </div>
                </Application>
              );
            })}
          </ApplicationContent>
        </MenuSection>
      </TopBarMenu>
    </>
  );
};

export default ApplicationDrawer;

const ApplicationContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: ${spacings.comfortable.medium} 0;
  justify-items: center;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.small};
  //padding: ${spacings.comfortable.large};
  padding-bottom: ${spacings.comfortable.x_small};
  div[role='search'] {
    > div {
      outline: none !important;
    }
    input:focus {
      box-shadow: inset 0px -2px 0px 0px ${colors.interactive.primary__resting.hex};
    }
  
`;

const Application = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${spacings.comfortable.medium} ${spacings.comfortable.small};
  align-items: center;
  &:hover {
    background: ${colors.ui.background__light.hex};
  }
`;

const OptionsIcon = styled(Icon)`
  display: none;
  &:hover {
    border-radius: ${shape.circle.borderRadius};
    background: ${colors.interactive.secondary__highlight.hex};
    //padding: 5px;
  }
  ${Application}:hover & {
    display: initial;
  }
`;
