import { Icon, Typography } from '@equinor/eds-core-react';

import { ActiveLine, Button, Line } from './Tab.styles';
import { Tab as TabType, Tabs } from './Tabs.types';

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
}: TabProps<T>) {
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
      {leadingIcon ? <Icon data={leadingIcon} size={24} /> : null}
      <Typography as="label" variant="menu_tabs" group="navigation">
        {label}
      </Typography>
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
