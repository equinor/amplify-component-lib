import { FC, useRef, useState } from 'react';

import { Button, Icon } from '@equinor/eds-core-react';
import { placeholder_icon } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import SelectAppAndType from './SelectAppAndType';

import styled from 'styled-components';

const { colors } = tokens;

interface FeedbackMenuProps {
  open: boolean;
}

const FeedbackMenu = styled.div<FeedbackMenuProps>`
  background-color: lightgrey;
  padding: 16px;
  width: 250px;
  position: absolute;
  top: 64px;
  right: 0px;
  ${(props) => !props.open && 'display: none;'}
`;

interface FeedbackProps {
  test?: string;
}

const Feedback: FC<FeedbackProps> = ({ test }) => {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const onClose = () => {
    setFeedbackOpen(false);
  };

  return (
    <>
      <Button
        variant="ghost_icon"
        key="topbar-feedback"
        ref={buttonRef}
        onClick={() => setFeedbackOpen(!feedbackOpen)}
      >
        <Icon
          data={placeholder_icon}
          size={24}
          color={colors.interactive.primary__resting.hsla}
        />
      </Button>
      <FeedbackMenu open={feedbackOpen} ref={menuRef}>
        <SelectAppAndType></SelectAppAndType>
      </FeedbackMenu>
    </>
  );
};

export default Feedback;
