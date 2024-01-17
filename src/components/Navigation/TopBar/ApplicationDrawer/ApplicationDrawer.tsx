import { FC, useRef, useState } from 'react';

import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { apps, exit_to_app } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { useQuery } from '@tanstack/react-query';

import { environment } from '../../../../utils';
import ApplicationIcon from '../../../Icons/ApplicationIcon/ApplicationIcon';
import PortalTransit from '../Help/ApplicationTransit/PortalTransit';
import { TopBarButton } from '../TopBar.styles';
import TopBarMenu from '../TopBarMenu';
import { PortalService } from 'src/api/services/PortalService';

import styled from 'styled-components';

const { spacings, colors, shape } = tokens;

const MenuSection = styled.div`
  border-bottom: 1px solid ${colors.ui.background__light.hex};
  display: flex;
  flex-direction: column;
  > p {
    margin-left: ${spacings.comfortable.small};
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
  padding: 0;
  justify-items: center;
`;

interface ApplicationBoxProps {
  $isSelected?: boolean;
}

export const ApplicationBox = styled.div<ApplicationBoxProps>`
  display: flex;
  flex-direction: column;
  padding: ${spacings.comfortable.medium} ${spacings.comfortable.large};
  gap: ${spacings.comfortable.medium};
  align-items: center;
  background: ${({ $isSelected }) =>
    $isSelected ? colors.interactive.primary__selected_highlight.hex : 'none'};
  border-radius: ${shape.corners.borderRadius};
  &:hover {
    background: ${colors.interactive.primary__hover_alt.hex};
    border-radius: ${shape.corners.borderRadius};
  }
`;

export type applicationsProps = {
  name: string;
  icon: string;
  isSelected?: boolean;
};

const applications: applicationsProps[] = [
  { name: 'Dasha', icon: 'dasha', isSelected: true },
  { name: 'PWEX', icon: 'pwex', isSelected: false },
  { name: 'Inpress', icon: 'inpress', isSelected: false },
  { name: 'Orca', icon: 'orca', isSelected: false },
  { name: 'Acquire', icon: 'acquire', isSelected: false },
  { name: 'dasha', icon: 'dasha', isSelected: false },
  { name: 'dasha', icon: 'dasha', isSelected: false },
];

const ApplicationDrawer: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openApplication, setOpenApplication] = useState(false);
  const { getAppName } = environment;

  const { data } = useQuery({
    queryKey: [`userApplications`],
    queryFn: () => PortalService.userApplications(),
  });

  console.log(data);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => {
    setIsOpen(false);
    setOpenApplication(false);
  };

  const handleOnApplicationClick = (value: string) => {
    setOpenApplication(true);
    window.location.href = `${value}`;
  };

  const handleMoreAccess = () => {
    setOpenApplication(true);
    window.location.href =
      'https://client-amplify-portal-production.radix.equinor.com/dashboard';
  };

  return (
    <>
      <TopBarButton
        variant="ghost_icon"
        onClick={toggleMenu}
        ref={buttonRef}
        $isSelected={isOpen}
      >
        <Icon
          data={apps}
          size={24}
          color={colors.interactive.primary__resting.hsla}
        />
      </TopBarButton>
      <TopBarMenu
        open={isOpen}
        title="Your available applications"
        onClose={closeMenu}
        anchorEl={buttonRef.current}
      >
        <MenuSection>
          {data?.length === 0 ? (
            <NoApplications>
              <Typography
                group="paragraph"
                dasha
                variant="body_short"
                style={{ color: colors.text.static_icons__tertiary.hex }}
              >
                You don´t have access to other applications{' '}
              </Typography>
            </NoApplications>
          ) : (
            <Typography group="paragraph" variant="overline">
              SWITCH BETWEEN APPS
            </Typography>
          )}

          <ApplicationContent>
            {data?.map((item, index) => {
              const isSelected =
                getAppName(import.meta.env.VITE_NAME) === item.name;
              return (
                <ApplicationBox key={index} $isSelected={isSelected}>
                  <Button
                    variant="ghost_icon"
                    onClick={() => handleOnApplicationClick(item.url)}
                  >
                    <ApplicationIcon name={item.name.toLowerCase()} />
                  </Button>
                  <ApplicationName>
                    <Typography>{item.name}</Typography>
                  </ApplicationName>
                </ApplicationBox>
              );
            })}
          </ApplicationContent>
        </MenuSection>

        <MenuFixedItem data-testid="access-it-link" onClick={handleMoreAccess}>
          <div>
            <TextContainer>
              <Typography variant="overline">
                Access to more applications?
              </Typography>
              <Typography variant="h6">Go to Application Portal</Typography>
            </TextContainer>
            <Icon
              data={exit_to_app}
              color={colors.interactive.primary__resting.hex}
              size={24}
            />
          </div>
        </MenuFixedItem>
      </TopBarMenu>
      {openApplication && (
        <PortalTransit open={openApplication} onClose={closeMenu} />
      )}
    </>
  );
};

export default ApplicationDrawer;

const MenuFixedItem = styled.div`
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
  svg {
    align-self: center;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  > h6 {
    text-transform: capitalize;
  }
`;

const NoApplications = styled.div`
  display: flex;
  padding: ${spacings.comfortable.medium};
`;
