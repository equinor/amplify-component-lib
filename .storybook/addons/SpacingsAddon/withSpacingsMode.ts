/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useGlobals } from "@storybook/preview-api";
import type {
  Renderer,
  PartialStoryFn as StoryFunction,
} from "@storybook/types";

import { PARAM_KEY } from "./constants"
import { ReactElement } from 'react';

export const withSpacingsMode
  = (StoryFn: StoryFunction<Renderer>) => {
  const [globals, updateGlobals] = useGlobals();

  const spacingsMode = globals[PARAM_KEY];

  console.log('spacingsMode', spacingsMode);
  useEffect(() => {
      document.documentElement.setAttribute('data-spacing-mode', spacingsMode);
  }, [spacingsMode,  updateGlobals]);

  return StoryFn() as ReactElement;
};