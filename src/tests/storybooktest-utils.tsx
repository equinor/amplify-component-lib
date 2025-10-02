import { waitFor } from '@testing-library/react';

import { expect, within } from 'storybook/test';

export async function waitForProgressBarToFinish(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  const progressBar = await canvas.findByRole('progressbar');
  await waitFor(
    async () => {
      await expect(progressBar).not.toBeVisible();
    },
    { timeout: 2000 }
  );
}
