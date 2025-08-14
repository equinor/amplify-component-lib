import { FC, ReactNode, useMemo, useRef, useState } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { notifications as notificationIcon } from '@equinor/eds-icons';

import { TopBarButton, UnreadRedDot } from '../TopBar.styles';
import { TopBarMenu } from '../TopBarMenu';
import { NoNotifications } from './NotificationsTemplate/NotificationElements/NoNotifications';
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
import { NotificationTemplate } from './NotificationsTemplate/NotificationTemplate';
import { FilterOptions } from './FilterOptions';
import { useNotification } from './NotificationProvider';

import styled from 'styled-components';

const FilterOptionsContainer = styled.div`
  display: flex;
`;

const Content = styled.div`
  overflow: auto;
  height: fit-content;
  max-height: 66vh;
  width: 350px;
`;

export interface NotificationsProps {
  setAllAsRead: () => void;
  hasUnread?: boolean;
  showFilterOptions?: boolean;
  children?: ReactNode | (({ onClose }: { onClose: () => void }) => ReactNode);
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

export const NotificationsInner: FC<NotificationsProps> = ({
  children,
  hasUnread = false,
  setAllAsRead,
  showFilterOptions = false,
  notifications,
}) => {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const filterMenuRef = useRef<HTMLDivElement | null>(null);
  const sortMenuRef = useRef<HTMLDivElement | null>(null);

  const { isOpen, setIsOpen } = useNotification();

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
    if (isOpen) {
      onClose();
    } else {
      setIsOpen(true);
    }
  };

  const onClose = () => {
    setAllAsRead();
    setIsOpen(false);
  };

  return (
    <>
      <TopBarButton
        variant="ghost_icon"
        key="topbar-notifications"
        ref={buttonRef}
        onClick={handleButtonClick}
        data-testid="show-hide-button"
      >
        <Icon data={notificationIcon} size={24} />
        {hasUnread && <UnreadRedDot data-testid="unread-dot" />}
      </TopBarButton>
      <TopBarMenu
        open={isOpen}
        anchorEl={buttonRef.current}
        contentPadding={false}
        isNotification
        onClose={onClose}
      >
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
          <Content>
            {children instanceof Function ? children({ onClose }) : children}
          </Content>
        ) : (
          <Content>
            {filteredAndSortedNotifications &&
            filteredAndSortedNotifications?.length > 0 ? (
              filteredAndSortedNotifications.map((item) => {
                return (
                  <NotificationTemplate key={item.SequenceNumber} {...item} />
                );
              })
            ) : (
              <NoNotifications />
            )}
          </Content>
        )}
      </TopBarMenu>
    </>
  );
};
NotificationsInner.displayName = 'TopBar.NotificationsInner';
