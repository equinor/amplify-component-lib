import { FC, ReactNode, useRef, useState } from 'react';

import { Menu } from '@equinor/eds-core-react';

interface ButtonWithMenuProps {
  onOpenChange?: (value: boolean) => void;
  menuItems: ReactNode[];
  children: ReactNode[];
}

export const ButtonWithMenu: FC<ButtonWithMenuProps> = ({
  onOpenChange,
  menuItems,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleOnToggleOpen = () => {
    setOpen(!open);
    onOpenChange?.(!open);
  };

  const handleOnClose = () => {
    setOpen(false);
    onOpenChange?.(false);
  };

  return (
    <>
      <button ref={buttonRef} onClick={handleOnToggleOpen}>
        {children}
      </button>
      {open && (
        <Menu open anchorEl={buttonRef.current} onClose={handleOnClose}>
          {menuItems}
        </Menu>
      )}
    </>
  );
};
