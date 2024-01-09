import { FC, useState } from 'react';

import {
  Button,
  Dialog,
  Divider,
  Icon,
  Typography,
} from '@equinor/eds-core-react';
import { arrow_forward, close } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { fallback } from '../../../../Icons/ApplicationIcon/ApplicationIconCollection';

import styled from 'styled-components';

const { spacings, colors, shape } = tokens;

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

const ContentInfo = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  width: 100%;
  align-items: center;
  gap: ${spacings.comfortable.medium_small};
  padding: ${spacings.comfortable.small};
  &:hover {
    background-color: #f7f7f7;
    border-radius: ${shape.corners.borderRadius};
  }
`;

export type tutorialOptions = {
  description: string;
  steps: string;
  duration: string;
  onClick: () => void;
  currentPage?: boolean;
  otherPages?: boolean;
};

interface TutorialDialogProps {
  options: tutorialOptions[];
  open: boolean;
  onClose: () => void;
}

// TODO: check up on url - uselocation
const TutorialDialog: FC<TutorialDialogProps> = ({
  options,
  open,
  onClose,
}) => {
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
            if (item.currentPage)
              return (
                <ContentInfo key={index} onClick={item.onClick}>
                  <Icon data={fallback} />
                  <div>
                    <Typography group="paragraph" variant="caption">
                      {item.description}
                    </Typography>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Typography
                        group="navigation"
                        variant="label"
                        color={colors.text.static_icons__secondary.hex}
                      >
                        {item.steps}
                      </Typography>
                      <Typography
                        group="navigation"
                        variant="label"
                        color={colors.text.static_icons__secondary.hex}
                      >
                        {item.duration}
                      </Typography>
                    </div>
                  </div>
                  <Icon
                    data={arrow_forward}
                    size={24}
                    color={colors.interactive.primary__resting.hsla}
                  />
                </ContentInfo>
              );
          })}
        </Wrapper>
        <Wrapper>
          <Typography style={{ fontSize: '10px' }}>ON OTHER PAGES </Typography>

          {options.map((item, index) => {
            if (item.otherPages)
              return (
                <ContentInfo key={index} onClick={item.onClick}>
                  <Icon data={fallback} />
                  <div>
                    <Typography group="paragraph" variant="caption">
                      {item.description}
                    </Typography>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Typography
                        group="navigation"
                        variant="label"
                        color={colors.text.static_icons__secondary.hex}
                      >
                        {item.steps}
                      </Typography>
                      <Typography
                        group="navigation"
                        variant="label"
                        color={colors.text.static_icons__secondary.hex}
                      >
                        {item.duration}
                      </Typography>
                    </div>
                  </div>
                  <Icon
                    data={arrow_forward}
                    size={24}
                    color={colors.interactive.primary__resting.hsla}
                  />
                </ContentInfo>
              );
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

const DialogTutorial = styled(Dialog)`
  width: 400px;
  height: fit-content;
`;

const DialogCustomContent = styled(Dialog.CustomContent)`
  padding: ${spacings.comfortable.medium};
`;
