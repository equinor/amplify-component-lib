import {
  Children,
  ForwardedRef,
  forwardRef,
  Fragment,
  isValidElement,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  ReactNode,
  useMemo,
} from 'react';

import { IconData } from '@equinor/eds-icons';

import {
  InteractiveChip,
  InteractiveChipProps,
} from 'src/molecules/Chip/InteractiveChip';
import {
  ReadOnlyChip,
  ReadOnlyChipProps,
} from 'src/molecules/Chip/ReadOnlyChip';

// Base type for common properties
export interface BaseChipProps {
  children: ReactNode;
  disabled?: boolean;
  onDelete?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
  variant?:
    | 'default'
    | 'active'
    | 'warning'
    | 'warning-active'
    | 'error'
    | 'error-active';
  onClick?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
  leadingIconData?: IconData;
}

type ReactElementWithChildren = ReactElement<{ children?: ReactNode }>;

export const Chip = forwardRef<
  HTMLDivElement | HTMLButtonElement,
  BaseChipProps
>(({ children, variant, disabled, onClick, onDelete, ...otherProps }, ref) => {
  const chipProps = {
    ...otherProps,
    children,
    variant: variant,
    disabled: disabled,
    onClick: onClick,
    onDelete: onDelete,
  };

  const modifiedChildren = useMemo((): ReactNode[] => {
    const modifiedChildren: ReactNode[] = [];

    // Process each child and add it to the new array
    Children.map(children, (child, index) => {
      if (isValidElement(child)) {
        const element = child as ReactElementWithChildren;

        if (element.type === Fragment && element.props.children) {
          // Handle React.Fragment elements
          Children.map(
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
      } else {
        // Wrap "loose" string and number children in a span
        modifiedChildren.push(<span key={index}>{child}</span>);
      }
    });

    return modifiedChildren;
  }, [children]);

  if (!onClick && !onDelete) {
    // Pass readOnly-specific props
    const readOnlyProps: ReadOnlyChipProps = {
      ...chipProps,
    };

    return (
      <ReadOnlyChip
        {...readOnlyProps}
        ref={ref as ForwardedRef<HTMLDivElement>}
      >
        {modifiedChildren}
      </ReadOnlyChip>
    );
  } else {
    // Pass interactive-specific props
    const interactiveProps: InteractiveChipProps = {
      ...chipProps,
    };
    return (
      <InteractiveChip
        {...interactiveProps}
        ref={ref as ForwardedRef<HTMLButtonElement>}
      >
        {modifiedChildren}
      </InteractiveChip>
    );
  }
});

Chip.displayName = 'Chip';
