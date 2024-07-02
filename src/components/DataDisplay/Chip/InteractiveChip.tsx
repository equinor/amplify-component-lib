import { forwardRef, HTMLAttributes, KeyboardEvent, MouseEvent } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { close } from '@equinor/eds-icons';

import { BaseChipProps } from './Chip';
import { InteractiveChipStyle } from './Chip.styles';

// Type for InteractiveChipStyle (button)
export type InteractiveChipProps = BaseChipProps &
  HTMLAttributes<HTMLButtonElement>;

export const InteractiveChip = forwardRef<
  HTMLButtonElement,
  InteractiveChipProps
>((props, ref) => {
  const {
    children,
    onDelete,
    disabled = false,
    variant,
    onClick,
    leadingIconData,
    ...otherInteractiveProps
  } = props;

  // deletable and clickable logic can be handled within this component
  const deletable = onDelete !== undefined;
  const clickable = !disabled && props.onClick !== undefined;
  const handleDelete = disabled ? undefined : onDelete;
  const handleClick = disabled ? undefined : onClick;

  const handleKeyPress = (
    event: KeyboardEvent<HTMLButtonElement> | MouseEvent<HTMLButtonElement>
  ) => {
    const { key } = event as KeyboardEvent<HTMLButtonElement>;
    if (key === 'Enter') {
      if (deletable) {
        handleDelete!(event as unknown); // using non-null assertion operator since we know deletable is true
      } else if (clickable) {
        handleClick!(event as unknown); // using non-null assertion operator since we know clickable is true
      }
    }
  };

  return (
    <InteractiveChipStyle
      {...otherInteractiveProps}
      ref={ref}
      disabled={disabled}
      variant={variant}
      onClick={deletable ? onDelete : onClick}
      onKeyDown={handleKeyPress}
    >
      <div className="content">
        {leadingIconData && (
          <div className="leading">
            <Icon role={'img'} data={leadingIconData} size={16} />
          </div>
        )}
        {children}
        {deletable && <Icon data={close} title="close" size={16} />}
      </div>
    </InteractiveChipStyle>
  );
});
InteractiveChip.displayName = 'InteractiveChip';
