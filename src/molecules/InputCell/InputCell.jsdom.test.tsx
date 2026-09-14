import {
  ComponentPropsWithRef,
  createRef,
  KeyboardEvent,
  useState,
} from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { InputCell } from 'src/molecules/InputCell/InputCell';
import { TextField } from 'src/molecules/TextField/TextField';

function CustomInput(props: ComponentPropsWithRef<'input'>) {
  return <input {...props} />;
}

describe('InputCell', () => {
  test('defaults to a table cell and preserves native attributes and its ref', () => {
    const ref = createRef<HTMLTableCellElement>();
    const { unmount } = render(
      <table>
        <tbody>
          <tr>
            <InputCell
              ref={ref}
              colSpan={2}
              rowSpan={3}
              headers="name"
              id="editable-cell"
              className="consumer-cell"
              data-column="name"
              aria-label="Editable name"
            >
              Name
            </InputCell>
          </tr>
        </tbody>
      </table>
    );

    const cell = screen.getByRole('cell', { name: 'Editable name' });
    expect(cell.tagName).toBe('TD');
    expect(cell).toHaveAttribute('data-input-cell');
    expect(cell).toHaveAttribute('colspan', '2');
    expect(cell).toHaveAttribute('rowspan', '3');
    expect(cell).toHaveAttribute('headers', 'name');
    expect(cell).toHaveAttribute('id', 'editable-cell');
    expect(cell).toHaveAttribute('data-column', 'name');
    expect(cell).toHaveClass('consumer-cell');
    expect(cell).toHaveTextContent('Name');
    expect(ref.current).toBe(cell);

    unmount();
    expect(ref.current).toBeNull();
  });

  test('supports a grid div with native attributes and a div ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <InputCell
        as="div"
        ref={ref}
        role="gridcell"
        aria-colindex={2}
        tabIndex={0}
        title="Edit name"
        noBottomBorder
      />
    );

    const cell = screen.getByRole('gridcell');
    expect(cell.tagName).toBe('DIV');
    expect(cell).toHaveAttribute('data-input-cell');
    expect(ref.current).toBe(cell);
    expect(cell).toHaveAttribute('aria-colindex', '2');
    expect(cell).toHaveAttribute('tabindex', '0');
    expect(cell).toHaveAttribute('title', 'Edit name');
    expect(cell).not.toHaveAttribute('noBottomBorder');
    expect(cell).toBeEmptyDOMElement();
  });

  test('composes arbitrary children within an isolated styling scope', () => {
    render(
      <>
        <CustomInput aria-label="Before" />
        <InputCell as="div" role="gridcell">
          Prefix
          <>
            <span>Nested content</span>
            <CustomInput aria-label="Inside" defaultValue="Original" />
          </>
          Suffix
        </InputCell>
        <CustomInput aria-label="After" />
      </>
    );

    const cell = screen.getByRole('gridcell');
    expect(cell).toHaveTextContent('PrefixNested contentSuffix');
    expect(screen.getAllByRole('textbox')).toHaveLength(3);
    expect(screen.getByLabelText('Inside')).toHaveValue('Original');
    expect(
      screen.getByLabelText('Before').closest('[data-input-cell]')
    ).toBeNull();
    expect(
      screen.getByLabelText('Inside').closest('[data-input-cell]')
    ).not.toBeNull();
    expect(
      screen.getByLabelText('After').closest('[data-input-cell]')
    ).toBeNull();
  });

  test('leaves controlled values, callbacks, and custom input refs with the consumer', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLInputElement>();
    const onChange = vi.fn();

    function ControlledEditor() {
      const [value, setValue] = useState('A');
      return (
        <InputCell as="div">
          <CustomInput
            ref={ref}
            aria-label="Controlled editor"
            value={value}
            onChange={(event) => {
              onChange(event.target.value);
              setValue(event.target.value.toUpperCase());
            }}
          />
        </InputCell>
      );
    }

    render(<ControlledEditor />);
    const input = screen.getByRole('textbox');
    expect(ref.current).toBe(input);

    await user.type(input, 'b');

    expect(onChange).toHaveBeenCalledExactlyOnceWith('Ab');
    expect(input).toHaveValue('AB');
    expect(ref.current).toBe(input);
  });

  test('preserves an uncontrolled value and input ref across cell presentation changes', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLInputElement>();
    const { rerender } = render(
      <InputCell as="div">
        <input ref={ref} aria-label="Uncontrolled editor" defaultValue="A" />
      </InputCell>
    );
    const input = screen.getByRole('textbox');

    await user.type(input, 'b');
    rerender(
      <InputCell as="div" active variant="error" noBottomBorder>
        <input ref={ref} aria-label="Uncontrolled editor" defaultValue="A" />
      </InputCell>
    );

    expect(input).toHaveValue('Ab');
    expect(screen.getByRole('textbox')).toBe(input);
    expect(ref.current).toBe(input);
  });

  test.each([false, true])(
    'preserves input callbacks and bubbling with preventDefault=%s',
    (preventDefault) => {
      const onCellKeyDown = vi.fn();
      const callbacks = {
        onFocus: vi.fn(),
        onBlur: vi.fn(),
        onChange: vi.fn(),
        onKeyUp: vi.fn(),
        onKeyDown: vi.fn((event: KeyboardEvent<HTMLInputElement>) => {
          if (preventDefault) event.preventDefault();
        }),
      };
      render(
        <InputCell as="div" onKeyDown={onCellKeyDown}>
          <input aria-label="Editor" {...callbacks} />
        </InputCell>
      );
      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: 'Updated' } });
      expect(fireEvent.keyDown(input, { key: 'Enter' })).toBe(!preventDefault);
      fireEvent.keyUp(input, { key: 'Enter' });
      fireEvent.blur(input);

      for (const [name, callback] of Object.entries(callbacks)) {
        expect(callback).toHaveBeenCalledExactlyOnceWith(
          expect.objectContaining({
            target: input,
            defaultPrevented: name === 'onKeyDown' && preventDefault,
          })
        );
      }
      expect(input).toHaveValue('Updated');
      expect(onCellKeyDown).toHaveBeenCalledExactlyOnceWith(
        expect.objectContaining({
          target: input,
          key: 'Enter',
          defaultPrevented: preventDefault,
        })
      );
    }
  );

  test.each(['disabled', 'readOnly'] as const)(
    'leaves %s under consumer control',
    async (attribute) => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const example = (restricted: boolean) => (
        <InputCell as="div" active variant="error">
          <input
            aria-label="Editor"
            defaultValue="Original"
            onChange={onChange}
            {...{ [attribute]: restricted }}
          />
        </InputCell>
      );
      const { rerender } = render(example(true));
      const input = screen.getByRole('textbox');

      await user.type(input, 'x');
      expect(input).toHaveValue('Original');
      expect(onChange).not.toHaveBeenCalled();
      expect(input).toHaveAttribute(attribute.toLowerCase());

      rerender(example(false));
      await user.type(input, 'x');

      expect(input).toHaveValue('Originalx');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(input).not.toHaveAttribute(attribute.toLowerCase());
    }
  );

  test.each(['error', 'warning', 'success', 'dirty'] as const)(
    'keeps active and %s visual-only without setting input state',
    (variant) => {
      render(
        <InputCell as="div" role="gridcell" active variant={variant}>
          <input aria-label="Editor" defaultValue="Original" />
        </InputCell>
      );
      const cell = screen.getByRole('gridcell');
      const input = screen.getByRole('textbox');

      expect(input).toHaveValue('Original');
      expect(input).toBeEnabled();
      expect(input).not.toHaveAttribute('readonly');
      expect(input).not.toHaveAttribute('aria-invalid');
      expect(input).not.toHaveFocus();
      expect(cell).not.toHaveAttribute('active');
      expect(cell).not.toHaveAttribute('variant');
      expect(cell).not.toHaveAttribute('aria-invalid');
    }
  );

  test('preserves TextField native props, validation, helper text, and change behavior', () => {
    const onChange = vi.fn();
    render(
      <InputCell as="div" variant="success">
        <TextField
          id="email"
          label="Email"
          name="email"
          type="email"
          required
          placeholder="name@example.com"
          autoComplete="email"
          defaultValue="invalid"
          aria-invalid="true"
          variant="error"
          helperText="Enter a valid email"
          onChange={onChange}
        />
      </InputCell>
    );
    const input = screen.getByRole('textbox', { name: /Email/ });

    expect(input).toHaveAttribute('id', 'email');
    expect(input).toHaveAttribute('name', 'email');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('placeholder', 'name@example.com');
    expect(input).toHaveAttribute('autocomplete', 'email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toBeRequired();
    expect(input).toHaveValue('invalid');
    expect(input).toBeInvalid();
    expect(screen.getByText('Enter a valid email')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'name@example.com' } });

    expect(input).toHaveValue('name@example.com');
    expect(onChange).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({ target: input })
    );
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });
});
