/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement } from 'react';

import { PARAM_KEY } from './constants';

import type {
  PartialStoryFn as StoryFunction,
  Renderer,
} from 'storybook/internal/types';
import { useEffect, useGlobals } from 'storybook/preview-api';

export const withSpacingsMode = (StoryFn: StoryFunction<Renderer>) => {
  const [globals, updateGlobals] = useGlobals();

  const spacingsMode = globals[PARAM_KEY];

  useEffect(() => {
    document.documentElement.setAttribute('data-spacing-mode', spacingsMode);
  }, [spacingsMode, updateGlobals]);

  return StoryFn() as ReactElement;
};
