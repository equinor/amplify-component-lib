import {
  CircularProgress as EDSCircularProgress,
  TopBar as EDSTopBar,
  Icon,
  Typography,
} from '@equinor/eds-core-react';
import React, { ReactElement, ReactNode, forwardRef } from 'react';

import { IconData } from '@equinor/eds-icons';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';

const { colors } = tokens;

const Bar = styled(EDSTopBar)`
  border-bottom: 1px solid ${colors.ui.background__medium.hsla};
  padding-left: 20px;
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

type TopBarType = {
  onHeaderClick: () => void;
  applicationIcon: IconData | ReactElement;
  applicationName: string;
  isFetching?: boolean;
  capitalize?: boolean;
  children: ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export const TopBar = forwardRef<HTMLElement, TopBarType>(
  (
    {
      children,
      onHeaderClick,
      applicationIcon,
      applicationName,
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
      {children}
    </Bar>
  )
);

TopBar.displayName = 'TopBar';
