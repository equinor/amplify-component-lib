import { Typography } from '@equinor/eds-core-react';

import { colors, spacings } from 'src/atoms/style';

import styled from 'styled-components';

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: ${spacings.medium_small} ${spacings.medium};

  div[role='search'] {
    > div {
      outline: none !important;
    }

    input {
      color: ${colors.text.static_icons__default.rgba};
    }

    input:focus {
      box-shadow: inset 0 -2px 0 0 ${colors.interactive.primary__resting.rgba};
    }
  }
`;
export const NoFieldsText = styled(Typography)`
  margin: 0 auto ${spacings.medium};
`;
export const ListContainer = styled.div`
  max-height: 25vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

interface MenuItemProps {
  $active?: boolean;
}

export const MenuItem = styled.div<MenuItemProps>`
  &:hover {
    background: ${colors.interactive.primary__selected_hover.rgba};
    cursor: pointer;
  }

  border-top: 1px solid ${colors.ui.background__light.rgba};
  outline: none !important;
  padding: ${spacings.medium} ${spacings.large};
`;
export const MenuFixedItem = styled.div<MenuItemProps>`
  ${(props) =>
    props.$active &&
    `background: ${colors.interactive.primary__selected_highlight.rgba};
    `};

  > div {
    display: grid;
    grid-template-columns: 1fr 24px;
    justify-content: space-between;
    width: 100%;
  }

  &:hover {
    background: ${colors.interactive.primary__selected_hover.rgba};
    cursor: pointer;
  }

  border-top: 1px solid ${colors.ui.background__light.rgba};
  outline: none !important;
  padding: ${spacings.medium} ${spacings.large};

  svg {
    align-self: center;
  }
`;
export const MenuSection = styled.div`
  border-bottom: 1px solid ${colors.ui.background__light.rgba};
  display: flex;
  flex-direction: column;

  > p {
    margin-left: ${spacings.large};
    margin-bottom: ${spacings.small};
  }
`;
export const NoSearchResultsContainer = styled.div`
  padding-top: ${spacings.small};
  display: flex;
  align-items: center;
  padding-bottom: ${spacings.xxx_large};
`;
export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  > h6 {
    text-transform: capitalize;
  }
`;
