import React, { ReactElement } from 'react';
import styled from 'styled-components';
import {
  CircularProgress as EDSCircularProgress,
  Icon,
  TopBar as EDSTopBar,
  Typography,
} from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { IconData } from '@equinor/eds-icons';

const { colors } = tokens;

const Bar = styled(EDSTopBar)`
  border-bottom: 1px solid ${colors.ui.background__medium.hsla};
  padding-left: 18px;
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

const Actions = styled(EDSTopBar.Actions)`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  > * {
    margin-left: 24px;
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
interface TopBarProps {
  onHeaderClick: () => void;
  applicationIcon: IconData | ReactElement;
  applicationName: string;
  actions: ReactElement[];
  isFetching?: boolean;
}

const TopBar: React.FC<TopBarProps> = ({
  onHeaderClick,
  applicationIcon,
  applicationName,
  actions,
  isFetching = false,
}) => {
  return (
    <Bar>
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
        <Typography variant="h6">{applicationName}</Typography>
        <CircularProgress size={16} isFetching={isFetching} />
      </Header>
      <Actions>{actions.map((action) => action)}</Actions>
    </Bar>
  );
};

export default TopBar;
