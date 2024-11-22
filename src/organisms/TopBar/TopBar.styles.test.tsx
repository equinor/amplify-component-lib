import { MemoryRouter } from 'react-router-dom';

import { Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { colors, spacings } from 'src/atoms';
import { TopBar } from 'src/organisms';
import { render, screen } from 'src/tests/browsertest-utils';

import { expect } from 'vitest';

const { spacings: eds_spacings } = tokens;

test('Renders with correct styles', () => {
  const appName = 'Car-go 🏎';
  const button1 = 'button1';

  render(
    <TopBar applicationIcon="car" applicationName={appName}>
      <TopBar.Actions>
        <Button>{button1}</Button>
      </TopBar.Actions>
    </TopBar>,
    { wrapper: MemoryRouter }
  );

  const topBar = screen.getByRole('banner');
  const headerContainer = topBar.firstChild;
  const appIdentifier = screen.getByRole('link', { name: appName });

  expect(topBar).toHaveStyleRule(
    'border-bottom',
    `1px solid ${colors.ui.background__medium.rgba}`
  );
  expect(topBar).toHaveStyleRule(
    'background',
    colors.ui.background__default.rgba
  );
  expect(topBar).toHaveStyleRule('padding-top', eds_spacings.comfortable.small);
  expect(topBar).toHaveStyleRule(
    'padding-right',
    eds_spacings.comfortable.large
  );
  expect(topBar).toHaveStyleRule(
    'padding-bottom',
    eds_spacings.comfortable.small
  );
  expect(topBar).toHaveStyleRule('padding-left', spacings.medium);
  expect(topBar).toHaveStyleRule('align-items', 'center');
  expect(topBar).toHaveStyleRule('height', '64px');

  expect(headerContainer).toHaveStyleRule('gap', spacings.medium);

  expect(appIdentifier).toHaveStyleRule('display', 'flex');
  expect(appIdentifier).toHaveStyleRule('align-items', 'center');
  expect(appIdentifier).toHaveStyleRule('gap', spacings.medium_small);
});
