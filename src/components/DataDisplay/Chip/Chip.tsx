import {
  Children as ReactChildren,
  forwardRef,
  HTMLAttributes,
  isValidElement,
  ReactNode,
} from 'react';

import { Icon } from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';

import { InteractiveChipStyle, ReadOnlyChipStyle } from './Chip.styles';

// Base type for common properties
export interface BaseChipProps {
  children: ReactNode;
  disabled?: boolean;
  onDelete?: (event: unknown) => void;
  variant?: 'default' | 'active' | 'warning' | 'error';
  onClick?: (event: unknown) => void;
  leadingIconData?: IconData;
}

// Type for ReadOnlyChipStyle (div)
export type ReadOnlyChipProps = BaseChipProps & HTMLAttributes<HTMLDivElement>;

// Type for InteractiveChipStyle (button)
export type InteractiveChipProps = BaseChipProps &
  HTMLAttributes<HTMLButtonElement>;

// Define the ReadOnlyChip component
const ReadOnlyChip = forwardRef<HTMLDivElement, ReadOnlyChipProps>(
  (props, ref) => {
    const { children, disabled, leadingIconData, ...otherReadOnlyProps } =
      props;

    // ReadOnlyChip only needs to handle the div related props and children,
    return (
      <ReadOnlyChipStyle
        {...otherReadOnlyProps}
        className={disabled ? 'disabled' : ''}
        ref={ref}
      >
        {leadingIconData && <Icon data={leadingIconData} />}
        <div className="content">{children}</div>
      </ReadOnlyChipStyle>
    );
  }
);
ReadOnlyChip.displayName = 'ReadOnlyChip';

// Define the InteractiveChip component
const InteractiveChip = forwardRef<HTMLButtonElement, InteractiveChipProps>(
  (props, ref) => {
    const {
      children,
      onDelete,
      disabled = false,
      variant,
      onClick,
      ...otherInteractiveProps
    } = props;

    // deletable and clickable logic can be handled within this component
    const deletable = onDelete !== undefined;
    const clickable = !disabled && props.onClick !== undefined;
    const handleDelete = disabled ? undefined : onDelete;
    const handleClick = disabled ? undefined : onClick;

    const handleKeyPress = (
      event:
        | React.KeyboardEvent<HTMLButtonElement>
        | React.MouseEvent<HTMLButtonElement>
    ) => {
      const { key } = event as React.KeyboardEvent<HTMLButtonElement>;
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
          {children}
          {deletable && <Icon name="close" title="close" size={16} />}
        </div>
      </InteractiveChipStyle>
    );
  }
);
InteractiveChip.displayName = 'InteractiveChip';

export const Chip = ({
  children,
  variant,
  disabled,
  onClick,
  onDelete,
  ...otherProps
}: BaseChipProps) => {
  // Common props for all chips

  const chipProps = {
    ...otherProps,
    children,
    variant: variant,
    disabled: disabled,
    onClick: onClick,
    onDelete: onDelete,
  };
  const modifiedChildren: React.ReactNode[] = [];
  /*   const mappedChildren = ReactChildren.map(children, (child, index) => {
    // Check if child is a valid React element, wrap it in a div and add classname
    console.log(typeof child);
    if (typeof child === 'string' || typeof child === 'number') {
      return <span>{child}</span>;
    } else if (isValidElement(child) && index === 0) {
      return <div className="leading">{child}</div>;
    }
    // Wrap "loose" string and number children in a span
    // Return all other types of children directly
    return child;
  }); */

  // Process each child and add it to the new array
  ReactChildren.map(children, (child, index) => {
    if (isValidElement(child) && index === 0) {
      console.log(child);

      modifiedChildren.push(
        <div key={index} className="leading">
          {child}
        </div>
      );
    } else if (typeof child === 'string' || typeof child === 'number') {
      modifiedChildren.push(<span key={index}>{child}</span>);
    } else {
      modifiedChildren.push(child);
    }
  });

  if (!onClick && !onDelete) {
    // Pass readOnly-specific props
    const readOnlyProps: ReadOnlyChipProps = {
      ...chipProps,
    };
    return <ReadOnlyChip {...readOnlyProps}>{modifiedChildren}</ReadOnlyChip>;
  } else {
    // Pass interactive-specific props
    const interactiveProps: InteractiveChipProps = {
      ...chipProps,
    };
    return (
      <InteractiveChip {...interactiveProps}>
        {modifiedChildren}
      </InteractiveChip>
    );
  }
};

Chip.displayName = 'Chip';
