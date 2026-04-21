import type { MswParameters } from 'msw-storybook-addon';

import '@storybook/react';

declare module '@storybook/react' {
  interface Parameters {
    msw?: MswParameters['msw'];
    router?: {
      routes: string[];
      initial: string;
    };
    design?: {
      type: 'figma';
      url: string;
    };
    sidebar?: boolean;
    fullPage?: boolean;
  }
}
