import { FC, useMemo } from 'react';

import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { delete_to_trash } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import OptionalTooltip from '../../../../DataDisplay/OptionalTooltip';
import ApplicationIcon from '../../../../Icons/ApplicationIcon/ApplicationIcon';
import { ProfileAvatar } from '../../../../index';
import DeafultNotification from './NotificationElements/DeafultNotification';
import ExperienceDue3Weeks from './NotificationElements/ExperienceDue3Weeks';
import MergedBranchOrca from './NotificationElements/MergedBranchOrca';
import ReadyToBePublished from './NotificationElements/ReadyToBePublished';
import ReadyToReportNotification from './NotificationElements/ReadyToReportNotification';
import RequestChangeOrca from './NotificationElements/RequestChangeOrca';
import RequestReviewOrca from './NotificationElements/RequestReviewOrca';
import ReviewQANotification from './NotificationElements/ReviewQANotification';
import {
  DefaultNotificationTypes,
  Due3WeeksTypes,
  ExperienceReadyToPublishTypes,
  MergeBranchOrcaTypes,
  NotificationsTypes,
  ReadyToReportNotificationTypes,
  RequestChangeOrcaTypes,
  RequestReviewOrcaTypes,
  ReviewQANotificationsTypes,
} from './Notifications.types';

import styled from 'styled-components';

const { spacings, colors } = tokens;

const Wrapper = styled.div`
  padding: ${spacings.comfortable.medium};
  border-bottom: 1px solid ${colors.ui.background__medium.hex};
  &:hover {
    background: #f2f2f2;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: span 3;
  padding: ${spacings.comfortable.small};
  cursor: pointer;
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
  grid-column: span 3;
`;

interface UserInformationProps {
  $systemUser?: boolean;
}

const UserInformation = styled.div<UserInformationProps>`
  display: flex;
  flex-direction: row;
  align-items: ${({ $systemUser }) => ($systemUser ? 'flex-start' : 'center')};
  gap: ${spacings.comfortable.small};
`;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${spacings.comfortable.medium_small};
  grid-column: span 3;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 0 ${spacings.comfortable.small};
`;
const DeleteButton = styled(Button)`
  display: none;
  ${GridContainer}:hover & {
    display: initial;
  }
`;

const NotificationTemplate: FC<
  | ReadyToReportNotificationTypes
  | DefaultNotificationTypes
  | RequestReviewOrcaTypes
  | RequestChangeOrcaTypes
  | MergeBranchOrcaTypes
  | ExperienceReadyToPublishTypes
  | ReviewQANotificationsTypes
  | Due3WeeksTypes
> = (props) => {
  const {
    user,
    notificationType,
    applicationName,
    Read,
    field,
    time,
    footer = true,
    onDelete,
  } = props;
  const content = useMemo(() => {
    switch (notificationType) {
      case NotificationsTypes.READY_TO_REPORT:
        return (
          <ReadyToReportNotification {...props} onClick={() => console.log()} />
        );
      case NotificationsTypes.DEFAULT:
        return <DeafultNotification {...props} />;
      case NotificationsTypes.REQUESTED_REVIEW:
        return <RequestReviewOrca {...props} onClick={() => console.log()} />;
      case NotificationsTypes.REQUESTED_CHANGES:
        return <RequestChangeOrca {...props} onClick={() => console.log()} />;
      case NotificationsTypes.MERGE_BRANCH:
        return <MergedBranchOrca {...props} onClick={() => console.log()} />;
      case NotificationsTypes.QA_COMMENTS:
        return (
          <ReviewQANotification {...props} onClick={() => console.log()} />
        );
      case NotificationsTypes.EXPERIENCE_READY_TO_PUBLISH:
        return <ReadyToBePublished {...props} onClick={() => console.log()} />;
      case NotificationsTypes.DUE_3_WEEKS:
        return <ExperienceDue3Weeks {...props} onClick={() => console.log()} />;
    }
  }, [props, notificationType]);

  return (
    <Wrapper>
      <GridContainer>
        <TopContainer>
          {user ? (
            <UserInformation>
              {!Read && <Dot />}
              <ProfileAvatar
                url={user?.image ?? ''}
                name={user?.shortName ?? 'display name'}
                size="large"
              />
              <div>
                <Typography>{user?.displayName}</Typography>
                <Typography group="paragraph" variant="meta">
                  {user?.shortName}
                </Typography>
              </div>
            </UserInformation>
          ) : (
            <UserInformation $systemUser>
              {!Read && <Dot />}
              <ApplicationIcon name="pwex" />

              <Typography group="heading" variant="h6">
                {applicationName}
              </Typography>
            </UserInformation>
          )}

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
        <Content>{content}</Content>

        {footer && (
          <FooterContainer>
            <div style={{ display: 'flex', gap: '5px' }}>
              <Typography
                group="navigation"
                variant="label"
                color={colors.text.static_icons__tertiary.hex}
              >
                {applicationName}
              </Typography>

              <Typography
                group="navigation"
                variant="label"
                color={colors.text.static_icons__tertiary.hex}
              >
                {field}
              </Typography>
            </div>
            <OptionalTooltip title="Delete notification">
              <DeleteButton onClick={onDelete} variant="ghost_icon">
                <Icon data={delete_to_trash} />
              </DeleteButton>
            </OptionalTooltip>
          </FooterContainer>
        )}
      </GridContainer>
    </Wrapper>
  );
};

export default NotificationTemplate;
