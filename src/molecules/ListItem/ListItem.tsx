import {
  FocusEventHandler,
  forwardRef,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from 'react';

import { Typography } from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';

import { animation, colors, spacings } from 'src/atoms/style';
import { renderContent } from 'src/molecules/ListItem/ListItem.utils';

import styled, { css } from 'styled-components';

interface ContainerProps {
  $isChild: boolean;
  $selected: boolean;
  $borderBottom: boolean;
}

const Container = styled.button<ContainerProps>`
  display: flex;
  gap: ${spacings.small};
  align-items: center;
  min-width: 210px;
  padding: ${({ $isChild, $borderBottom }) => {
    let padding = `${spacings.small} ${spacings.large} ${spacings.small}`;
    if ($borderBottom) {
      padding = `${spacings.small} ${spacings.large} calc(${spacings.small} - 1px)`;
    }

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
  ${({ $borderBottom }) => {
    if ($borderBottom) {
      return css`
        border-bottom: 1px solid ${colors.ui.background__medium.rgba};
      `;
    }
    return '';
  }}
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

const TrailingContent = styled.span`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

export interface ListItemProps extends HTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  onFocus?: FocusEventHandler<HTMLButtonElement>;
  onBlur?: FocusEventHandler<HTMLButtonElement>;
  leadingContent?: ReactNode | IconData;
  trailingContent?: ReactNode | IconData;
  disabled?: boolean;
  selected?: boolean;
  isChild?: boolean;
  borderBottom?: boolean;
}

export const ListItem = forwardRef<HTMLButtonElement, ListItemProps>(
  (
    {
      label,
      onClick,
      onFocus,
      onBlur,
      className,
      disabled = false,
      leadingContent,
      trailingContent,
      isChild = false,
      selected = false,
      borderBottom = false,
    },
    ref
  ) => {
    return (
      <Container
        ref={ref}
        className={className}
        $isChild={isChild}
        $selected={selected}
        $borderBottom={borderBottom}
        disabled={disabled}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {leadingContent && renderContent(leadingContent)}
        <section>
          <Typography variant="menu_title" group="navigation">
            {label}
          </Typography>
        </section>
        {trailingContent && (
          <TrailingContent>{renderContent(trailingContent)}</TrailingContent>
        )}
      </Container>
    );
  }
);

ListItem.displayName = 'ListItem';
