import type { FC } from 'react';
import { useState } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { info_circle, send } from '@equinor/eds-icons';
import Mention from '@tiptap/extension-mention';

import { colors, spacings } from 'src/atoms/style';
import {
  IconButton,
  RichTextEditor,
  RichTextEditorFeatures,
} from 'src/molecules';
import { getSuggestions } from 'src/organisms/Comments/mentions/suggestions';
import { extractMentions } from 'src/organisms/Comments/mentions/utils';
import { isRichTextEmpty } from 'src/organisms/Comments/utils';

import styled from 'styled-components';

interface AddCommentProps {
  onAddComment?: ({
    text,
    mentions,
  }: {
    text: string;
    mentions: string[];
  }) => void;
  users?: string[];
  zIndex?: number;
}

const Wrapper = styled.div`
  background: ${colors.ui.background__light.rgba};
  padding: ${spacings.large};
  margin-top: auto;
`;

const InfoWrapper = styled.div`
  display: flex;
  gap: ${spacings.x_small};
  padding: ${spacings.x_small} ${spacings.small};
`;

const FlexWrapper = styled.div`
  display: flex;
`;

const RightAlignedIconButton = styled(IconButton)`
  margin-left: auto;
`;

export const AddComment: FC<AddCommentProps> = ({
  onAddComment,
  users,
  zIndex,
}) => {
  const [text, setText] = useState('');
  return (
    <Wrapper>
      <RichTextEditor
        value={text}
        onChange={setText}
        lightBackground
        maxHeight="50vh"
        minHeight="130px"
        footer={
          <FlexWrapper>
            <RightAlignedIconButton
              data-testid="send-comment-button"
              variant="ghost"
              icon={send}
              disabled={isRichTextEmpty(text)}
              onClick={() => {
                onAddComment?.({
                  text: text,
                  mentions: extractMentions(text),
                });
                setText('');
              }}
            />
          </FlexWrapper>
        }
        removeFeatures={[
          RichTextEditorFeatures.ALIGNMENT,
          RichTextEditorFeatures.IMAGES,
          RichTextEditorFeatures.TABLE,
          RichTextEditorFeatures.LINKS,
          RichTextEditorFeatures.UNDO_REDO,
          RichTextEditorFeatures.HEADERS,
          RichTextEditorFeatures.TEXT_COLOR,
          RichTextEditorFeatures.CODE,
        ]}
        extensions={[
          Mention.configure({
            HTMLAttributes: {
              class: 'mention',
            },
            suggestions: getSuggestions(users || [], zIndex),
          }),
        ]}
      />
      {!!users?.length && (
        <InfoWrapper>
          <Icon
            color={colors.text.static_icons__tertiary.rgba}
            data={info_circle}
            size={16}
          />
          <Typography
            group="input"
            variant="label"
            color={colors.text.static_icons__tertiary.rgba}
          >
            Type @ to mention team members.
          </Typography>
        </InfoWrapper>
      )}
    </Wrapper>
  );
};
