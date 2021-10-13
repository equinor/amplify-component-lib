import React, { useState } from 'react';
import { withTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import {
  Button,
  Icon,
  Tooltip,
  TopBar,
  Typography,
} from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { trending_up, notifications, info_circle } from '@equinor/eds-icons';
import Settings from './actionContents/settings';
import Account from './actionContents/account';
import Guidelines from './actionContents/guidelines';
// import { useHistory } from "react-router";

const { colors } = tokens;

const Bar = withTheme(styled(TopBar)`
  border-bottom: 2px solid ${colors.ui.background__medium.hsla};
  background-color: ${(props) => props.theme.palette.background.default};
`);

const Header = styled(TopBar.Header)`
  cursor: pointer;
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  > * {
    margin-left: 24px;
  }
`;

const ApplicationTopBar: React.FC = () => {
  const [guidelineOpen, setGuidelineOpen] = useState(false);
  const { Actions } = TopBar;
  // const history = useHistory();

  const handleHeaderClick = () => {
    // history.push("/");
  };

  return (
    <>
      <Bar>
        <Header onClick={handleHeaderClick}>
          <Icon
            data={trending_up}
            color={colors.interactive.primary__resting.hsla}
          />
          <Typography variant="h6">
            Application Name - Johan Sverdrup
          </Typography>
        </Header>
        <Actions>
          <Icons>
            <Account />
            <Settings />
            <Button
              variant="ghost_icon"
              onClick={() =>
                guidelineOpen ? setGuidelineOpen(false) : setGuidelineOpen(true)
              }
            >
              <Icon
                data={info_circle}
                size={24}
                color={colors.interactive.primary__resting.hsla}
              />
            </Button>
            <Tooltip title="Coming Later" placement="bottom">
              <Button variant="ghost_icon" disabled>
                <Icon
                  data={notifications}
                  size={24}
                  color={colors.interactive.primary__resting.hsla}
                />
              </Button>
            </Tooltip>
          </Icons>
        </Actions>
      </Bar>
      <Guidelines
        onClose={() => setGuidelineOpen(false)}
        open={guidelineOpen}
      />
    </>
  );
};

export default ApplicationTopBar;
