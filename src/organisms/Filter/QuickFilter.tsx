import { useState } from 'react';

import { Icon, Menu, Typography } from '@equinor/eds-core-react';
import { arrow_drop_down, arrow_drop_up } from '@equinor/eds-icons';

import { ButtonWithMenu } from './ButtonWithMenu';
import { FilterProps } from './Filter.types';
import { SelectOptionRequired } from 'src/molecules/Select/Select.types';

interface QuickFilterProps<T extends string> {
  values: FilterProps<T>['values'];
  items: Record<T, SelectOptionRequired[]>;
  onQuickFilter: (key: T, value: SelectOptionRequired) => void;
  label?: string;
}

export function QuickFilter<T extends string>({
  values,
  items,
  onQuickFilter,
  label = 'Quick filter',
}: QuickFilterProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ButtonWithMenu
      onOpenChange={setIsOpen}
      menuItems={(Object.keys(items) as Array<T>).flatMap((key) =>
        items[key].map((item) => (
          <Menu.Item
            key={item.label}
            active={values[key]?.some(
              (valueItem) => valueItem.value === item.value
            )}
            onClick={() => onQuickFilter(key, item)}
          >
            {item.label}
          </Menu.Item>
        ))
      )}
    >
      <Typography as="span" variant="button" group="navigation">
        {label}
      </Typography>
      <Icon data={isOpen ? arrow_drop_up : arrow_drop_down} />
    </ButtonWithMenu>
  );
}
