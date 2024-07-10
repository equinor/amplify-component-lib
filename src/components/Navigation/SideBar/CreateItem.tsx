import { FC } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { add } from '@equinor/eds-icons';

import { CreateButton, MenuItemContainer } from './CreateItem.styles';
import OptionalTooltip from 'src/molecules/OptionalTooltip/OptionalTooltip';
import { useSideBar } from 'src/providers/SideBarProvider';

export interface CreateItemProps {
  createLabel: string;
  onCreate: () => void;
  disabled?: boolean;
}

const CreateItem: FC<CreateItemProps> = ({
  createLabel,
  onCreate,
  disabled = false,
}) => {
  const { isOpen } = useSideBar();
  if (isOpen) {
    return (
      <MenuItemContainer>
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
    <MenuItemContainer>
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

export default CreateItem;
