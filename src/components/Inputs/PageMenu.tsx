import { FC } from 'react';

import { tokens } from '@equinor/eds-tokens';

import { usePageMenu } from '../../providers/PageMenuProvider';

import styled from 'styled-components';

const { colors, shape, spacings } = tokens;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.small};
`;

interface PageMenuItemProps {
  active: boolean;
}

const PageMenuItem = styled.button<PageMenuItemProps>`
  display: flex;
  align-items: center;
  gap: ${spacings.comfortable.xx_small};
  color: ${colors.text.static_icons__default.hex};
  border: none;
  border-radius: ${shape.corners.borderRadius};
  min-width: 150px;
  width: fit-content;
  padding: ${spacings.comfortable.medium_small} ${spacings.comfortable.medium};
  text-align: left;
  background: ${(props) =>
    props.active ? colors.interactive.primary__hover_alt.hex : 'none'};
  transition: background 400ms;
  &:hover {
    background: ${colors.interactive.primary__hover_alt.hex};
    cursor: pointer;
  }
  font-family: 'Equinor', sans-serif;
  font-weight: 700;
  font-size: 14px;
`;

const PageMenu: FC = () => {
  const { items, selected, setSelected } = usePageMenu();

  const handleOnClick = (value: string) => {
    if (value !== selected) {
      setSelected(value);
    }
  };

  return (
    <Container>
      {items.map((item) => (
        <PageMenuItem
          key={`page-menu-item-${item.value}`}
          id={item.value}
          active={selected === item.value}
          onClick={() => handleOnClick(item.value)}
        >
          {item.label}
        </PageMenuItem>
      ))}
    </Container>
  );
};

export default PageMenu;
