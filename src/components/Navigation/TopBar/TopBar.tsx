import React, { forwardRef, ReactElement, ReactNode } from 'react';

import {
  CircularProgress as EDSCircularProgress,
  TopBar as EDSTopBar,
  Typography,
} from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import ApplicationIcon from '../../Icons/ApplicationIcon/ApplicationIcon';

import styled from 'styled-components';

const { colors, spacings } = tokens;

const Bar = styled(EDSTopBar)`
  border-bottom: 1px solid ${colors.ui.background__medium.rgba};
  padding-left: ${spacings.comfortable.medium};
  position: relative;
`;

const Header = styled(EDSTopBar.Header)`
  cursor: pointer;
  position: relative;
  display: grid;
  grid-template-columns: 40px auto;
  > svg {
    justify-self: center;
  }
`;

interface AppNameProps {
  $capitalize: boolean;
}

const AppName = styled(Typography)<AppNameProps>`
  text-transform: ${(props) => (props.$capitalize ? 'capitalize' : 'none')};
`;

const CircularProgress = styled(EDSCircularProgress)`
  position: absolute;
  right: -24px;

  circle {
    stroke: ${colors.interactive.primary__resting.rgba};
  }
  circle:first-child {
    stroke: ${colors.interactive.primary__hover_alt.rgba};
  }
`;

interface EnvironmentTagProps {
  $environmentType: EnvironmentType;
}

function environmentStyling(envType: EnvironmentType): string {
  let backgroundColor = 'none';
  let borderColor = 'none';
  if (envType === EnvironmentType.LOCALHOST) {
    backgroundColor = colors.interactive.disabled__fill.rgba;
    borderColor = colors.interactive.disabled__text.rgba;
  } else if (envType === EnvironmentType.DEVELOP) {
    backgroundColor = colors.ui.background__info.rgba;
    borderColor = colors.infographic.substitute__blue_overcast.rgba;
  } else if (envType === EnvironmentType.STAGING) {
    backgroundColor = colors.ui.background__warning.rgba;
    borderColor = colors.interactive.warning__text.rgba;
  }
  return `
    background-color: ${backgroundColor};
    border: 1px solid ${borderColor};
  `;
}

const EnvironmentTag = styled.div<EnvironmentTagProps>`
  width: 214px;
  height: 36px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-transform: capitalize;
  ${(props) => environmentStyling(props.$environmentType)}
`;

export enum EnvironmentType {
  LOCALHOST = 'localhost',
  DEVELOP = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
}

type TopBarType = {
  onHeaderClick: () => void;
  applicationIcon: string | ReactElement;
  applicationName: string;
  environment?: EnvironmentType;
  isFetching?: boolean;
  capitalize?: boolean;
  children: ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export const TopBar = forwardRef<HTMLDivElement, TopBarType>(
  (
    {
      children,
      onHeaderClick,
      applicationIcon,
      applicationName,
      environment,
      isFetching = false,
      capitalize = false,
    },
    ref
  ) => {
    if (React.isValidElement(applicationIcon)) {
      console.warn(
        'Sending an element as applicationIcon is the old way of setting the icon in the top bar! Switch to just sending the name of the app as applicationIcon.'
      );
    }
    return (
      <Bar ref={ref}>
        <Header onClick={onHeaderClick}>
          {React.isValidElement(applicationIcon) ? (
            applicationIcon
          ) : (
            <ApplicationIcon name={applicationIcon as string} size={40} />
          )}
          <AppName variant="h6" $capitalize={capitalize}>
            {capitalize ? applicationName.toLowerCase() : applicationName}
          </AppName>
          {isFetching && <CircularProgress size={16} />}
        </Header>
        {(environment === EnvironmentType.DEVELOP ||
          environment === EnvironmentType.STAGING ||
          environment === EnvironmentType.LOCALHOST) && (
          <EnvironmentTag $environmentType={environment}>
            <Typography group="heading" variant="h5">
              {environment}
            </Typography>
          </EnvironmentTag>
        )}
        {children}
      </Bar>
    );
  }
);

TopBar.displayName = 'TopBar';
