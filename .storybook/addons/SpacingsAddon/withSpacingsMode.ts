/* eslint-disable react-hooks/rules-of-hooks */
import { ReactElement } from 'react';

import { useEffect, useGlobals } from '@storybook/preview-api';
import type {
  PartialStoryFn as StoryFunction,
  Renderer,
} from '@storybook/types';

import { PARAM_KEY } from './constants';

export const withSpacingsMode = (StoryFn: StoryFunction<Renderer>) => {
  const [globals, updateGlobals] = useGlobals();

  const spacingsMode = globals[PARAM_KEY];

  useEffect(() => {
    document.documentElement.setAttribute('data-spacing-mode', spacingsMode);
  }, [spacingsMode, updateGlobals]);

  return StoryFn() as ReactElement;
};
