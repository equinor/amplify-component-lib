import { FC } from 'react';

import { Menu } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { spacings } = tokens;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.medium};
`;
interface ShortcutOptionsProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}
const ShortcutOptions: FC<ShortcutOptionsProps> = ({
  open,
  anchorEl,
  onClose,
}) => {
  return (
    <>
      <Menu open={open} anchorEl={anchorEl} onClose={onClose}>
        <Menu.Item onClick={() => console.log('Hide')}> Hide </Menu.Item>
        <Menu.Item onClick={() => console.log('favorite ')}>
          Add to Favorite{' '}
        </Menu.Item>
      </Menu>
    </>
  );
};

export default ShortcutOptions;
