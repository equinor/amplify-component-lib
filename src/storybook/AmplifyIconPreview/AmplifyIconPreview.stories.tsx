import { ChangeEvent, useMemo, useState } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';
import { HeaderMdx } from '@storybook/addon-docs/blocks';
import { Meta, StoryFn } from '@storybook/react-vite';

import page from './AmplifyIconPreview.docs.mdx';
import * as drillingIcons from 'src/atoms/icons/drilling';
import * as mapIcons from 'src/atoms/icons/map';
import * as otherIcons from 'src/atoms/icons/other';
import * as wysiwygIcons from 'src/atoms/icons/wysiwyg';
import { Search } from 'src/molecules/Search/Search';

import styled from 'styled-components';

const meta: Meta = {
  title: 'Other/Amplify Icons Preview',
  parameters: {
    docs: {
      page,
    },
    previewTabs: {
      canvas: { hidden: true },
    },
  },
};

export default meta;

const IconLabel = styled(Typography)`
  text-align: center;
  margin: 4px;
`;

const Group = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  row-gap: 1rem;
  column-gap: 1rem;
  margin: 0;
  padding: 24px 0;
`;

const IconItem = styled.li`
  display: flex;
  padding: 16px 0;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 10;
  &:hover {
    background-color: rgba(222, 237, 238, 0.3);
    border-radius: 4px;
  }
`;

const StyledSearch = styled(Search)`
  margin-bottom: 32px;
  margin-top: 32px;
`;

const ALL_ICONS = [
  {
    title: 'Drilling',
    icons: Object.values(drillingIcons),
  },
  {
    title: 'Map',
    icons: Object.values(mapIcons),
  },
  {
    title: 'Other',
    icons: Object.values(otherIcons),
  },
  {
    title: 'WYSIWYG',
    icons: Object.values(wysiwygIcons),
  },
];

type IconType = {
  value?: string;
} & IconData;

export const Preview: StoryFn = () => {
  const [searchValue, setSearchValue] = useState<string>('');

  const showingGroups = useMemo(() => {
    return ALL_ICONS.map((group) => ({
      ...group,
      icons: group.icons.filter((icon) =>
        icon.name.toLowerCase().includes(searchValue.toLowerCase())
      ),
    })).filter((group) => group.icons.length > 0);
  }, [searchValue]);

  return (
    <>
      <StyledSearch
        aria-label="Search for icons"
        id="search-normal"
        placeholder="Search"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setSearchValue(event.target.value)
        }
      />
      {showingGroups.map((group) => {
        return (
          <div key={group.title}>
            <HeaderMdx id={group.title} as="h2">
              {group.title}
            </HeaderMdx>
            <Group>
              {group.icons.map((icon: IconType) => (
                <IconItem key={icon.name}>
                  <Icon data={icon} size={24} />
                  <IconLabel>{icon.name}</IconLabel>
                </IconItem>
              ))}
            </Group>
          </div>
        );
      })}
    </>
  );
};
