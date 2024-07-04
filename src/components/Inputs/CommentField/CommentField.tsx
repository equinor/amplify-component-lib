import React, { FC, FormEvent, useEffect, useState } from 'react';

import { Button, Icon, TextField } from '@equinor/eds-core-react';
import { delete_to_trash } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import date from '../../../utils/date';
import { useDebounce } from 'src/hooks';
import { spacings } from 'src/style';

import styled from 'styled-components';

const { colors } = tokens;

const CommentContainer = styled.div`
  padding-left: ${spacings.small};
  margin-bottom: ${spacings.small};
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
  color: ${colors.text.static_icons__tertiary.rgba};
  margin-top: 4px;
  width: ${spacings.xxx_large};
  height: ${spacings.xxx_large};
  &:hover {
    border-radius: 0;
  }
`;

const CommentTextField = styled(TextField)`
  background: none;

  div:focus-within {
    outline: none;
  }

  input {
    background: none;
    outline: none;
    box-shadow: none;
    color: ${colors.text.static_icons__default.rgba};
    &:focus {
      outline: none;
      box-shadow: inset 0 -2px 0 0 ${colors.interactive.primary__resting.rgba};
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

/**
 * @deprecated Being deprecated from amplify-components-library, move into app if you want the implementation
 */

const CommentField: FC<CommentFieldProps> = ({
  value,
  createdDate,
  onChange,
  onDelete,
  id,
}) => {
  const [body, setBody] = useState(value);
  const debouncedBody = useDebounce(body, 600);

  const handleOnInput = (event: FormEvent<HTMLInputElement>) => {
    const eventValue = (event.target as HTMLInputElement).value;
    setBody(eventValue);
  };

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
            label={`Posted ${date.formatDateTime(createdDate)}`}
            value={body}
            placeholder="Write comment here"
            onInput={handleOnInput}
          />
          <DeleteButton variant="ghost_icon" onClick={() => onDelete(id)}>
            <Icon
              name="delete"
              size={24}
              color={colors.interactive.primary__resting.rgba}
              data={delete_to_trash}
            />
          </DeleteButton>
        </CommentTextContainer>
      </CommentContentContainer>
    </CommentContainer>
  );
};

export default CommentField;
