import { forwardRef, HTMLAttributes, KeyboardEvent } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { close, lock } from '@equinor/eds-icons';

import {
  ClickableChipProps,
  DeletableChipProps,
} from 'src/molecules/Chip/Chip';
import { InteractiveChipStyle } from 'src/molecules/Chip/Chip.styles';

export type InteractiveChipProps = (ClickableChipProps | DeletableChipProps) &
  Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'>;

export const InteractiveChip = forwardRef<
  HTMLButtonElement,
  InteractiveChipProps
>((props, ref) => {
  const {
    children,
    disabled = false,
    locked = false,
    variant,
    leadingIconData,
    onClick,
    onDelete,
    ...otherProps
  } = props;
  const usingLeadingIconData = locked ? lock : leadingIconData;
  const relevantOnAction = locked ? undefined : (onDelete ?? onClick);

  const handleKeyPress = (event: KeyboardEvent<HTMLButtonElement>) => {
    const { key } = event;
    if (key === 'Enter') {
      relevantOnAction?.(event);
    }
  };

  return (
    <InteractiveChipStyle
      {...otherProps}
      ref={ref}
      disabled={disabled}
      type="button"
      aria-disabled={locked || undefined}
      variant={variant}
      onClick={relevantOnAction}
      onKeyDown={handleKeyPress}
    >
      <div className="content">
        {usingLeadingIconData && (
          <div className="leading">
            <Icon role={'img'} data={usingLeadingIconData} size={16} />
          </div>
        )}
        {children}
        {onDelete && <Icon data={close} title="close" size={16} />}
      </div>
    </InteractiveChipStyle>
  );
});
InteractiveChip.displayName = 'InteractiveChip';
