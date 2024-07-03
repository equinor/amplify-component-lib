import { StoryFn } from '@storybook/react';

import RichTextEditor, {
  RichTextEditorProps,
  EditorProvider,
  EditorWrapper,
  EditorContent,
  MenuBar,
} from './RichTextEditor';
import {
  DEFAULT_FEATURES,
  RichTextEditorFeatures,
} from './RichTextEditor.types';
import Counter from './custom-extensions/Counter';

export default {
  title: 'Inputs/RichTextEditor',
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
    features: [...DEFAULT_FEATURES],
    onImageUpload: (file: File) => {
      console.log(file.name);
      return '';
    },
  },
};

export const Primary: StoryFn<RichTextEditorProps> = (args) => {
  return <RichTextEditor {...args} />;
};

export const FormattedText: StoryFn<RichTextEditorProps> = (args) => {
  return (
    <RichTextEditor
      {...args}
      value="<p><b>This text is bold</b></p><p><i>This text is italic</i></p>"
    />
  );
};

export const Headers: StoryFn<RichTextEditorProps> = (args) => {
  return (
    <RichTextEditor
      {...args}
      value={`<h2>This is header</h2>
      <h3>This is also a header</h3>`}
    />
  );
};

export const UnorderedList: StoryFn<RichTextEditorProps> = (args) => {
  return (
    <RichTextEditor
      {...args}
      value="<ul><li><p>This </p></li><li><p>Is</p></li><li><p>A</p></li><li><p>List</p></li></ul>"
    />
  );
};

export const OrderedList: StoryFn<RichTextEditorProps> = (args) => {
  return (
    <RichTextEditor
      {...args}
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

export const Link: StoryFn<RichTextEditorProps> = (args) => {
  return (
    <RichTextEditor
      {...args}
      value={`<p>This text contains a <a target="_blank" rel="noopener noreferrer nofollow" href="https://vg.no">link</a></p>`}
    />
  );
};

export const Table: StoryFn<RichTextEditorProps> = (args) => {
  return (
    <RichTextEditor
      {...args}
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

const CompoundComponentString = `
<p>
  This is still the text editor you’re used to, but enriched with node views.
</p>
`;

export const CompoundComponent: StoryFn<RichTextEditorProps> = () => {
  const padding = 'md';
  const maxHeight = '1600px';
  const lightBackground = false;
  const border = true;

  return (
    <EditorWrapper
      $padding={padding}
      $maxHeight={maxHeight}
      $lightBackground={lightBackground}
      $border={border}
    >
      <EditorProvider content={CompoundComponentString} extensions={[Counter]}>
        {(editor) => (
          <div>
            <EditorContent editor={editor} />
            <MenuBar editor={editor} features={DEFAULT_FEATURES} />
          </div>
        )}
      </EditorProvider>
    </EditorWrapper>
  );
};

const string = `
<p>
  This is still the text editor you’re used to, but enriched with node views.
</p>
<counter count="0">
  <p>This is editable. You can create a new component by pressing Mod+Enter.</p>
</counter>
<p>
  Did you see that? That’s a React component. We are really living in the future.
</p>
`;

export const CustomExtensions: StoryFn<RichTextEditorProps> = () => {
  const padding = 'md';
  const maxHeight = '200px';
  const lightBackground = false;
  const border = true;

  return (
    <EditorWrapper
      $padding={padding}
      $maxHeight={maxHeight}
      $lightBackground={lightBackground}
      $border={border}
    >
      <EditorProvider content={string} extensions={[Counter]}>
        {(editor) => (
          <div>
            <MenuBar editor={editor} features={DEFAULT_FEATURES} />
            <EditorContent editor={editor} />
          </div>
        )}
      </EditorProvider>
    </EditorWrapper>
  );
};
