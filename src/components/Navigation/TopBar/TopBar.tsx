import React, { forwardRef, ReactElement, ReactNode } from 'react';

import {
  CircularProgress as EDSCircularProgress,
  Icon,
  TopBar as EDSTopBar,
  Typography,
} from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { colors } = tokens;

const Bar = styled(EDSTopBar)`
  border-bottom: 1px solid ${colors.ui.background__medium.hsla};
  padding-left: 20px;
  position: relative;
`;

const Header = styled(EDSTopBar.Header)`
  cursor: pointer;
  position: relative;
  display: grid;
  // 64px for application icon
  grid-template-columns: 32px auto;
  > svg {
    justify-self: center;
  }
`;

interface AppNameProps {
  capitalize: boolean;
}

const AppName = styled(Typography)<AppNameProps>`
  text-transform: ${(props) => (props.capitalize ? 'capitalize' : 'none')};
`;
interface CircularProgressProps {
  isFetching: boolean;
}

const CircularProgress = styled(EDSCircularProgress)<CircularProgressProps>`
  position: absolute;
  right: -24px;
  visibility: ${(props) => (props.isFetching ? 'visible' : 'hidden')};
`;

interface EnvironmentTagProps {
  environmentType: EnvironmentType;
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
  ${(props) => {
    if (props.environmentType === EnvironmentType.LOCALHOST) {
      return (
        'background-color: ' +
        colors.interactive.disabled__fill.hex +
        '; border: 1px solid ' +
        colors.interactive.disabled__text.hex +
        ';'
      );
    } else if (props.environmentType === EnvironmentType.DEVELOP) {
      return (
        'background-color: ' +
        colors.ui.background__info.hex +
        '; border: 1px solid ' +
        colors.infographic.substitute__blue_overcast.hex +
        ';'
      );
    } else if (props.environmentType === EnvironmentType.STAGING) {
      return (
        'background-color: ' +
        colors.ui.background__warning.hex +
        '; border: 1px solid ' +
        colors.interactive.warning__text.hex +
        ';'
      );
    }
  }};
`;

export enum EnvironmentType {
  LOCALHOST = 'localhost',
  DEVELOP = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
}

type TopBarType = {
  onHeaderClick: () => void;
  applicationIcon: IconData | ReactElement;
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
  ) => (
    <Bar ref={ref}>
      <Header onClick={onHeaderClick}>
        {React.isValidElement(applicationIcon) ? (
          applicationIcon
        ) : (
          <Icon
            data={applicationIcon}
            size={24}
            color={colors.interactive.primary__resting.hsla}
          />
        )}
        <AppName variant="h6" capitalize={capitalize}>
          {capitalize ? applicationName.toLowerCase() : applicationName}
        </AppName>
        <CircularProgress size={16} isFetching={isFetching} />
      </Header>
      {(environment === EnvironmentType.DEVELOP ||
        environment === EnvironmentType.STAGING ||
        environment === EnvironmentType.LOCALHOST) && (
        <EnvironmentTag environmentType={environment}>
          <Typography group="heading" variant="h5">
            {environment}
          </Typography>
        </EnvironmentTag>
      )}
      {children}
    </Bar>
  )
);

TopBar.displayName = 'TopBar';
