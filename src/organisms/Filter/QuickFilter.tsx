import { useState } from 'react';

import { Icon, Menu, Typography } from '@equinor/eds-core-react';
import { arrow_drop_down, arrow_drop_up } from '@equinor/eds-icons';

import { ButtonWithMenu } from './ButtonWithMenu';
import { SelectOptionRequired } from 'src/molecules';

interface QuickFilterProps<T extends string> {
  items: Record<T, SelectOptionRequired[]>;
  onQuickFilter: (key: T, value: SelectOptionRequired) => void;
}

export function QuickFilter<T extends string>({
  items,
  onQuickFilter,
}: QuickFilterProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ButtonWithMenu
      onOpenChange={setIsOpen}
      menuItems={(Object.keys(items) as Array<T>).flatMap((key) =>
        items[key].map((item) => (
          <Menu.Item key={item.label} onClick={() => onQuickFilter(key, item)}>
            {item.label}
          </Menu.Item>
        ))
      )}
    >
      <Typography as="span" variant="button" group="navigation">
        Quick filter
      </Typography>
      <Icon data={isOpen ? arrow_drop_up : arrow_drop_down} />
    </ButtonWithMenu>
  );
}
