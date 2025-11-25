import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { vi } from 'vitest';

import Counter from './custom-extensions/Counter';
import { EditorMenu, EditorText } from './MenuBar/MenuBar';
import { TableMenuBar } from './MenuBar/Table/TableBar';
import { RichTextEditor, RichTextEditorProps } from './RichTextEditor';
import {
  DEFAULT_FEATURES,
  RichTextEditorFeatures,
} from './RichTextEditor.types';
import { RichText } from '.';
import { amplify_h2, amplify_h3 } from 'src/atoms/icons/wysiwyg';
import { colors } from 'src/atoms/style';
import { getFeatures } from 'src/atoms/utils';

const meta: Meta<typeof RichTextEditor> = {
  title: 'Molecules/RichTextEditor',
  component: RichTextEditor,
  argTypes: {
    features: {
      control: 'multi-select',
      options: [...DEFAULT_FEATURES],
    },
    onChange: { action: 'Fired onChange fn' },
    onImageUpload: { action: 'Fired onImageUpload fn' },
  },
  args: {
    border: true,
    padding: 'md',
    minHeight: 'auto',
    maxHeight: '200px',
    lightBackground: true,
  },
};

export default meta;

export const Primary: StoryFn<RichTextEditorProps> = (args) => {
  return <RichTextEditor {...args} />;
};

export const AutoHeight: StoryFn<RichTextEditorProps> = (args) => {
  return (
    <div
      style={{
        height: '40rem',
        padding: '1rem',
        border: `1px solid ${colors.ui.background__heavy.rgba}`,
      }}
    >
      <RichTextEditor {...args} minHeight={undefined} maxHeight={undefined} />
    </div>
  );
};

export const FormattedText: StoryFn<RichTextEditorProps> = (args) => {
  return (
    <RichTextEditor
      {...args}
      features={[RichTextEditorFeatures.FORMATTING]}
      value="<p><b>This text is bold</b></p><p><i>This text is italic</i></p>"
    />
  );
};

export const Headers: StoryFn<RichTextEditorProps> = (args) => {
  return (
    <RichTextEditor
      {...args}
      features={[RichTextEditorFeatures.HEADERS]}
      value={`<h2>This is a header inserting the EDS typography component into the rich text</h2>
      <h3>This is also a header.</h3>
      <p>We can even switch between multiple react components depending on what h level we are using.</p>
      `}
    />
  );
};

export const Link: StoryFn<RichTextEditorProps> = (args) => {
  return (
    <RichTextEditor
      {...args}
      features={[RichTextEditorFeatures.LINKS]}
      value={`<p>This text contains a <a target="_blank" rel="noopener noreferrer nofollow" href="https://vg.no">link</a></p>`}
    />
  );
};

export const UnorderedList: StoryFn<RichTextEditorProps> = (args) => {
  return (
    <RichTextEditor
      {...args}
      features={[RichTextEditorFeatures.LISTS]}
      value="<ul><li><p>This </p></li><li><p>Is</p></li><li><p>A</p></li><li><p>List</p></li></ul>"
    />
  );
};

export const OrderedList: StoryFn<RichTextEditorProps> = (args) => {
  return (
    <RichTextEditor
      {...args}
      features={[RichTextEditorFeatures.LISTS]}
      value="<ol><li><p>One</p></li><li><p>Two</p></li><li><p>Three</p></li></ol>"
    />
  );
};

export const CodeBlock: StoryFn<RichTextEditorProps> = (args) => {
  return (
    <RichTextEditor
      {...args}
      value="<pre><code># This is a code block
if (green == 'blue') {
  return 'Woo!'
}</code></pre>"
    />
  );
};

const TableString = ` <table style="minWidth: 75px"><colgroup><col><col><col></colgroup><tbody><tr><td colspan="1" rowspan="1"><p>cell1</p></td><td colspan="1" rowspan="1"><p>cell2</p></td><td colspan="1" rowspan="1"><p>cell3</p></td></tr></tbody></table>`;

export const Table: StoryFn<RichTextEditorProps> = (args) => {
  return (
    <RichTextEditor
      {...args}
      value={TableString}
      features={[...DEFAULT_FEATURES, RichTextEditorFeatures.TABLE]}
    />
  );
};

export const MaxHeight: StoryFn<RichTextEditorProps> = (args) => {
  return (
    <RichTextEditor
      {...args}
      value={
        '<p>This text should exceed the maximum height of the RichTextEditor. When the text exceeds the maximum height, the overflow should be hidden and the text should be scrollable.</p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p><em>Peekaboo!</em></p>'
      }
      maxHeight="200px"
    />
  );
};

export const Variants: StoryFn<RichTextEditorProps> = (args) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '20rem 20rem',
        gap: '16px',
      }}
    >
      <RichTextEditor
        {...args}
        removeFeatures={[
          RichTextEditorFeatures.ALIGNMENT,
          RichTextEditorFeatures.IMAGES,
          RichTextEditorFeatures.TABLE,
          RichTextEditorFeatures.LINKS,
          RichTextEditorFeatures.LISTS,
        ]}
        maxHeight={undefined}
        variant="dirty"
        label="Label"
        meta="Meta"
        helperText="Helper text"
      />
      <RichTextEditor
        {...args}
        removeFeatures={[
          RichTextEditorFeatures.ALIGNMENT,
          RichTextEditorFeatures.IMAGES,
          RichTextEditorFeatures.TABLE,
          RichTextEditorFeatures.LINKS,
          RichTextEditorFeatures.LISTS,
        ]}
        maxHeight={undefined}
        variant="error"
        label="Label"
        meta="Meta"
        helperText="Helper text"
      />
      <RichTextEditor
        {...args}
        removeFeatures={[
          RichTextEditorFeatures.ALIGNMENT,
          RichTextEditorFeatures.IMAGES,
          RichTextEditorFeatures.TABLE,
          RichTextEditorFeatures.LINKS,
          RichTextEditorFeatures.LISTS,
        ]}
        maxHeight={undefined}
        variant="warning"
        label="Label"
        meta="Meta"
        helperText="Helper text"
      />
      <RichTextEditor
        {...args}
        removeFeatures={[
          RichTextEditorFeatures.ALIGNMENT,
          RichTextEditorFeatures.IMAGES,
          RichTextEditorFeatures.TABLE,
          RichTextEditorFeatures.LINKS,
          RichTextEditorFeatures.LISTS,
        ]}
        maxHeight={undefined}
        variant="success"
        label="Label"
        meta="Meta"
        helperText="Helper text"
      />
    </div>
  );
};

export const CustomEditor: StoryFn<RichTextEditorProps> = (args) => {
  const string = `<p>The rich text editor is built off a compound component architecture. This means that you can use the individual primitives to take full control. Notice in this example that the MenuBar is below the rich text editor content even though theres no prop to allow you to do this. If you look at the code you will notice that in this example we are no longer using the higher level RichTextEditor component. Instead we are breaking out the smaller primitive components that make up the RichTextEditor. This way you have full control of all the parts in the editor. You can mix an match them as you please. Decide which individual parts you need to take over while still using the other parts.</p>`;

  // Hook that lets you apply the features API for filtering extensions
  const usingFeatures = getFeatures({
    features: args.features,
    extendFeatures: args.extendFeatures,
    removeFeatures: args.removeFeatures,
    onImageUpload: args.onImageUpload,
  });
  return (
    <RichText.Styling
      $padding={args.padding}
      $lightBackground={args.lightBackground}
      $border={args.border}
    >
      <RichText.Provider
        extensions={[Counter]}
        onUpdate={args.onChange}
        onImageUpload={args.onImageUpload}
        content={string}
        features={usingFeatures}
      >
        {(editor) => (
          <div>
            <RichText.Content
              editor={editor}
              $maxHeight={args.maxHeight}
              $minHeight={args.minHeight}
            />
            <RichText.Bar editor={editor} features={DEFAULT_FEATURES} />
          </div>
        )}
      </RichText.Provider>
    </RichText.Styling>
  );
};

export const CustomExtensions: StoryFn<RichTextEditorProps> = (args) => {
  const string = `<p>Breaking the RichTextEditor into its smaller primitive components also allows you to insert your own TipTap extensions. This is not just an example of inserting a custom extension into the editor but also an example of using NodeViews to render React components inside rich text.</p><counter count="0"><p>This is editable. You can create a new component by pressing Mod+Enter.</p> Also, try to delete me with backspace or delete. Move cursor in and out of me with arrow keys. And notice that I can even carry state because I am a react component inside your rich text.</counter>`;
  return (
    <RichText.Styling
      $padding={args.padding}
      $lightBackground={args.lightBackground}
      $border={args.border}
    >
      <RichText.Provider
        content={string}
        extensions={[Counter]}
        onUpdate={args.onChange}
        onImageUpload={args.onImageUpload}
      >
        {(editor) => (
          <div>
            <RichText.Bar editor={editor} features={DEFAULT_FEATURES} />
            <RichText.Content
              editor={editor}
              $maxHeight={args.maxHeight}
              $minHeight={args.minHeight}
            />
          </div>
        )}
      </RichText.Provider>
    </RichText.Styling>
  );
};

export const CompoundComponents: StoryFn<RichTextEditorProps> = (args) => {
  const string = `<p>With a compound component architecture you can take full control of every part of the editor. Notice that in this example we can add our own menu buttons for making text commands in the editor.</p>`;

  // Hook that lets you apply the features API for filtering extensions
  const usingFeatures = getFeatures({
    features: args.features,
    extendFeatures: args.extendFeatures,
    removeFeatures: args.removeFeatures,
    onImageUpload: args.onImageUpload,
  });

  return (
    <RichText.Styling
      $padding={args.padding}
      $lightBackground={args.lightBackground}
      $border={args.border}
    >
      <RichText.Provider
        extensions={[Counter]}
        onUpdate={args.onChange}
        onImageUpload={args.onImageUpload}
        content={string}
        features={usingFeatures}
      >
        {(editor) => (
          <div>
            <EditorMenu.Bars>
              {/* Main Bar */}
              <EditorMenu.Bar>
                <EditorText.History editor={editor} />
                <EditorText.Formatting editor={editor} />
                <EditorMenu.Section>
                  <EditorMenu.Button
                    active={editor.isActive('heading', { level: 2 })}
                    icon={amplify_h2}
                    onClick={() =>
                      editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                  >
                    Title 2
                  </EditorMenu.Button>
                  <EditorMenu.Button
                    active={editor.isActive('heading', { level: 3 })}
                    icon={amplify_h3}
                    onClick={() =>
                      editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                  >
                    Title 3
                  </EditorMenu.Button>
                </EditorMenu.Section>
              </EditorMenu.Bar>
              {/* Sub Bar */}
              <TableMenuBar editor={editor} />
            </EditorMenu.Bars>
            <RichText.Content
              editor={editor}
              $maxHeight={args.maxHeight}
              $minHeight={args.minHeight}
            />
          </div>
        )}
      </RichText.Provider>
    </RichText.Styling>
  );
};

// Test stories for MenuBar components - checking feature visibility
export const TestHidesTextColorButton: StoryObj<typeof RichTextEditor> = {
  tags: ['test-only'],
  args: {
    value: '<p>test</p>',
    removeFeatures: [
      RichTextEditorFeatures.IMAGES,
      RichTextEditorFeatures.TEXT_COLOR,
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.queryByTestId('text-color-input');
    await expect(input).not.toBeInTheDocument();
  },
};

export const TestHidesHighlightButton: StoryObj<typeof RichTextEditor> = {
  tags: ['test-only'],
  args: {
    value: '<p>test</p>',
    extendFeatures: [RichTextEditorFeatures.HIGHLIGHT],
    removeFeatures: [
      RichTextEditorFeatures.IMAGES,
      RichTextEditorFeatures.HIGHLIGHT,
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.queryByTestId('highlight-button');
    await expect(input).not.toBeInTheDocument();
  },
};

export const TestHidesClearFormattingButton: StoryObj<typeof RichTextEditor> = {
  tags: ['test-only'],
  args: {
    value: '<p><span style="color: #f50000">test</span></p>',
    removeFeatures: [
      RichTextEditorFeatures.IMAGES,
      RichTextEditorFeatures.CLEAR_FORMATTING,
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.queryByTestId('clear-formatting');
    await expect(button).not.toBeInTheDocument();
  },
};

export const TestHidesCodeButton: StoryObj<typeof RichTextEditor> = {
  tags: ['test-only'],
  args: {
    value: '<p>test</p>',
    removeFeatures: [
      RichTextEditorFeatures.IMAGES,
      RichTextEditorFeatures.CODE,
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.queryByTestId('code-button');
    await expect(button).not.toBeInTheDocument();
  },
};

export const TestHidesAlignmentButtons: StoryObj<typeof RichTextEditor> = {
  tags: ['test-only'],
  args: {
    value: '<p>test</p>',
    removeFeatures: [
      RichTextEditorFeatures.IMAGES,
      RichTextEditorFeatures.ALIGNMENT,
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const left = canvas.queryByTestId('align-left-button');
    const center = canvas.queryByTestId('align-center-button');
    const right = canvas.queryByTestId('align-right-button');
    await expect(left).not.toBeInTheDocument();
    await expect(center).not.toBeInTheDocument();
    await expect(right).not.toBeInTheDocument();
  },
};

export const TestHidesHeaderButtons: StoryObj<typeof RichTextEditor> = {
  tags: ['test-only'],
  args: {
    value: '<p>test</p>',
    removeFeatures: [
      RichTextEditorFeatures.IMAGES,
      RichTextEditorFeatures.HEADERS,
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading2 = canvas.queryByTestId('h2-button');
    const heading3 = canvas.queryByTestId('h3-button');
    await expect(heading2).not.toBeInTheDocument();
    await expect(heading3).not.toBeInTheDocument();
  },
};

export const TestHidesHistoryButtons: StoryObj<typeof RichTextEditor> = {
  tags: ['test-only'],
  args: {
    value: '<p>test</p>',
    removeFeatures: [
      RichTextEditorFeatures.IMAGES,
      RichTextEditorFeatures.UNDO_REDO,
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const undo = canvas.queryByTestId('undo-button');
    const redo = canvas.queryByTestId('redo-button');
    await expect(undo).not.toBeInTheDocument();
    await expect(redo).not.toBeInTheDocument();
  },
};

export const TestHidesFormattingButtons: StoryObj<typeof RichTextEditor> = {
  tags: ['test-only'],
  args: {
    value: '<p>test</p>',
    removeFeatures: [
      RichTextEditorFeatures.IMAGES,
      RichTextEditorFeatures.FORMATTING,
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const bold = canvas.queryByTestId('bold-button');
    const italic = canvas.queryByTestId('italic-button');
    await expect(bold).not.toBeInTheDocument();
    await expect(italic).not.toBeInTheDocument();
  },
};

export const TestHidesListButtons: StoryObj<typeof RichTextEditor> = {
  tags: ['test-only'],
  args: {
    value: '<p>test</p>',
    removeFeatures: [
      RichTextEditorFeatures.IMAGES,
      RichTextEditorFeatures.LISTS,
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const bullet = canvas.queryByTestId('bullet-list-button');
    const ordered = canvas.queryByTestId('ordered-list-button');
    await expect(bullet).not.toBeInTheDocument();
    await expect(ordered).not.toBeInTheDocument();
  },
};

export const TestHidesLinkButtons: StoryObj<typeof RichTextEditor> = {
  tags: ['test-only'],
  args: {
    value: '<p>test</p>',
    removeFeatures: [
      RichTextEditorFeatures.IMAGES,
      RichTextEditorFeatures.LINKS,
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.queryByTestId('link-button');
    const unset = canvas.queryByTestId('unsetlink-button');
    await expect(link).not.toBeInTheDocument();
    await expect(unset).not.toBeInTheDocument();
  },
};

export const TestHidesAddImageButton: StoryObj<typeof RichTextEditor> = {
  tags: ['test-only'],
  args: {
    value: '<p>test</p>',
    onImageUpload: vi.fn(),
    removeFeatures: [RichTextEditorFeatures.IMAGES],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.queryByTestId('add-image-button');
    await expect(button).not.toBeInTheDocument();
  },
};
