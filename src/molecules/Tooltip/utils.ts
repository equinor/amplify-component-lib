import { TooltipPlacement } from 'src/molecules/Tooltip/Tooltip';

export const getResolvedPlacement = (
  tooltip: DOMRect,
  anchor: DOMRect
): TooltipPlacement => {
  if (tooltip.bottom <= anchor.top) return 'top';
  if (tooltip.top >= anchor.bottom) return 'bottom';
  if (tooltip.right <= anchor.left) return 'left';
  return 'right';
};

export function assignRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
