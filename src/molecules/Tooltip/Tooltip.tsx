import type { ComponentPropsWithRef, FC } from 'react';
import { ReactNode, useId, useRef, useState } from 'react';

import { LeftAlignedText, TooltipWrapper, Wrapper } from './Tooltip.styles';
import { getResolvedPlacement } from 'src/molecules/Tooltip/utils';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
export interface Arrow {
  placement: TooltipPlacement;
  offset: { x?: number; y?: number };
}

export type TooltipProps = {
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

  const [arrow, setArrow] = useState<Arrow>({
    placement,
    offset: { x: undefined, y: undefined },
  });

  const updateResolvedPlacement = () => {
    //ignoring failsafe checks
    /* v8 ignore next */
    if (!tooltipRef.current?.matches(':popover-open')) return;

    const tooltip = tooltipRef.current.getBoundingClientRect();
    const anchor = anchorRef.current?.getBoundingClientRect();
    /* v8 ignore next */
    if (!anchor) return;

    const resolved = getResolvedPlacement(tooltip, anchor);

    const ARROW_PADDING = 12;
    if (resolved === 'top' || resolved === 'bottom') {
      const anchorCenterX = anchor.left + anchor.width / 2;
      const x = Math.max(
        ARROW_PADDING,
        Math.min(anchorCenterX - tooltip.left, tooltip.width - ARROW_PADDING)
      );
      setArrow({
        placement: resolved,
        offset: { x },
      });
    } else {
      const anchorCenterY = anchor.top + anchor.height / 2;
      const y = Math.max(
        ARROW_PADDING,
        Math.min(anchorCenterY - tooltip.top, tooltip.height - ARROW_PADDING)
      );
      setArrow({
        placement: resolved,
        offset: { y },
      });
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
        $arrow={arrow}
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
