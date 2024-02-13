import { FC, ReactNode, useMemo, useRef, useState } from 'react';

import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { close, notifications as notificationIcon } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { useOutsideClick } from '@equinor/eds-utils';

import { TopBarButton } from '../TopBar.styles';
import NoNotifications from './NotificationsTemplate/NotificationElements/NoNotifications';
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
  background-color: ${colors.ui.background__default.rgba};
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
  padding: ${spacings.comfortable.medium};
  align-items: center;
  border-bottom: 1px solid ${colors.ui.background__medium.rgba};
  position: sticky;
  top: 0;
  background-color: ${colors.ui.background__default.rgba};
  z-index: 3000;
`;

export const UnreadRedDot = styled.div`
  background-color: ${colors.interactive.danger__resting.rgba};
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: absolute;
  right: 2px;
  top: 4px;
  //box-shadow:
  //  0 2px 4px rgba(0, 0, 0, 0.14),
  //  0 3px 4px rgba(0, 0, 0, 0.12);
  border: 2px solid ${colors.text.static_icons__primary_white.rgba};
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
}

export const Notifications: FC<NotificationsProps> = ({
  children,
  hasUnread = false,
  setAllAsRead,
  showFilterOptions = false,
  notifications,
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
        const aUnixTime = new Date(a.time).getTime();
        const bUnixTime = new Date(b.time).getTime();

        if (sortingOn.includes(SortNotification.OLD_NEWEST)) {
          return bUnixTime - aUnixTime;
        } else if (sortingOn.includes(SortNotification.UNREAD)) {
          return a.Read === b.Read ? 0 : a.Read ? 1 : -1;
        } else {
          return aUnixTime - bUnixTime;
        }
      });
    }

    return copy;
  }, [filteringOn, notifications, sortingOn]);

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
        variant="ghost"
        key="topbar-notifications"
        ref={buttonRef}
        onClick={handleButtonClick}
        data-testid="show-hide-button"
        $isSelected={notificationsOpen}
      >
        <Icon
          data={notificationIcon}
          size={24}
          color={
            notificationsOpen
              ? '#132E31'
              : colors.interactive.primary__resting.hsla
          }
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

        {children ? (
          children
        ) : (
          <>
            {filteredAndSortedNotifications &&
            filteredAndSortedNotifications?.length > 0 ? (
              filteredAndSortedNotifications.map((item) => {
                return (
                  <NotificationTemplate {...item} key={item.SequenceNumber} />
                );
              })
            ) : (
              <NoNotifications />
            )}
          </>
        )}
      </SidePanel>
    </>
  );
};
Notifications.displayName = 'TopBar.Notifications';
