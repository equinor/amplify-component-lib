import { ComponentPropsWithRef, ReactNode, useState } from 'react';

import { InputCell } from 'src/molecules/InputCell/InputCell';
import { TextField, TextFieldProps } from 'src/molecules/TextField/TextField';

import { expect, waitFor } from 'storybook/test';

export const transparent = 'rgba(0, 0, 0, 0)';
export const focusOutline = 'rgb(0, 112, 121) solid 2px';
export const dangerOutline = 'rgb(235, 0, 0) solid 2px';

export function ControlledEditor({
  onValueChange,
  ...props
}: ComponentPropsWithRef<'input'> & {
  onValueChange: (value: string) => void;
}) {
  const [value, setValue] = useState('A');
  return (
    <InputCell as="div">
      <input
        {...props}
        value={value}
        onChange={(event) => {
          onValueChange(event.target.value);
          setValue(event.target.value.toUpperCase());
        }}
      />
    </InputCell>
  );
}

export function TextCell(props: TextFieldProps) {
  return (
    <InputCell as="div" data-testid="cell" style={{ width: 200 }}>
      <div>
        <TextField aria-label="Text" {...props} />
      </div>
    </InputCell>
  );
}

export function UpdateExample({
  children,
}: {
  children: (updated: boolean) => ReactNode;
}) {
  const [updated, setUpdated] = useState(false);
  return (
    <>
      {children(updated)}
      <button onClick={() => setUpdated(true)}>Update example</button>
    </>
  );
}

// Synthetic pointer events do not activate CSS :hover. These hidden regression
// stories run with Vitest's Playwright-backed pointer, not Testing Library hover.
export async function hover(element: Element) {
  const { userEvent } = await import('@vitest/browser/context');
  await userEvent.hover(element);
  await waitFor(async () => {
    await expect(element.matches(':hover')).toBe(true);
  });
}
