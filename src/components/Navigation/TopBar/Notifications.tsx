import { FC, ReactNode, useRef, useState } from 'react';

import { Button, Divider, Icon, Typography } from '@equinor/eds-core-react';
import { close, notifications as notificationIcon } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { useOutsideClick } from '@equinor/eds-utils';

import styled from 'styled-components';

const { colors, spacings } = tokens;

interface SidePanelProps {
  open: boolean;
}

const SidePanel = styled.div<SidePanelProps>`
  height: calc(100vh - 64px);
  width: 320px;
  z-index: 100;
  background-color: ${colors.ui.background__default.hex};
  position: fixed;
  bottom: 0;
  right: 0;
  overflow: auto;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(0, 0, 0, 0.12);
  ${(props) => !props.open && 'display: none;'}
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${spacings.comfortable.medium_small};
  align-items: center;
`;

const NoNotifications = styled.div`
  color: ${colors.text.static_icons__tertiary.hex};
  text-align: center;
`;

export const UnreadRedDot = styled.div`
  background-color: ${colors.logo.fill_positive.hex};
  width: 12px;
  height: 12px;
  border-radius: 50%;
  position: absolute;
  right: 7px;
  top: 7px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.14), 0px 3px 4px rgba(0, 0, 0, 0.12);
`;

interface NotificationsProps {
  setAllAsRead: () => void;
  hasUnread?: boolean;
  children?: ReactNode;
}

const Notifications: FC<NotificationsProps> = ({
  children,
  hasUnread = false,
  setAllAsRead,
}) => {
  const sidePanelRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const onClose = () => {
    setAllAsRead();
    setNotificationsOpen(!notificationsOpen);
  };

  useOutsideClick(sidePanelRef.current, (event) => {
    if (
      notificationsOpen &&
      buttonRef.current !== null &&
      !buttonRef.current?.contains(event.target as Node)
    ) {
      setAllAsRead();
      setNotificationsOpen(false);
    }
  });

  return (
    <>
      <Button
        variant="ghost_icon"
        key="topbar-notifications"
        ref={buttonRef}
        onClick={() => setNotificationsOpen(!notificationsOpen)}
      >
        <Icon
          data={notificationIcon}
          size={24}
          color={colors.interactive.primary__resting.hsla}
        />
        {hasUnread && <UnreadRedDot />}
      </Button>
      <SidePanel className="test" ref={sidePanelRef} open={notificationsOpen}>
        <Header>
          <Typography variant="h6" group="heading">
            Notifications
          </Typography>
          <Button variant="ghost_icon" onClick={onClose}>
            <Icon data={close} color="secondary" />
          </Button>
        </Header>
        <Divider />
        {children ? (
          children
        ) : (
          <NoNotifications>No notifications</NoNotifications>
        )}
      </SidePanel>
    </>
  );
};
Notifications.displayName = 'TopBar.Notifications';

export default Notifications;
