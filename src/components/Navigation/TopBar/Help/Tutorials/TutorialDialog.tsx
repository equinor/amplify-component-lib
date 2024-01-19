import { FC } from 'react';
import { useLocation } from 'react-router';

import { Button, Dialog, Icon, Typography } from '@equinor/eds-core-react';
import { close } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import TutorialItem from './TutorialItem';

import styled from 'styled-components';

const { spacings } = tokens;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: 8px;
  text-decoration: none;
  gap: ${spacings.comfortable.medium};
  cursor: pointer;
  margin-bottom: ${spacings.comfortable.medium};
`;

const DialogTutorial = styled(Dialog)`
  width: 400px;
  height: fit-content;
`;

const DialogCustomContent = styled(Dialog.CustomContent)`
  padding: ${spacings.comfortable.medium};
`;

export type tutorialOptions = {
  description: string;
  steps: string;
  duration: string;
  onClick: () => void;
  pathName: string;
};

interface TutorialDialogProps {
  options: tutorialOptions[];
  open: boolean;
  onClose: () => void;
}

const TutorialDialog: FC<TutorialDialogProps> = ({
  options,
  open,
  onClose,
}) => {
  const location = useLocation();

  return (
    <DialogTutorial open={open}>
      <Dialog.Header>
        Tutorials
        <Button variant="ghost_icon" onClick={onClose}>
          <Icon data={close} />
        </Button>
      </Dialog.Header>
      <DialogCustomContent>
        <Wrapper>
          <Typography style={{ fontSize: '10px' }}>ON CURRENT PAGE </Typography>
          {options.map((item, index) => {
            if (item.pathName === location.pathname) {
              return (
                <TutorialItem
                  key={index}
                  description={item.description}
                  steps={item.steps}
                  duration={item.duration}
                  onClick={item.onClick}
                  pathName={item.pathName}
                />
              );
            } else {
              return (
                <TutorialItem
                  key={index}
                  description={item.description}
                  steps={item.steps}
                  duration={item.duration}
                  onClick={item.onClick}
                  pathName={item.pathName}
                />
              );
            }
          })}
        </Wrapper>
      </DialogCustomContent>
      <Dialog.Actions>
        <Button variant="outlined"> Back</Button>
      </Dialog.Actions>
    </DialogTutorial>
  );
};

export default TutorialDialog;
