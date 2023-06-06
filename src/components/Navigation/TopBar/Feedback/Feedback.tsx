import React, { FC, useRef, useState } from 'react';

import { Button, Icon } from '@equinor/eds-core-react';
import { thumbs_up_down } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import TopBarMenu from '../TopBarMenu';
import FeedbackForm from './FeedbackForm/FeedbackForm';

const { colors } = tokens;

const Feedback: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <>
      <Button
        variant="ghost_icon"
        key="topbar-feedback"
        ref={buttonRef}
        onClick={toggleMenu}
      >
        <Icon
          data={thumbs_up_down}
          size={24}
          color={colors.interactive.primary__resting.hsla}
        />
      </Button>
      <TopBarMenu
        title="Amplify feedback form"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        anchorEl={buttonRef.current}
      >
        <FeedbackForm onClose={closeMenu} />
      </TopBarMenu>
    </>
  );
};

export default Feedback;
