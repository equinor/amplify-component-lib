import { spacings } from 'src/atoms';
import { TopBarMenu } from 'src/organisms/TopBar/TopBarMenu';
import { render, screen } from 'src/tests/jsdomtest-utils';

test('withGap works as expected', async () => {
  const onClose = vi.fn();
  render(
    <TopBarMenu open onClose={onClose} anchorEl={null} withGap>
      <div>menu text</div>
    </TopBarMenu>
  );

  expect(screen.getByRole('menu').parentElement).toHaveStyleRule(
    'gap',
    spacings.large,
    {
      modifier: '> div[role="menu"]',
    }
  );
});
