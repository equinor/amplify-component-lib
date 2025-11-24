import { forwardRef, HTMLAttributes } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';

import { ToggleGroupOption as ToggleGroupOptionType } from './ToggleGroup.types';
import { colors, shape, spacings } from 'src/atoms/style';
import { OptionalTooltip } from 'src/molecules';

import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: calc(${spacings.medium_small} / 2); // 6px in comfortable
  > span {
    color: ${colors.text.static_icons__tertiary.rgba};
    padding: ${spacings.x_small} calc(${spacings.medium_small} / 2);
  }
  > svg {
    fill: ${colors.text.static_icons__tertiary.rgba};
  }
  &:first-child {
    border-radius: ${shape.button.borderRadius} 0 0 ${shape.button.borderRadius};
  }

  &:last-child {
    border-radius: 0 ${shape.button.borderRadius} ${shape.button.borderRadius} 0;
  }
  &:hover {
    background: ${colors.interactive.table__cell__fill_hover.rgba};
    > span {
      color: ${colors.text.static_icons__secondary.rgba};
    }
    > svg {
      fill: ${colors.text.static_icons__secondary.rgba};
    }
  }

  &[aria-checked='true'] {
    background: ${colors.interactive.primary__selected_highlight.rgba};
    > span {
      color: ${colors.interactive.primary__resting.rgba};
    }
    > svg {
      fill: ${colors.interactive.primary__resting.rgba};
    }
    &:hover {
      background: ${colors.interactive.primary__selected_hover.rgba};
      > span {
        color: ${colors.interactive.primary__hover.rgba};
      }
      > svg {
        fill: ${colors.interactive.primary__hover.rgba};
      }
    }
  }

  &:disabled {
    cursor: not-allowed;
    background: ${colors.interactive.disabled__fill.rgba};
    > span {
      color: ${colors.interactive.disabled__text.rgba};
    }
    > svg {
      fill: ${colors.interactive.disabled__text.rgba};
    }
  }
`;

type ToggleGroupOptionProps = ToggleGroupOptionType &
  Omit<HTMLAttributes<HTMLButtonElement>, 'onToggle' | 'disabled'>;

export const ToggleGroupOption = forwardRef<
  HTMLButtonElement,
  ToggleGroupOptionProps
>(({ checked, onToggle, icon, disabled, ...rest }, ref) => {
  const handleOnClick = () => {
    onToggle(!checked);
  };

  return (
    <Button
      ref={ref}
      aria-checked={checked}
      onClick={handleOnClick}
      disabled={disabled}
      {...rest}
    >
      {icon ? (
        'tooltip' in rest && !!rest.tooltip ? (
          <OptionalTooltip
            title={rest.tooltip}
            placement={rest.tooltipPlacement}
          >
            <Icon data={icon} size={24} />
          </OptionalTooltip>
        ) : (
          <Icon data={icon} size={24} />
        )
      ) : null}
      {'label' in rest ? (
        <Typography as="span" variant="button" group="navigation">
          {rest.label}
        </Typography>
      ) : null}
    </Button>
  );
});

ToggleGroupOption.displayName = 'ToggleGroupOption';
