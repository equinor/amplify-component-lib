import { forwardRef, HTMLAttributes } from 'react';

import { Icon } from '@equinor/eds-core-react';

import { BaseChipProps } from './Chip';
import { ReadOnlyChipStyle } from './Chip.styles';

export type ReadOnlyChipProps = BaseChipProps & HTMLAttributes<HTMLDivElement>;

export const ReadOnlyChip = forwardRef<HTMLDivElement, ReadOnlyChipProps>(
  (props, ref) => {
    const { children, disabled, leadingIconData, ...otherReadOnlyProps } =
      props;

    // ReadOnlyChip only needs to handle the div related props and children,
    return (
      <ReadOnlyChipStyle
        {...otherReadOnlyProps}
        disabled={disabled}
        className={disabled ? 'disabled' : ''}
        ref={ref}
      >
        <div className="content">
          {leadingIconData && (
            <div className="leading">
              <Icon data={leadingIconData} size={16} />
            </div>
          )}
          {children}
        </div>
      </ReadOnlyChipStyle>
    );
  }
);
ReadOnlyChip.displayName = 'ReadOnlyChip';
