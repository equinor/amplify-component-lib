import { FC, ReactNode, useMemo, useRef, useState } from 'react';

import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { close, notifications as notificationIcon } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { useOutsideClick } from '@equinor/eds-utils';

import { TopBarButton } from '../TopBar.styles';
import {
  DefaultNotificationTypes,
  Due3WeeksTypes,
  ExperienceReadyToPublishTypes,
  FilterNotification,
  MergeBranchOrcaTypes,
  ReadyToReportNotificationTypes,
  RequestChangeOrcaTypes,
  RequestReviewOrcaTypes,
  ReviewQANotificationsTypes,
  SortNotification,
} from './NotificationsTemplate/Notifications.types';
import NotificationTemplate from './NotificationsTemplate/NotificationTemplate';
import FilterOptions from './FilterOptions';

import styled from 'styled-components';

const { colors, spacings } = tokens;

interface SidePanelProps {
  $open: boolean;
}

const SidePanel = styled.div<SidePanelProps>`
  height: calc(100vh - 64px);
  width: 350px;
  z-index: 100;
  background-color: ${colors.ui.background__default.hex};
  position: fixed;
  bottom: 0;
  right: 0;
  overflow: auto;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.14),
    0 3px 4px rgba(0, 0, 0, 0.12);
  display: ${({ $open }) => ($open ? 'initial' : 'none')};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${spacings.comfortable.small} ${spacings.comfortable.medium};
  padding-right: ${spacings.comfortable.small};
  align-items: center;
  padding-bottom: ${spacings.comfortable.medium};
  border-bottom: 1px solid ${colors.ui.background__medium.hex};
`;

export const UnreadRedDot = styled.div`
  background-color: ${colors.interactive.danger__hover.hex};
  width: 12px;
  height: 12px;
  border-radius: 50%;
  position: absolute;
  right: 7px;
  top: 7px;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.14),
    0 3px 4px rgba(0, 0, 0, 0.12);
  border: 1.5px solid ${colors.text.static_icons__primary_white.hex};
`;

const FilterOptionsContainer = styled.div`
  display: flex;
`;

interface NotificationsProps {
  setAllAsRead: () => void;
  hasUnread?: boolean;
  showFilterOptions?: boolean;
  children?: ReactNode;
  notifications?: (
    | ReadyToReportNotificationTypes
    | RequestChangeOrcaTypes
    | MergeBranchOrcaTypes
    | Due3WeeksTypes
    | ExperienceReadyToPublishTypes
    | ReviewQANotificationsTypes
    | DefaultNotificationTypes
    | RequestReviewOrcaTypes
  )[];
  hasChildren?: boolean;
}

const Notifications: FC<NotificationsProps> = ({
  children,
  hasUnread = false,
  setAllAsRead,
  showFilterOptions = false,
  notifications,
  hasChildren,
}) => {
  const sidePanelRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const filterMenuRef = useRef<HTMLDivElement | null>(null);
  const sortMenuRef = useRef<HTMLDivElement | null>(null);

  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const [filteringOn, setFilteringOn] = useState<FilterNotification[]>([]);

  const [sortingOn, setSortingOn] = useState<SortNotification[]>([]);

  const filteredAndSortedNotifications = useMemo(() => {
    if (!notifications) return [];
    let copy = [...notifications];

    if (filteringOn.length > 0) {
      copy = copy.filter((notification) => {
        if (filteringOn.includes(FilterNotification.UNREAD)) {
          return !notification.Read;
        } else if (filteringOn.includes(FilterNotification.USER)) {
          return notification.user;
        } else if (filteringOn.includes(FilterNotification.SYSTEM)) {
          return !notification.user;
        }
      });
    }
    if (sortingOn.length > 0) {
      copy = copy.sort((a, b) => {
        if (sortingOn.includes(SortNotification.OLD_NEWEST)) {
          return b.time - a.time;
        } else if (sortingOn.includes(SortNotification.UNREAD)) {
          return a.Read === b.Read ? 0 : a.Read ? 1 : -1;
        } else {
          return a.time - b.time;
        }
      });
    }

    return copy;
  }, [filteringOn, notifications, sortingOn]);

  console.log(filteredAndSortedNotifications, 'filter');

  const handleButtonClick = () => {
    if (notificationsOpen) {
      onClose();
    } else {
      setNotificationsOpen(true);
    }
  };

  const onClose = () => {
    setAllAsRead();
    setNotificationsOpen(false);
  };

  useOutsideClick(sidePanelRef.current, (event) => {
    if (
      notificationsOpen &&
      buttonRef.current !== null &&
      !buttonRef.current?.contains(event.target as Node) &&
      !filterMenuRef.current?.contains(event.target as Node) &&
      !sortMenuRef.current?.contains(event.target as Node)
    ) {
      onClose();
    }
  });

  return (
    <>
      <TopBarButton
        variant="ghost_icon"
        key="topbar-notifications"
        ref={buttonRef}
        onClick={handleButtonClick}
        data-testid="show-hide-button"
        $isSelected={notificationsOpen}
      >
        <Icon
          data={notificationIcon}
          size={24}
          color={colors.interactive.primary__resting.hsla}
        />
        {hasUnread && <UnreadRedDot data-testid="unread-dot" />}
      </TopBarButton>
      <SidePanel
        ref={sidePanelRef}
        $open={notificationsOpen}
        data-testid="side-panel"
      >
        <Header>
          <Typography variant="h6" group="heading">
            Notifications
          </Typography>
          <Button variant="ghost_icon" onClick={onClose}>
            <Icon data={close} color="secondary" />
          </Button>
        </Header>
        {showFilterOptions && (
          <FilterOptionsContainer>
            <FilterOptions
              onFilter={setFilteringOn}
              onSort={setSortingOn}
              sortMenuRef={sortMenuRef}
              filterMenuRef={filterMenuRef}
            />
          </FilterOptionsContainer>
        )}
        {hasChildren ? (
          children
        ) : (
          <>
            {filteredAndSortedNotifications.map((item) => {
              return (
                <NotificationTemplate {...item} key={item.SequenceNumber} />
              );
            })}
          </>
        )}
      </SidePanel>
    </>
  );
};
Notifications.displayName = 'TopBar.Notifications';

export default Notifications;
