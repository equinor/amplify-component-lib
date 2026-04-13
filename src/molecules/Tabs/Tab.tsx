import { Icon, Typography } from '@equinor/eds-core-react';

import { ActiveLine, Button, Count, Line } from './Tab.styles';
import { Tab as TabType, Tabs } from './Tabs.types';
import { colors } from 'src/atoms/style/colors';
import { getVariantIcon } from 'src/atoms/utils';

const VARIANT_ICON_COLORS: Record<
  Required<Pick<TabType<unknown>, 'variant'>>['variant'],
  string
> = {
  warning: colors.interactive.warning__text.rgba,
  error: colors.interactive.danger__text.rgba,
} as const;

type TabProps<T> = {
  onChange: Tabs<T>['onChange'];
  onHover?: Tabs<T>['onHover'];
  selectedIndex: number;
  index: number;
  centered: boolean;
  animated: boolean;
} & TabType<T>;

export function Tab<T>({
  value,
  label,
  selectedIndex,
  index,
  onChange,
  onHover,
  centered,
  animated,
  disabled,
  leadingIcon,
  trailingIcon,
  variant,
  count,
}: TabProps<T>) {
  const usingLeadingIcon = variant ? getVariantIcon(variant) : leadingIcon;

  const handleOnClick = () => {
    onChange(value);
  };

  const handleOnMouseEnter = () => {
    if (!onHover) return;
    onHover(value);
  };

  return (
    <Button
      role="tab"
      aria-selected={selectedIndex === index}
      onClick={handleOnClick}
      onMouseEnter={handleOnMouseEnter}
      $centered={centered}
      disabled={disabled}
    >
      {usingLeadingIcon ? (
        <Icon
          data={usingLeadingIcon}
          size={24}
          style={
            variant
              ? {
                  fill: VARIANT_ICON_COLORS[variant],
                }
              : undefined
          }
        />
      ) : null}
      <Typography as="label" variant="menu_tabs" group="navigation">
        {label}
      </Typography>
      {count !== undefined ? (
        <Count className="count">
          <Typography as="span" variant="breadcrumb" group="navigation">
            {count}
          </Typography>
        </Count>
      ) : null}
      {trailingIcon ? <Icon data={trailingIcon} size={24} /> : null}
      {animated ? (
        <>
          <Line className="static-line" />
          <ActiveLine
            animate={{
              left: `${(selectedIndex - index) * 100}%`,
            }}
          />
        </>
      ) : (
        <Line className="static-line" $active={selectedIndex === index} />
      )}
    </Button>
  );
}
