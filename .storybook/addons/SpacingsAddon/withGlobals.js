/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useGlobals } from "@storybook/preview-api";

import { PARAM_KEY, } from "./constants";

export const withGlobals = (StoryFn) => {
  const [globals, updateGlobals] = useGlobals();

  const spacingsMode = globals[PARAM_KEY];

  console.log('spacingsMode', spacingsMode);
  useEffect(() => {
      document.documentElement.setAttribute('data-spacing-mode', spacingsMode);
  }, [spacingsMode,  updateGlobals]);

  return StoryFn();
};