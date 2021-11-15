import {
  CircularProgress as EDSCircularProgress,
  Icon,
  TopBar as EDSTopBar,
  Typography,
} from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import React, { forwardRef, ReactElement } from 'react';
import styled from 'styled-components';

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
  > h6 {
    text-transform: capitalize;
  }
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
} & React.HTMLAttributes<HTMLElement>;

export const TopBar = forwardRef<HTMLElement, TopBarType>(
  (
    {
      children,
      onHeaderClick,
      applicationIcon,
      applicationName,
      isFetching = false,
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
        <Typography variant="h6">{applicationName.toLowerCase()}</Typography>
        <CircularProgress size={16} isFetching={isFetching} />
      </Header>
      {children}
    </Bar>
  )
);

TopBar.displayName = 'TopBar';
