import React, { FC, ReactDOM, useRef, useState } from 'react';

import {
  Button,
  Divider,
  Icon,
  Menu,
  Typography,
} from '@equinor/eds-core-react';
import { clear, thumbs_up_down } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { useOutsideClick } from '@equinor/eds-utils';

import TopBarMenu from '../TopBarMenu';
import FeedbackForm from './FeedbackForm/FeedbackForm';

import styled from 'styled-components';

const { colors, spacings } = tokens;

const Feedback: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <Button
        variant="ghost_icon"
        key="topbar-feedback"
        ref={buttonRef}
        onClick={() => setIsOpen((open) => !open)}
      >
        <Icon
          data={thumbs_up_down}
          size={24}
          color={colors.interactive.primary__resting.hsla}
        />
      </Button>
      <TopBarMenu
        title="Amplify feedback Form"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        anchorEl={buttonRef.current}
      >
        <FeedbackForm />
      </TopBarMenu>
    </>
  );
};

export default Feedback;
