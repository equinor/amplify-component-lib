import { Button, Icon, TextField } from '@equinor/eds-core-react';
import { clear } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import React, { useState } from 'react';
import styled from 'styled-components';

const { colors, spacings } = tokens;

const NewCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${spacings.comfortable.large};
  margin-bottom: ${spacings.comfortable.x_large};
  gap: ${spacings.comfortable.large};
`;

const CommentTextField = styled(TextField)`
  background: none;

  div {
    outline: none;
  }

  input {
    background: none;
    outline: none;
    box-shadow: none;

    &:focus {
      outline: none;
      box-shadow: inset 0 -2px 0 0 ${colors.interactive.primary__resting.hex};
    }
  }
`;

const PostButton = styled(Button)`
  width: fit-content;
  margin-left: auto !important;
`;

const ClearButton = styled.div`
  position: absolute;
  right: 1%;
  top: calc(34px / 2);
  color: ${colors.text.static_icons__default.hex};
  height: 32px;
  width: 32px;
  padding: 5px;
  display: flex;
  place-items: center;
  border-radius: 50%;

  &:hover {
    cursor: pointer;
    color: ${colors.interactive.primary__resting.hex};
    background: ${colors.interactive.primary__hover_alt.hex};
  }
`;

export interface NewCommentFieldProps {
  placeholder?: string;
  label?: string;
  onPublish: (value: string) => void;
  defaultValue?: string;
}

const NewCommentField: React.FC<NewCommentFieldProps> = ({
  placeholder,
  label,
  onPublish,
  defaultValue,
}) => {
  const [newComment, setNewComment] = useState(defaultValue ?? '');

  return (
    <NewCommentContainer>
      <CommentTextField
        id="newComment"
        placeholder={placeholder}
        autoComplete="off"
        label={label}
        value={newComment}
        autoFocus
        onInput={(
          event:
            | React.FormEvent<HTMLTextAreaElement>
            | React.FormEvent<HTMLInputElement>
        ) => {
          setNewComment((event.target as HTMLInputElement).value);
        }}
        onKeyDown={(event: React.KeyboardEvent) => {
          if (event.nativeEvent.key === 'Enter') {
            if (newComment !== '') {
              onPublish(newComment);
            }
          }
        }}
      />
      {newComment.length > 0 && (
        <ClearButton
          data-testid="clearbutton"
          onClick={() => setNewComment('')}
        >
          <Icon data={clear} size={32} />
        </ClearButton>
      )}
      <PostButton
        onClick={() => onPublish(newComment)}
        disabled={newComment.length === 0}
      >
        Post Comment
      </PostButton>
    </NewCommentContainer>
  );
};

export default NewCommentField;
