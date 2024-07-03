import { FC, useMemo } from 'react';

import { AmplifyKit } from './custom-extensions/DefaultKit';
import { useEditor, EditorContent, Extensions, Editor } from '@tiptap/react';

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

interface FeaturesProps {
  features?: RichTextEditorFeatures[];
  extendFeatures?: RichTextEditorFeatures[];
  removeFeatures?: RichTextEditorFeatures[];
  onImageUpload?: OnImageUploadFn;
}

const useFeatures = ({
  features,
  extendFeatures,
  removeFeatures,
  onImageUpload,
}: FeaturesProps) => {
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

interface AmplifyKitProps {
  features?: RichTextEditorFeatures[];
  placeholder?: string;
  onImageUpload?: OnImageUploadFn;
}

const useAmplifyKit = ({
  features,
  placeholder,
  onImageUpload,
}: AmplifyKitProps) => {
  return useMemo(
    () =>
      AmplifyKit.configure({
        placeholder: { placeholder },
        image: features?.includes(RichTextEditorFeatures.IMAGES)
          ? { onImageUpload }
          : false,
      }),
    [onImageUpload, placeholder]
  );
};

const RichTextEditor: FC<RichTextEditorProps> = ({
  value = string,
  onChange,
  onImageUpload,
  placeholder,
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

  const extensions = useAmplifyKit({
    placeholder,
    onImageUpload,
    features: usingFeatures,
  });

  return (
    <Wrapper
      $padding={padding}
      $maxHeight={maxHeight}
      $lightBackground={lightBackground}
      $border={border}
    >
      <EditorProvider
        value={value}
        extensions={[extensions]}
        onUpdate={onChange}
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
  onUpdate: (html: string) => void;
}

const EditorProvider: FC<EditorProviderProps> = ({
  children,
  extensions,
  onUpdate,
  value,
}) => {
  const editor = useEditor({
    content: value,
    extensions,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML());
    },
  });

  if (!editor) return null;
  return children(editor);
};

export default RichTextEditor;
