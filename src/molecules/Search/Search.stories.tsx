import { ChangeEvent, useEffect, useState } from 'react';

import {
  Button,
  Density,
  EdsProvider,
  SearchProps,
} from '@equinor/eds-core-react';
import { Meta, StoryFn } from '@storybook/react-vite';

import { Search } from 'src/molecules/Search/Search';
import page from 'src/molecules/Search/Search.docs.mdx';

import { action } from 'storybook/actions';

const meta: Meta<typeof Search> = {
  title: 'Molecules/Search',
  component: Search,
  parameters: {
    docs: {
      page,
    },
  },
};

export default meta;

const handleOnChange = action('onChange');

export const Introduction: StoryFn<SearchProps> = () => {
  return (
    <Search
      aria-label="sitewide"
      id="search-normal"
      placeholder="Search"
      onChange={handleOnChange}
    />
  );
};

export const Accessibility: StoryFn<SearchProps> = () => (
  <form action="/static">
    <Search
      placeholder="Search"
      aria-label="Search for example items"
      onChange={handleOnChange}
    />
  </form>
);

export const Disabled: StoryFn<SearchProps> = () => (
  <Search
    aria-label="disabled"
    id="search-disabled"
    placeholder="Search"
    disabled
  />
);

export const Controlled: StoryFn<SearchProps> = () => {
  const [searchValue, setSearchValue] = useState('Initial value');

  const handleOnSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    handleOnChange();
    setSearchValue(value);
  };

  return (
    <>
      <Search
        id="search-external"
        aria-label="Search for Hello!"
        placeholder="Say hello! 🙋"
        onChange={handleOnSearchValueChange}
        value={searchValue}
      />
      <Button
        onClick={() => {
          setSearchValue('Hello search! 👋');
          action('Set search value')();
        }}
      >
        Say hello to search!
      </Button>
    </>
  );
};

export const Compact: StoryFn<SearchProps> = () => {
  const [density, setDensity] = useState<Density>('comfortable');

  useEffect(() => {
    // Simulate user change
    setDensity('compact');
  }, [density]);

  return (
    <EdsProvider density={density}>
      <Search
        aria-label="compact search example"
        id="search-compact"
        placeholder="Search"
        onChange={handleOnChange}
      />
    </EdsProvider>
  );
};
