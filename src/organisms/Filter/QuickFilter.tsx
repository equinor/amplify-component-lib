import { useState } from 'react';

import { Icon, Menu, Typography } from '@equinor/eds-core-react';
import { arrow_drop_down, arrow_drop_up } from '@equinor/eds-icons';

import { ButtonWithMenu } from './ButtonWithMenu';
import { QuickFilterProps } from 'src/organisms/Filter/Filter.types';

export function QuickFilter<Q>({
  quickFilterItems,
  onQuickFilter,
}: QuickFilterProps<Q>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ButtonWithMenu
      onOpenChange={setIsOpen}
      menuItems={quickFilterItems.map((item) => (
        <Menu.Item key={item.label} onClick={() => onQuickFilter(item.value)}>
          {item.label}
        </Menu.Item>
      ))}
    >
      <Typography as="span" variant="button" group="navigation">
        Quick filter
      </Typography>
      <Icon data={isOpen ? arrow_drop_up : arrow_drop_down} />
    </ButtonWithMenu>
  );
}
