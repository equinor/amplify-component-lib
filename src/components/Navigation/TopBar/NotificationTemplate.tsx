import { FC } from 'react';

import { Chip, Divider, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { ProfileAvatar } from '../../index';

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

export type NotificationDto = {
  notificationId?: string | null;
  message: string;
  fromUser: userNotification;
  toUser: userNotification;
  SequenceNumber: number;
  Read: boolean;
  Subject?: string | null;
  applicationName: string;
  time: string;
};

const NotificationTemplate: FC<NotificationDto> = ({
  fromUser,
  message,
  applicationName,
  Read,
  time,
}) => {
  console.log(Read, 'read');
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
        <Content>
          <Typography group="table" variant="cell_text">
            {message}
          </Typography>
        </Content>
        <FooterContainer>
          <Typography
            group="navigation"
            variant="label"
            color={colors.text.static_icons__tertiary.hex}
          >
            Application
          </Typography>

          <Typography
            group="navigation"
            variant="label"
            color={colors.text.static_icons__tertiary.hex}
          >
            {applicationName}
          </Typography>
        </FooterContainer>
      </GridContainer>
    </Wrapper>
  );
};

export default NotificationTemplate;
