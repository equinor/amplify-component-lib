import { FC } from 'react';

import { format_clear } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { EditorPanel, RichTextEditorFeatures } from '../RichTextEditor.types';
import { EditorMenu } from './MenuBar';

import styled from 'styled-components';

const { colors } = tokens;

const Divider = styled.hr`
  width: 1px;
  background: ${colors.ui.background__medium.rgba};
`;

export const TextClearFormating: FC<EditorPanel> = ({ editor, features }) => {
  /* c8 ignore start */ // Testing tese lines would just be testing the tiptap library or testing that JavasCript works. Theres not enough custom logic here to warrant the maintance cost
  const clearFormatting = () =>
    editor.chain().focus().clearNodes().unsetAllMarks().run();
  if (features && !features.includes(RichTextEditorFeatures.CLEAR_FORMATTING))
    return;
  /* c8 ignore end */
  return (
    <>
      <Divider />
      <EditorMenu.Button
        icon={format_clear}
        onClick={clearFormatting}
        customColors={{
          resting: colors.interactive.warning__resting.rgba,
          hover: colors.interactive.warning__hover.rgba,
          backgroundHover: colors.ui.background__warning.rgba,
        }}
      />
    </>
  );
};
