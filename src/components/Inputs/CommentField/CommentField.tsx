import React, { FC, useEffect, useState } from 'react';

import { Button, Icon, TextField } from '@equinor/eds-core-react';
import { delete_to_trash } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { useDebounce } from '../../../hooks';
import { date } from '../../../utils';

import styled from 'styled-components';

const { colors, spacings } = tokens;

const CommentContainer = styled.div`
  padding-left: ${spacings.comfortable.small};
  margin-bottom: ${spacings.comfortable.small};
  padding-top: 1em;
`;

const CommentContentContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CommentTextContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  padding-top: 3px;
  padding-bottom: 3px;
`;

const DeleteButton = styled(Button)`
  color: ${colors.text.static_icons__tertiary.hex};
  margin-top: 4px;
  width: ${spacings.comfortable.xxx_large};
  height: ${spacings.comfortable.xxx_large};
  &:hover {
    border-radius: 0px;
  }
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

export interface CommentFieldProps {
  id: string;
  value: string;
  createdDate?: string;
  onChange: (value: string) => void;
  onDelete: (id: string) => void;
}

const CommentField: FC<CommentFieldProps> = ({
  value,
  createdDate,
  onChange,
  onDelete,
  id,
}) => {
  const [body, setBody] = useState(value);
  const debouncedBody = useDebounce(body, 600);

  useEffect(() => {
    if (debouncedBody !== value) {
      onChange(debouncedBody);
    }
  }, [debouncedBody, value, onChange]);

  return (
    <CommentContainer>
      <CommentContentContainer>
        <CommentTextContainer>
          <CommentTextField
            id={`comment-${id}`}
            autoComplete="off"
            label={createdDate && `Posted ${date.formatDateTime(createdDate)}`}
            value={body ?? ''}
            placeholder="Write comment here"
            onInput={(
              event:
                | React.FormEvent<HTMLInputElement>
                | React.FormEvent<HTMLTextAreaElement>
            ) => {
              const target = event.target as HTMLInputElement;
              setBody(target.value);
            }}
          />
          <DeleteButton variant="ghost_icon" onClick={() => onDelete(id)}>
            <Icon name="delete" size={24} data={delete_to_trash} />
          </DeleteButton>
        </CommentTextContainer>
      </CommentContentContainer>
    </CommentContainer>
  );
};

export default CommentField;
