import type { ComponentPropsWithRef, FC } from 'react';
import { ReactNode, useId, useRef, useState } from 'react';

import {
  LeftAlignedText,
  TooltipWrapper,
  Wrapper,
} from 'src/molecules/OptionalTooltip/Tooltip.styles.ts';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

type TooltipProps = {
  title?: ReactNode;
  placement?: TooltipPlacement;
  disabled?: boolean;
  enterDelay?: number;
  exitDelay?: number;
} & Omit<ComponentPropsWithRef<'div'>, 'title'>;

export const Tooltip: FC<TooltipProps> = ({
  title,
  children,
  ref,
  disabled,
  placement = 'top',
  enterDelay = 0,
  exitDelay = 300,
}) => {
  const uid = useId();

  const tooltipRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [arrowPlacement, setArrowPlacement] =
    useState<TooltipPlacement>(placement);

  const updateResolvedPlacement = () => {
    if (!tooltipRef.current?.matches(':popover-open')) return;

    const tooltip = tooltipRef.current.getBoundingClientRect();
    const anchor = anchorRef.current?.getBoundingClientRect();
    if (!anchor) return;

    if (tooltip.bottom <= anchor.top) {
      setArrowPlacement('top');
    } else if (tooltip.top >= anchor.bottom) {
      setArrowPlacement('bottom');
    } else if (tooltip.right <= anchor.left) {
      setArrowPlacement('left');
    } else {
      setArrowPlacement('right');
    }
  };

  const setRef = (node: HTMLDivElement | null) => {
    tooltipRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  const show = () => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }

    if (showTimer.current || tooltipRef.current?.matches(':popover-open'))
      return;

    showTimer.current = setTimeout(() => {
      if (!tooltipRef.current?.matches(':popover-open')) {
        tooltipRef.current?.showPopover();
        requestAnimationFrame(() => {
          updateResolvedPlacement();
        });
      }
      showTimer.current = null;
    }, enterDelay);
  };
  const hide = () => {
    if (showTimer.current) {
      clearTimeout(showTimer.current);
      showTimer.current = null;
    }

    hideTimer.current = setTimeout(() => {
      if (tooltipRef.current?.matches(':popover-open')) {
        tooltipRef.current.hidePopover();
      }
      hideTimer.current = null;
    }, exitDelay);
  };

  if (!title || disabled) return children;

  return (
    <Wrapper
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      $anchor={`--tooltip-${uid}`}
      ref={anchorRef}
    >
      {children}
      <TooltipWrapper
        ref={setRef}
        role="tooltip"
        popover="hint"
        $anchor={`--tooltip-${uid}`}
        $placement={placement}
        $arrowPlacement={arrowPlacement}
      >
        {typeof title === 'string' ? (
          <LeftAlignedText>{title}</LeftAlignedText>
        ) : (
          title
        )}
      </TooltipWrapper>
    </Wrapper>
  );
};
