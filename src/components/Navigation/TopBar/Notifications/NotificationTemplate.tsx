import { FC, useMemo } from 'react';

import { Chip, Divider, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { ProfileAvatar } from '../../../index';
import DeafultNotification from './NotificationElements/DeafultNotification';
import ExperienceDue3Weeks from './NotificationElements/ExperienceDue3Weeks';
import NoNotifications from './NotificationElements/NoNotifications';
import ReadyToReportNotification from './NotificationElements/ReadyToReportNotification';
import ReviewQANotification from './NotificationElements/ReviewQANotification';
import SystemUserDefault from './NotificationElements/SystemUserDefault';

import styled from 'styled-components';

const { spacings, colors } = tokens;

const Wrapper = styled.div`
  padding: ${spacings.comfortable.medium};
  border-bottom: 1px solid ${colors.ui.background__medium.hex};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: 2 / 3;
  padding-right: ${spacings.comfortable.medium};
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 10px 1fr;
  grid-gap: ${spacings.comfortable.medium_small};
  align-items: center;
`;

const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${colors.infographic.substitute__blue_overcast.hex};
  position: relative;
`;

const TopContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  gap: ${spacings.comfortable.medium_small};
  justify-items: end;
`;

const UserInformation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${spacings.comfortable.medium};
`;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${spacings.comfortable.medium_small};
  grid-column: 2 / 3;
`;

export type userNotification = {
  userRole: string;
  shortName: string;
  displayName: string;
  image: string;
};

type SignalRMessage = {
  SequenceNumber: number;
  Read: boolean;
  Subject?: string | null;
};

export type NotificationDto = {
  notificationId?: string | null;
  fromUser: userNotification;
  toUser: userNotification;
  applicationName: string;
  time: string;
  footer?: boolean;
  notificationType: NotificationsTypes;
} & SignalRMessage;

enum NotificationsTypes {
  READY_TO_REPORT = 'readytoreport',
  DEFAULT = 'default',
}

type ReadyToReportNotificationProps = {
  dataType: string;
  wellbore: string;
  notificationType: NotificationsTypes.READY_TO_REPORT;
} & NotificationDto;

type DefaultNotificationProps = {
  notificationType: NotificationsTypes.DEFAULT;
} & NotificationDto;

const NotificationTemplate: FC<
  ReadyToReportNotificationProps | DefaultNotificationProps
> = ({
  fromUser,
  notificationType,
  applicationName,
  Read,

  time,
  footer = true,
}) => {
  console.log(Read, 'read');

  const content = useMemo(() => {
    switch (notificationType) {
      case NotificationsTypes.READY_TO_REPORT:
        return <ReadyToReportNotification />;
      case NotificationsTypes.DEFAULT:
        return <DeafultNotification />;
    }
  }, [notificationType]);

  return (
    <Wrapper>
      <GridContainer>
        {Read ? <div></div> : <Dot />}

        <TopContainer>
          <UserInformation>
            <ProfileAvatar
              url={fromUser?.image ?? ''}
              name={fromUser?.displayName ?? 'display name'}
              size="large"
            />
            <div>
              <Typography>{fromUser.shortName}</Typography>
              <Typography group="paragraph" variant="meta">
                {fromUser.displayName}
              </Typography>
            </div>
          </UserInformation>

          <Typography
            group="navigation"
            variant="label"
            color={
              Read
                ? colors.text.static_icons__secondary.hex
                : colors.infographic.substitute__blue_overcast.hex
            }
          >
            {time}
          </Typography>
        </TopContainer>
        {/*<Content>{content}</Content>*/}
        <Content>
          <ReadyToReportNotification />
        </Content>
        {footer && (
          <FooterContainer>
            <Typography
              group="navigation"
              variant="label"
              color={colors.text.static_icons__tertiary.hex}
            >
              {/*This is which application it is , make a check */}
              Application
            </Typography>

            <Typography
              group="navigation"
              variant="label"
              color={colors.text.static_icons__tertiary.hex}
            >
              {/*Should be field */}
              {applicationName}
            </Typography>
          </FooterContainer>
        )}
      </GridContainer>
    </Wrapper>
  );
};

export default NotificationTemplate;
