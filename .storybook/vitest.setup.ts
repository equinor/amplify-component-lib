import { setProjectAnnotations } from '@storybook/react-vite';
import { cleanup } from '@testing-library/react';

import * as projectAnnotations from './preview';

import { afterEach } from 'vitest';

// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
setProjectAnnotations([projectAnnotations]);

afterEach(() => {
  cleanup();
});
