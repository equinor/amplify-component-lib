import { forwardRef, HTMLAttributes } from 'react';

import { Icon } from '@equinor/eds-core-react';

import { BaseChipProps } from 'src/molecules/Chip/Chip';
import { ReadOnlyChipStyle } from 'src/molecules/Chip/Chip.styles';

export type ReadOnlyChipProps = BaseChipProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'onClick'>;

export const ReadOnlyChip = forwardRef<HTMLDivElement, ReadOnlyChipProps>(
  (props, ref) => {
    const { children, leadingIconData, ...otherReadOnlyProps } = props;

    return (
      <ReadOnlyChipStyle
        {...otherReadOnlyProps}
        ref={ref}
        data-testid="read-only-chip"
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
