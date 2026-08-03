import type { ComponentPropsWithRef, FC } from 'react';
import { ReactNode, useId, useRef, useState } from 'react';

import { LeftAlignedText, TooltipWrapper, Wrapper } from './Tooltip.styles';

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
  disabled = false,
  placement = 'top',
  enterDelay = 0,
  exitDelay = 300,
  ...rest
}) => {
  const uid = useId().replace(/:/g, '');

  const tooltipRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLSpanElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [arrowPlacement, setArrowPlacement] =
    useState<TooltipPlacement>(placement);

  const updateResolvedPlacement = () => {
    //ignoring failsafe checks
    /* v8 ignore next */
    if (!tooltipRef.current?.matches(':popover-open')) return;

    const tooltip = tooltipRef.current.getBoundingClientRect();
    const anchor = anchorRef.current?.getBoundingClientRect();
    /* v8 ignore next */
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
      showTimer.current = null;
      //ignoring failsafe check
      /* v8 ignore next */
      if (tooltipRef.current?.matches(':popover-open')) return;
      tooltipRef.current?.showPopover();
      requestAnimationFrame(updateResolvedPlacement);
    }, enterDelay);
  };
  const hide = () => {
    if (showTimer.current) {
      clearTimeout(showTimer.current);
      showTimer.current = null;
    }

    hideTimer.current = setTimeout(() => {
      hideTimer.current = null;
      //ignoring failsafe check
      /* v8 ignore next */
      if (!tooltipRef.current?.matches(':popover-open')) return;
      tooltipRef.current.hidePopover();
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
      {...rest}
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
