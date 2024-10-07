import { FC } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { add } from '@equinor/eds-icons';

import { OptionalTooltip } from 'src/molecules/OptionalTooltip/OptionalTooltip';
import {
  CreateButton,
  MenuItemContainer,
} from 'src/organisms/SideBar/CreateItem.styles';
import { useSideBar } from 'src/providers/SideBarProvider';

export interface CreateItemProps {
  createLabel: string;
  onCreate: () => void;
  disabled?: boolean;
  active?: boolean;
}

export const CreateItem: FC<CreateItemProps> = ({
  createLabel,
  onCreate,
  disabled = false,
  active = false,
}) => {
  const { isOpen } = useSideBar();
  if (isOpen) {
    return (
      <MenuItemContainer $active={active} data-testid="create-item-container">
        <CreateButton
          $open
          variant="contained"
          onClick={onCreate}
          disabled={disabled}
        >
          <Icon data={add} />
          {createLabel}
        </CreateButton>
      </MenuItemContainer>
    );
  }
  return (
    <MenuItemContainer $active={active} data-testid="create-item-container">
      <OptionalTooltip title={createLabel} placement="right">
        <CreateButton
          variant="contained"
          onClick={onCreate}
          disabled={disabled}
        >
          <Icon data={add} />
        </CreateButton>
      </OptionalTooltip>
    </MenuItemContainer>
  );
};
