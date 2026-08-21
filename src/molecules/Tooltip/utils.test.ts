import { createRef } from 'react';

import { assignRef } from 'src/molecules/Tooltip/utils';

it('calls function refs', () => {
  const fn = vi.fn();
  const node = document.createElement('div');

  assignRef(fn, node);
  expect(fn).toHaveBeenCalledWith(node);
});

it('assigns object refs', () => {
  const ref = createRef<HTMLDivElement>();
  const node = document.createElement('div');

  assignRef(ref, node);
  expect(ref.current).toBe(node);
});
