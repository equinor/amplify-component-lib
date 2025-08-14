/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement } from 'react';

import { PARAM_KEY } from './constants';

import type {
  PartialStoryFn as StoryFunction,
  Renderer,
} from 'storybook/internal/types';
import { useEffect, useGlobals } from 'storybook/preview-api';

export const withTheme = (StoryFn: StoryFunction<Renderer>) => {
  const [globals, updateGlobals] = useGlobals();

  const themeMode = globals[PARAM_KEY];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode, updateGlobals]);

  return StoryFn() as ReactElement;
};
