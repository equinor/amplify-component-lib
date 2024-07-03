import { FC, useMemo } from 'react';

import { AmplifyKit } from './custom-extensions/DefaultKit';
import {
  EditorEvents,
  useEditor,
  EditorContent,
  Extensions,
  Editor,
} from '@tiptap/react';
import Counter from './custom-extensions/Counter';

import MenuBar from './MenuBar/MenuBar';
import { Wrapper } from './RichTextEditor.styles';
import {
  DEFAULT_FEATURES,
  OnImageUploadFn,
  RichTextEditorFeatures,
} from './RichTextEditor.types';

export interface RichTextEditorProps {
  value: string | null | undefined;
  onChange: (value: string) => void;
  onImageUpload?: OnImageUploadFn;
  placeholder?: string;
  features?: RichTextEditorFeatures[];
  extendFeatures?: RichTextEditorFeatures[];
  removeFeatures?: RichTextEditorFeatures[];
  padding?: 'sm' | 'md' | 'lg' | 'none';
  maxHeight?: string;
  lightBackground?: boolean;
  border?: boolean;
}

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

const useFeatures = ({
  features,
  extendFeatures,
  removeFeatures,
  onImageUpload,
}: {
  features?: RichTextEditorFeatures[];
  extendFeatures?: RichTextEditorFeatures[];
  removeFeatures?: RichTextEditorFeatures[];
  onImageUpload?: OnImageUploadFn;
}) => {
  /* c8 ignore nextline */
  if (features && (extendFeatures ?? removeFeatures)) {
    throw new Error(
      `Can't specify both 'features' and 'extend/remove' features!
       Extend/remove can only be used when not specifying 'features'`
    );
  }

  const usingFeatures = useMemo(() => {
    if (features) return features;
    return [...DEFAULT_FEATURES, ...(extendFeatures ?? [])]
      .filter((feature) => !removeFeatures?.includes(feature))
      .filter((value, index, array) => index === array.indexOf(value));
  }, [features, extendFeatures, removeFeatures]);

  if (usingFeatures.length === 0) {
    throw new Error('Features cannot be empty!');
  } else if (
    usingFeatures.includes(RichTextEditorFeatures.IMAGES) &&
    onImageUpload === undefined
  ) {
    throw new Error(
      `onImageUpload cannot be undefined when features include images!
      Either add the onImageUpload function or remove RichTextEditorFeatures.IMAGES from the features array`
    );
  }

  return usingFeatures;
};

const RichTextEditor: FC<RichTextEditorProps> = ({
  value = string,
  onChange,
  onImageUpload,
  placeholder = 'Suck it',
  features,
  extendFeatures,
  removeFeatures,
  padding = 'md',
  maxHeight,
  lightBackground,
  border = true,
}) => {
  const usingFeatures = useFeatures({
    features,
    extendFeatures,
    removeFeatures,
    onImageUpload,
  });

  const extensions = useMemo(
    () => [
      AmplifyKit.configure({
        image: {
          onImageUpload: () => {
            console.log('rex Image uploaded');
            return Promise.resolve({ b64: 'rex', url: 'rex' });
          },
        },
        placeholder: { placeholder },
      }),
      Counter,
    ],
    [onImageUpload, placeholder]
  );

  const handleOnUpdate = ({ editor }: EditorEvents['update']) => {
    onChange?.(editor.getHTML());
  };

  return (
    <Wrapper
      $padding={padding}
      $maxHeight={maxHeight}
      $lightBackground={lightBackground}
      $border={border}
    >
      <EditorProvider
        value={value}
        extensions={extensions}
        onUpdate={handleOnUpdate}
      >
        {(editor) => (
          <div>
            <MenuBar
              editor={editor}
              features={usingFeatures}
              onImageUpload={onImageUpload}
            />
            <EditorContent editor={editor} />
          </div>
        )}
      </EditorProvider>
    </Wrapper>
  );
};

interface EditorProviderProps {
  children: (editor: Editor) => JSX.Element;
  value: string | null | undefined;
  extensions: Extensions;
  onUpdate: (event: EditorEvents['update']) => void;
}

const EditorProvider = ({
  children,
  extensions,
  onUpdate,
  value,
}: EditorProviderProps) => {
  const editor = useEditor({
    content: value,
    extensions,
    onUpdate,
  });

  if (!editor) return null;
  return children(editor);
};

export default RichTextEditor;
