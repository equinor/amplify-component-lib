import { forwardRef } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { spacings } from 'src/style';

import { motion, Variants } from 'framer-motion';
import styled from 'styled-components';

const { colors, shape } = tokens;

const Wrapper = styled.div`
  position: relative;
  height: 48px;
`;

const StyledIconButton = motion(styled.button`
  position: absolute;
  display: flex;
  border-radius: ${shape.icon_button.borderRadius};
  background: ${colors.interactive.primary__resting.rgba};
  align-items: center;
  min-width: 40px;
  height: 40px;
  overflow: hidden;
  > svg {
    flex-shrink: 0;
    position: absolute;
    background: inherit;
    padding: ${spacings.small};
  }
  > span {
    color: ${colors.text.static_icons__primary_white.rgba};
    white-space: nowrap;
  }
`);

const animationVariants: Variants = {
  closed_left: {
    width: '40px',
    left: 0,
    background: colors.interactive.primary__resting.rgba,
  },
  open_left: {
    width: 'auto',
    left: 0,
    background: colors.interactive.primary__hover.rgba,
  },
  closed_right: {
    width: '40px',
    right: '-40px',
    background: colors.interactive.primary__resting.rgba,
  },
  open_right: {
    width: 'auto',
    right: '-40px',
    background: colors.interactive.primary__hover.rgba,
  },
};

export interface ExpandableIconButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
  icon: IconData;
  iconPosition?: 'left' | 'right';
}

export const ExpandingIconButton = forwardRef<
  HTMLDivElement,
  ExpandableIconButtonProps
>(({ text, icon, onClick, className, iconPosition = 'left' }, ref) => {
  if (iconPosition === 'left') {
    return (
      <Wrapper ref={ref} className={className}>
        <StyledIconButton
          variants={animationVariants}
          initial="closed_left"
          whileHover="open_left"
          onClick={onClick}
        >
          <Icon
            style={{ left: '20px', transform: 'translate(-50%, 0)' }}
            data={icon}
            size={24}
            color={colors.text.static_icons__primary_white.rgba}
          />
          <Typography
            variant="button"
            group="navigation"
            as="span"
            style={{
              marginLeft: `calc(40px - ${spacings.x_small})`,
              marginRight: spacings.large,
            }}
          >
            {text}
          </Typography>
        </StyledIconButton>
      </Wrapper>
    );
  }

  return (
    <Wrapper ref={ref} className={className}>
      <StyledIconButton
        variants={animationVariants}
        initial="closed_right"
        whileHover="open_right"
        onClick={onClick}
      >
        <Typography
          variant="button"
          group="navigation"
          as="span"
          style={{
            marginLeft: spacings.medium,
            marginRight: `calc(40px + ${spacings.x_small})`,
          }}
        >
          {text}
        </Typography>
        <Icon
          style={{
            right: '20px',
            transform: 'translate(50%, 0)',
          }}
          data={icon}
          size={24}
          color={colors.text.static_icons__primary_white.rgba}
        />
      </StyledIconButton>
    </Wrapper>
  );
});

ExpandingIconButton.displayName = 'ExpandingIconButton';
