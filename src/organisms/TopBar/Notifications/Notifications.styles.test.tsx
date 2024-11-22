import { colors } from 'src/atoms/style';
import { UnreadRedDot } from 'src/organisms/TopBar/TopBar.styles';
import { render } from 'src/tests/browsertest-utils';

test('Unread dot renders as expected', () => {
  const { container } = render(<UnreadRedDot />);
  const unreadDot = container.children[0];
  expect(unreadDot).toHaveStyleRule(
    'background-color',
    colors.interactive.danger__resting.rgba
  );
});
