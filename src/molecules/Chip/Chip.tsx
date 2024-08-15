import {
  Children,
  ForwardedRef,
  forwardRef,
  Fragment,
  HTMLAttributes,
  isValidElement,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  ReactNode,
  useMemo,
} from 'react';

import { IconData } from '@equinor/eds-icons';

import { InteractiveChip } from 'src/molecules/Chip/InteractiveChip';
import { ReadOnlyChip } from 'src/molecules/Chip/ReadOnlyChip';

// Base type for common properties
export interface BaseChipProps {
  children: ReactNode;
  variant?: 'default' | 'white' | 'warning' | 'error';
  leadingIconData?: IconData;
}

type ReadOnlyChipProps = BaseChipProps & {
  onClick?: undefined;
  onDelete?: undefined;
};

export interface InteractiveChipBase {
  disabled?: boolean;
  selected?: boolean;
}

export type ClickableChipProps = BaseChipProps &
  InteractiveChipBase & {
    onClick: (
      event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
    ) => void;
    onDelete?: undefined;
  };

export type DeletableChipProps = BaseChipProps &
  InteractiveChipBase & {
    onClick?: undefined;
    onDelete: (
      event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
    ) => void;
  };

type ReactElementWithChildren = ReactElement<{ children?: ReactNode }>;

type ChipProps = Omit<
  HTMLAttributes<HTMLDivElement | HTMLButtonElement>,
  'onClick'
> &
  (ReadOnlyChipProps | ClickableChipProps | DeletableChipProps);

export const Chip = forwardRef<HTMLDivElement | HTMLButtonElement, ChipProps>(
  (props, ref) => {
    const { children } = props;

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
                    <span key={`${index}-${fragmentIndex}`}>
                      {fragmentChild}
                    </span>
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

    if (props.onClick !== undefined || props.onDelete !== undefined) {
      return (
        <InteractiveChip
          {...props}
          ref={ref as ForwardedRef<HTMLButtonElement>}
        >
          {modifiedChildren}
        </InteractiveChip>
      );
    } else {
      return (
        <ReadOnlyChip {...props} ref={ref as ForwardedRef<HTMLDivElement>}>
          {modifiedChildren}
        </ReadOnlyChip>
      );
    }
  }
);

Chip.displayName = 'Chip';
