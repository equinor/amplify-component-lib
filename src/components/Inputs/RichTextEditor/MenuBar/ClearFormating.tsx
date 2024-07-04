import { FC } from 'react';

import { format_clear } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { EditorPanel, RichTextEditorFeatures } from '../RichTextEditor.types';
import MenuButton from './MenuButton';

import styled from 'styled-components';

const { colors } = tokens;

const Divider = styled.hr`
  width: 1px;
  background: ${colors.ui.background__medium.rgba};
`;

export const TextClearFormating: FC<EditorPanel> = ({ editor, features }) => {
  const clearFormatting = () =>
    editor.chain().focus().clearNodes().unsetAllMarks().run();
  if (features && !features.includes(RichTextEditorFeatures.CLEAR_FORMATTING))
    return;
  return (
    <>
      <Divider />
      <MenuButton
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
