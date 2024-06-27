import {
  Children as ReactChildren,
  Fragment,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react';

import { IconData } from '@equinor/eds-icons';

import { InteractiveChip, InteractiveChipProps } from './InteractiveChip';
import { ReadOnlyChip, ReadOnlyChipProps } from './ReadOnlyChip';

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

type ReactElementWithChildren = ReactElement<{ children?: ReactNode }>;

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
      } else {
        // Wrap "loose" string and number children in a span
        modifiedChildren.push(<span key={index}>{child}</span>);
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
