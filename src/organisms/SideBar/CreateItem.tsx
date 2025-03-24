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
  const onClickHandler = disabled ? undefined : onCreate;

  if (isOpen) {
    return (
      <MenuItemContainer
        $active={active}
        onClick={onClickHandler}
        data-testid="create-item-container"
      >
        <CreateButton $open variant="contained" disabled={disabled}>
          <Icon data={add} />
          {createLabel}
        </CreateButton>
      </MenuItemContainer>
    );
  }

  return (
    <OptionalTooltip title={createLabel} placement="right">
      <MenuItemContainer
        $active={active}
        onClick={onClickHandler}
        data-testid="create-item-container"
      >
        <CreateButton variant="contained" disabled={disabled}>
          <Icon data={add} />
        </CreateButton>
      </MenuItemContainer>
    </OptionalTooltip>
  );
};
