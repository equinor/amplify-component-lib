import {
  Children as ReactChildren,
  forwardRef,
  Fragment,
  HTMLAttributes,
  isValidElement,
  ReactElement,
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
  variant?:
    | 'default'
    | 'active'
    | 'warning'
    | 'warning-active'
    | 'error'
    | 'error-active';
  onClick?: (event: unknown) => void;
  leadingIconData?: IconData;
}

// Type for ReadOnlyChipStyle (div)
export type ReadOnlyChipProps = BaseChipProps & HTMLAttributes<HTMLDivElement>;

// Type for InteractiveChipStyle (button)
export type InteractiveChipProps = BaseChipProps &
  HTMLAttributes<HTMLButtonElement>;

type ReactElementWithChildren = ReactElement<{ children?: ReactNode }>;

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

// Define the InteractiveChip component
const InteractiveChip = forwardRef<HTMLButtonElement, InteractiveChipProps>(
  (props, ref) => {
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
          {leadingIconData && (
            <div className="leading">
              <Icon data={leadingIconData} size={16} />
            </div>
          )}
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

  // Define a type for React elements with children

  const processChildren = (children: ReactNode): ReactNode[] => {
    const modifiedChildren: ReactNode[] = [];

    // Process each child and add it to the new array
    ReactChildren.map(children, (child, index) => {
      if (isValidElement(child)) {
        const element = child as ReactElementWithChildren;

        if (element.type === Fragment && element.props.children) {
          // Handle React.Fragment elements
          ReactChildren.map(
            element.props.children,
            (fragmentChild, fragmentIndex) => {
              if (isValidElement(fragmentChild) && fragmentIndex === 0) {
                modifiedChildren.push(
                  <div key={`${index}-${fragmentIndex}`} className="leading">
                    {fragmentChild}
                  </div>
                );
              } else if (
                typeof fragmentChild === 'string' ||
                typeof fragmentChild === 'number'
              ) {
                modifiedChildren.push(
                  <span key={`${index}-${fragmentIndex}`}>{fragmentChild}</span>
                );
              } else {
                modifiedChildren.push(fragmentChild);
              }
            }
          );
        } else if (index === 0) {
          // Handle other valid React elements
          modifiedChildren.push(
            <div key={index} className="leading">
              {element}
            </div>
          );
        } else {
          modifiedChildren.push(element);
        }
      } else if (typeof child === 'string' || typeof child === 'number') {
        // Wrap "loose" string and number children in a span
        modifiedChildren.push(<span key={index}>{child}</span>);
      } else {
        modifiedChildren.push(child);
      }
    });

    return modifiedChildren;
  };

  if (!onClick && !onDelete) {
    // Pass readOnly-specific props
    const readOnlyProps: ReadOnlyChipProps = {
      ...chipProps,
    };
    const modifiedChildren = processChildren(children);

    return <ReadOnlyChip {...readOnlyProps}>{modifiedChildren}</ReadOnlyChip>;
  } else {
    // Pass interactive-specific props
    const interactiveProps: InteractiveChipProps = {
      ...chipProps,
    };
    const modifiedChildren = processChildren(children);
    return (
      <InteractiveChip {...interactiveProps}>
        {modifiedChildren}
      </InteractiveChip>
    );
  }
};

Chip.displayName = 'Chip';
