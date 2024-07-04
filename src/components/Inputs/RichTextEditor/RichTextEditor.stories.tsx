import { StoryFn } from '@storybook/react';

import Counter from './custom-extensions/Counter';
import AmplifyBar, {
  MenuBar,
  MenuBars,
  MenuButton,
  MenuSection,
  TextFormating,
  TextHistory,
} from './MenuBar/MenuBar';
import TableMenuBar from './MenuBar/Table/TableBar';
import RichTextEditor, {
  EditorContent,
  EditorProvider,
  EditorStyling,
  RichTextEditorProps,
  useFeatures,
} from './RichTextEditor';
import {
  DEFAULT_FEATURES,
  RichTextEditorFeatures,
} from './RichTextEditor.types';
import { amplify_h2, amplify_h3 } from 'src/components/Icons/AmplifyIcons';

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
    border: true,
    padding: 'md',
    lightBackground: false,
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
      value={`<h2>This is header inserting the EDS typography component into the rich text</h2>
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

export const CustomEditor: StoryFn<RichTextEditorProps> = (args) => {
  const string = `<p>The rich text editor is built off a compound component architecture. This means that you can use the individual primitives to take full control. Notice in this example that the MenuBar is below the rich text editor content even though theres no prop to allow you to do this. If you look at the code you will notice that in this example we are no longer using the higher level RichTextEditor component. Instead we are breaking out the smaller primitive components that make up the RichTextEditor. This way you have full control of all the parts in the editor. You can mix an match them as you please. Decide which individual parts you need to take over will still using the other parts.</p>`;

  // Hook that lets you apply the features API for filtering extensions
  const usingFeatures = useFeatures({
    features: args.features,
    extendFeatures: args.extendFeatures,
    removeFeatures: args.removeFeatures,
    onImageUpload: args.onImageUpload,
  });
  return (
    <EditorStyling
      $padding={args.padding}
      $maxHeight={args.maxHeight}
      $lightBackground={args.lightBackground}
      $border={args.border}
    >
      <EditorProvider
        extensions={[Counter]}
        onUpdate={args.onChange}
        onImageUpload={args.onImageUpload}
        content={string}
        features={usingFeatures}
      >
        {(editor) => (
          <div>
            <EditorContent editor={editor} />
            <AmplifyBar editor={editor} features={DEFAULT_FEATURES} />
          </div>
        )}
      </EditorProvider>
    </EditorStyling>
  );
};

export const CustomExtensions: StoryFn<RichTextEditorProps> = (args) => {
  const string = `<p>Breaking the RichTextEditor into its smaller primitive components also allows you to insert your own TipTap extensions. This is not just an example of inserting a custom extension into the editor but also an example of using NodeViews to render React components inside rich text.</p><counter count="0"><p>This is editable. You can create a new component by pressing Mod+Enter.</p> Also, try to delete me with backspace or delete. Move cursor in and out of me with arrow keys. And notice that I can even carry state because I am a react component inside your rich text.</counter>`;
  return (
    <EditorStyling
      $padding={args.padding}
      $maxHeight={args.maxHeight}
      $lightBackground={args.lightBackground}
      $border={args.border}
    >
      <EditorProvider
        content={string}
        extensions={[Counter]}
        onUpdate={args.onChange}
        onImageUpload={args.onImageUpload}
      >
        {(editor) => (
          <div>
            <AmplifyBar editor={editor} features={DEFAULT_FEATURES} />
            <EditorContent editor={editor} />
          </div>
        )}
      </EditorProvider>
    </EditorStyling>
  );
};

export const CompoundComponents: StoryFn<RichTextEditorProps> = (args) => {
  const string = `<p>With a compound component architecture, you can take full control of every part of the editor. Notice that in this example we can add our own menu buttons for making text commands in the editor.</p>`;

  // Hook that lets you apply the features API for filtering extensions
  const usingFeatures = useFeatures({
    features: args.features,
    extendFeatures: args.extendFeatures,
    removeFeatures: args.removeFeatures,
    onImageUpload: args.onImageUpload,
  });

  return (
    <EditorStyling
      $padding={args.padding}
      $maxHeight={args.maxHeight}
      $lightBackground={args.lightBackground}
      $border={args.border}
    >
      <EditorProvider
        extensions={[Counter]}
        onUpdate={args.onChange}
        onImageUpload={args.onImageUpload}
        content={string}
        features={usingFeatures}
      >
        {(editor) => (
          <div>
            <MenuBars>
              {/* Main Bar */}
              <MenuBar>
                <TextHistory editor={editor} />
                <TextFormating editor={editor} />
                <MenuSection>
                  <MenuButton
                    active={editor.isActive('heading', { level: 2 })}
                    icon={amplify_h2}
                    onClick={() =>
                      editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                  >
                    Title 2
                  </MenuButton>
                  <MenuButton
                    active={editor.isActive('heading', { level: 3 })}
                    icon={amplify_h3}
                    onClick={() =>
                      editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                  >
                    Title 3
                  </MenuButton>
                </MenuSection>
              </MenuBar>
              {/* Sub Bar */}
              <TableMenuBar editor={editor} />
            </MenuBars>
            <EditorContent editor={editor} />
          </div>
        )}
      </EditorProvider>
    </EditorStyling>
  );
};
