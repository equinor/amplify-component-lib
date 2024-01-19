import { FC, useMemo, useState } from 'react';

import Bold from '@tiptap/extension-bold';
import { BulletList } from '@tiptap/extension-bullet-list';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { Color } from '@tiptap/extension-color';
import Document from '@tiptap/extension-document';
import DropCursor from '@tiptap/extension-dropcursor';
import GapCursor from '@tiptap/extension-gapcursor';
import { HardBreak } from '@tiptap/extension-hard-break';
import Heading from '@tiptap/extension-heading';
import History from '@tiptap/extension-history';
import Image from '@tiptap/extension-image';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import { ListItem } from '@tiptap/extension-list-item';
import { OrderedList } from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Text from '@tiptap/extension-text';
import { TextAlign } from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import { EditorEvents, EditorProvider } from '@tiptap/react';

import MenuBar from './MenuBar/MenuBar';
import { Wrapper } from './RichTextEditor.styles';
import {
  DEFAULT_FEATURES,
  RichTextEditorFeatures,
} from './RichTextEditor.types';

import { common, createLowlight } from 'lowlight';

const lowlight = createLowlight(common);

export interface RichTextEditorProps {
  value: string | null | undefined;
  onChange: (value: string) => void;
  onImageUpload?: (file: File) => Promise<string>;
  placeholder?: string;
  features?: RichTextEditorFeatures[];
  extendFeatures?: RichTextEditorFeatures[];
  removeFeatures?: RichTextEditorFeatures[];
}

const RichTextEditor: FC<RichTextEditorProps> = ({
  value,
  onChange,
  onImageUpload,
  placeholder = 'Add text and content here...',
  features,
  extendFeatures,
  removeFeatures,
}) => {
  const [tablesWithBorders, setTablesWithBorders] = useState(true);

  /* c8 ignore nextline */
  const toggleTableBorders = () => setTablesWithBorders((prev) => !prev);

  if (features && (extendFeatures || removeFeatures)) {
    throw new Error(
      `Can't specify both 'features' and 'extend/remove' features!
       Extend/remove can only be used when not specifying 'features'`
    );
  }

  const usingFeatures = useMemo(() => {
    if (features) return features;

    return [...DEFAULT_FEATURES, ...(extendFeatures || [])]
      .filter((feature) => !removeFeatures || !removeFeatures.includes(feature))
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

  const extensions = useMemo(
    () => [
      BulletList,
      Bold,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Color,
      Document,
      DropCursor,
      GapCursor,
      HardBreak,
      Heading,
      History,
      Image,
      Italic,
      Link,
      ListItem,
      OrderedList,
      Paragraph,
      Placeholder.configure({
        placeholder,
      }),
      Table.configure({
        resizable: true,
      }),
      TableCell,
      TableHeader,
      TableRow,
      Text,
      Typography,
      TextStyle,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'img'],
      }),
    ],
    [placeholder]
  );

  const handleOnUpdate = (props: EditorEvents['update']) => {
    onChange?.(props.editor.getHTML());
  };

  return (
    <Wrapper $tablesWithBorders={tablesWithBorders}>
      <EditorProvider
        slotBefore={
          <MenuBar
            features={usingFeatures}
            toggleTableBorders={toggleTableBorders}
            onImageUpload={onImageUpload}
          />
        }
        content={value}
        extensions={extensions}
        onUpdate={handleOnUpdate}
      >
        {null}
      </EditorProvider>
    </Wrapper>
  );
};

export default RichTextEditor;
