import type { FC } from 'react';
import { useState } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { info_circle, send } from '@equinor/eds-icons';

import { colors, spacings } from 'src/atoms/style';
import {
  IconButton,
  RichTextEditor,
  RichTextEditorFeatures,
} from 'src/molecules';

import styled from 'styled-components';

interface AddCommentProps {
  addComment: (comment: string) => void;
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

export const AddComment: FC<AddCommentProps> = ({ addComment }) => {
  const [comment, setComment] = useState('');
  return (
    <Wrapper>
      <RichTextEditor
        value={comment}
        onChange={setComment}
        lightBackground
        maxHeight="180px"
        minHeight="180px"
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
      />
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
        {/*        <div
          style={{
            marginLeft: 'auto',
          }}
        >
          <IconButton
            variant="ghost"
            icon={send}
            onClick={() => {
              addComment(comment);
              setComment('');
            }}
          />
        </div>*/}
      </InfoWrapper>
    </Wrapper>
  );
};
