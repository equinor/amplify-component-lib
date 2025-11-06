import { forwardRef } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { spacings } from 'src/atoms/style';

import { motion, Variants } from 'motion/react';
import styled from 'styled-components';

const { colors, shape } = tokens;

const Wrapper = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
`;

const StyledIconButton = motion(styled.button`
  position: absolute;
  display: flex;
  border-radius: ${shape.icon_button.borderRadius};
  align-items: center;
  min-width: 48px;
  height: 48px;
  overflow: hidden;
  > svg {
    flex-shrink: 0;
    position: absolute;
    background: inherit;
    padding: ${spacings.medium_small};
  }
  > span {
    flex-shrink: 0;
    color: ${colors.text.static_icons__primary_white.rgba};
    white-space: nowrap;
  }
`);

const ANIMATION_VARIANTS: Variants = {
  closed_left: {
    width: '48px',
    left: 0,
    background: colors.interactive.primary__resting.rgba,
  },
  open_left: {
    width: 'auto',
    left: 0,
    background: colors.interactive.primary__hover.rgba,
  },
  closed_right: {
    width: '48px',
    right: 0,
    background: colors.interactive.primary__resting.rgba,
  },
  open_right: {
    width: 'auto',
    right: 0,
    background: colors.interactive.primary__hover.rgba,
  },
};

export interface ExpandingIconButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
  icon: IconData;
  iconPosition?: 'left' | 'right';
}

/**
 * @deprecated Being deprecated from amplify-component-lib move into app if you want the implementation
 */

export const ExpandingIconButton = forwardRef<
  HTMLDivElement,
  ExpandingIconButtonProps
>(({ text, icon, onClick, className, iconPosition = 'left' }, ref) => {
  if (iconPosition === 'left') {
    return (
      <Wrapper ref={ref} className={className}>
        <StyledIconButton
          variants={ANIMATION_VARIANTS}
          initial="closed_left"
          whileHover="open_left"
          onClick={onClick}
        >
          <Icon
            style={{ left: '24px', transform: 'translate(-50%, 0)' }}
            data={icon}
            size={24}
            color={colors.text.static_icons__primary_white.rgba}
          />
          <Typography
            variant="button"
            group="navigation"
            as="span"
            style={{
              marginLeft: `calc(48px - ${spacings.x_small})`,
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
        variants={ANIMATION_VARIANTS}
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
            marginRight: `calc(48px + ${spacings.x_small})`,
          }}
        >
          {text}
        </Typography>
        <Icon
          style={{
            right: '24px',
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
