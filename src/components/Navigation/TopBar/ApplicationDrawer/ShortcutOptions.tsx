import { FC, useRef, useState } from 'react';

import { Button, Icon, Menu } from '@equinor/eds-core-react';
import { more_vertical } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { applicationsProps } from './ApplicationDrawer';

import styled from 'styled-components';

const { shape, colors } = tokens;

const OptionsIcon = styled(Icon)`
  //display: none;
  &:hover {
    border-radius: ${shape.circle.borderRadius};
    background: ${colors.interactive.secondary__highlight.hex};
    //padding: 5px;
  }
  // :hover & {
  //   display: initial;
  // }
`;

interface ShortcutOptionsProps {
  applicationsItem: applicationsProps;
}
const ShortcutOptions: FC<ShortcutOptionsProps> = ({ applicationsItem }) => {
  const [shortcutOptions, setShortcutOptions] = useState(false);
  const [isFavorite, setIsFavorite] = useState<applicationsProps[]>([]);
  const [hideApplication, setHideApplication] = useState<applicationsProps[]>(
    []
  );
  const shortcutRef = useRef<HTMLButtonElement | null>(null);

  const showShortcutOptions = () => {
    setShortcutOptions(true);
  };

  const closeShortcutOptions = () => {
    setShortcutOptions(false);
  };

  const handleAddFavorite = (value: applicationsProps) => {
    setIsFavorite((prev) => {
      const newFavoriteList = Array.from(prev);
      newFavoriteList.push(value);
      return newFavoriteList;
    });
  };
  console.log(isFavorite, 'favorite');
  const handleHideApplication = (value: applicationsProps) => {
    setHideApplication((prev) => {
      const newHideList = Array.from(prev);
      newHideList.push(value);

      return newHideList;
    });
  };

  console.log(hideApplication, 'hide');

  return (
    <>
      <Button
        onClick={showShortcutOptions}
        variant="ghost_icon"
        ref={shortcutRef}
      >
        <OptionsIcon data={more_vertical} />
      </Button>
      {shortcutOptions && (
        <Menu
          open={shortcutOptions}
          anchorEl={shortcutRef.current}
          onClose={closeShortcutOptions}
          placement="bottom-start"
        >
          <Menu.Item onClick={() => handleHideApplication(applicationsItem)}>
            {' '}
            Hide{' '}
          </Menu.Item>
          <Menu.Item onClick={() => handleAddFavorite(applicationsItem)}>
            Add to Favorite{' '}
          </Menu.Item>
        </Menu>
      )}
    </>
  );
};

export default ShortcutOptions;
