import { ChangeEvent, useMemo, useState } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';
import { HeaderMdx } from '@storybook/addon-docs/blocks';
import { Meta, StoryFn } from '@storybook/react-vite';

import { Search } from 'src/molecules/Search/Search';
import page from 'src/storybook/EDSIconPreview/EDSIconPreview.docs.mdx';
import systemIcons from 'src/storybook/EDSIconPreview/stories/system-icons.json';

import styled from 'styled-components';

const meta: Meta = {
  title: 'Other/EDS Icons Preview',
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

type IconType = {
  value?: string;
} & IconData;

export const Preview: StoryFn = () => {
  const [searchValue, setSearchValue] = useState<string>('');

  const iconsByGroup = useMemo(() => {
    return systemIcons.reduce(
      (acc, val) => {
        if (val.name.includes(searchValue)) {
          const group =
            typeof acc[val.group] !== 'undefined' ? acc[val.group] : [];
          return {
            ...acc,
            [val.group]: [...group, val as unknown as IconType],
          };
        } else {
          return acc;
        }
      },
      {} as Record<string, IconType[]>
    );
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
      {Object.keys(iconsByGroup).map((key) => {
        return (
          <div key={key}>
            <HeaderMdx id={key} as="h2">
              {key}
            </HeaderMdx>
            <Group>
              {iconsByGroup[key].map((icon: IconType) => {
                const { name } = icon;
                return (
                  <IconItem key={name}>
                    <Icon data={icon} />
                    <IconLabel>{name}</IconLabel>
                  </IconItem>
                );
              })}
            </Group>
          </div>
        );
      })}
    </>
  );
};
