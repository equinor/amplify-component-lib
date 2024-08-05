import {
  FocusEventHandler,
  forwardRef,
  MouseEventHandler,
  ReactNode,
} from 'react';

import { IconData } from '@equinor/eds-icons';

import { Typography } from '..';
import { colors } from 'src/atoms/style';
import { animation } from 'src/atoms/style/animation';
import { spacings } from 'src/atoms/style/spacings';
import { renderContent } from 'src/molecules/ListItem/ListItem.utils';

import styled from 'styled-components';

interface ContainerProps {
  $isChild: boolean;
  $selected: boolean;
}

const Container = styled.button<ContainerProps>`
  display: flex;
  gap: ${spacings.small};
  align-items: center;
  height: 48px;
  min-width: 210px;
  padding: ${({ $isChild }) => {
    const padding = `${spacings.small} ${spacings.large} ${spacings.small}`;
    if ($isChild) {
      return `${padding} ${spacings.xx_large}`;
    }
    return `${padding} ${spacings.medium}`;
  }};
  background: ${({ $selected }) =>
    $selected
      ? colors.interactive.primary__selected_highlight.rgba
      : 'transparent'};
  transition: background ${animation.transitionMS};
  &:disabled {
      cursor: not-allowed;
      background: transparent;
      > section > p {
        color: ${colors.interactive.disabled__text.rgba};
      }
  }
  &:focus:not(:disabled) {
      outline: 1px dashed ${colors.interactive.primary__resting.rgba};
  }
  &:hover:not(:disabled) {
    background: ${({ $selected }) => ($selected ? colors.interactive.primary__selected_hover.rgba : colors.interactive.primary__hover_alt.rgba)};
  }
  > section {
      padding: ${spacings.small} 0};
  }
`;

export interface ListItemProps {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  onFocus?: FocusEventHandler<HTMLButtonElement>;
  onBlur?: FocusEventHandler<HTMLButtonElement>;
  leadingContent?: ReactNode | IconData;
  trailingContent?: ReactNode | IconData;
  disabled?: boolean;
  selected?: boolean;
  isChild?: boolean;
}

export const ListItem = forwardRef<HTMLButtonElement, ListItemProps>(
  (
    {
      label,
      onClick,
      onFocus,
      onBlur,
      disabled = false,
      leadingContent,
      trailingContent,
      isChild = false,
      selected = false,
    },
    ref
  ) => {
    return (
      <Container
        ref={ref}
        $isChild={isChild}
        $selected={selected}
        disabled={disabled}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {leadingContent && renderContent(leadingContent)}
        <section>
          <Typography variant="button" group="navigation">
            {label}
          </Typography>
        </section>
        {trailingContent && renderContent(trailingContent)}
      </Container>
    );
  }
);

ListItem.displayName = 'ListItem';
