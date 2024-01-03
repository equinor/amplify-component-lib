import { ChangeEvent, FC, useRef, useState } from 'react';

import { Button, Icon, Search, Typography } from '@equinor/eds-core-react';
import { apps } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import ApplicationIcon from '../../../Icons/ApplicationIcon/ApplicationIcon';
import TopBarMenu from '../TopBarMenu';
import ShortcutOptions from './ShortcutOptions';

import styled from 'styled-components';

const { spacings, colors } = tokens;

const MenuSection = styled.div`
  border-bottom: 1px solid ${colors.ui.background__light.hex};
  display: flex;
  flex-direction: column;
  > p {
    margin-left: ${spacings.comfortable.large};
    margin-bottom: ${spacings.comfortable.small};
  }
`;

const ApplicationName = styled.div`
  display: flex;
  align-items: flex-start;
`;

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

export const ApplicationBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${spacings.comfortable.medium} ${spacings.comfortable.small};
  //align-items: center;
  &:hover {
    background: ${colors.ui.background__light.hex};
  }
`;

export type applicationsProps = {
  name: string;
  icon: string;
};

const applications: applicationsProps[] = [
  { name: 'Dasha', icon: 'dasha' },
  { name: 'PWEX', icon: 'pwex' },
  { name: 'Inpress', icon: 'inpress' },
  { name: 'Orca', icon: 'orca' },
  { name: 'Acquire', icon: 'acquire' },
  { name: 'dasha', icon: 'dasha' },
  { name: 'dasha', icon: 'dasha' },
];

const ApplicationDrawer: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // const [anchorEl, setAnchorEl] = useState('');

  // const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleOnSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    setSearchValue(search);
  };

  const searchData = applications.filter((search) => {
    if (searchValue === '') {
      return search;
    } else {
      return search.name.toLowerCase().includes(searchValue);
    }
  });

  return (
    <>
      <Button variant="ghost" onClick={toggleMenu} ref={buttonRef}>
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
              onChange={handleOnSearch}
            />
          </SearchContainer>

          <ApplicationContent>
            {searchData.map((item, index) => {
              return (
                <ApplicationBox key={index}>
                  <div style={{ display: 'flex' }}>
                    <ApplicationIcon name={item.icon} />
                    <ShortcutOptions applicationsItem={item} />
                  </div>
                  <ApplicationName>
                    <Typography>{item.name}</Typography>
                  </ApplicationName>
                </ApplicationBox>
              );
            })}
          </ApplicationContent>
        </MenuSection>
      </TopBarMenu>
    </>
  );
};

export default ApplicationDrawer;
