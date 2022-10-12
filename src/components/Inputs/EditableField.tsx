import React, { ReactElement, ReactNode, useEffect, useState } from 'react';

import {
  Icon as EdsIcon,
  TextField as EdsTextField,
  Typography,
} from '@equinor/eds-core-react';
import { edit } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { spacings, colors } = tokens;

interface ContainerProps {
  editable: boolean;
}

const Container = styled.div<ContainerProps>`
  display: flex;

  &:hover {
    cursor: ${(props) => (props.editable ? 'pointer' : undefined)};
  }

  & > div {
    width: 85%;
  }
`;

const Icon = styled(EdsIcon)`
  margin-left: ${spacings.comfortable.small};
  height: 20px;
  color: ${colors.interactive.primary__resting.hsla};
`;

interface ITextFieldProps {
  editing: boolean;
}

const TextField = styled(EdsTextField)<ITextFieldProps>`
  & > div > input {
    ${(props) =>
      props.editing &&
      ` font-family: Equinor;
        font-size: 1rem;
        font-weight: 500;
        padding: 0;
        box-shadow: inset 0 -1px 0 0 ${colors.interactive.disabled__border.hsla};
      `}
  }

  & > div > input:focus {
    ${(props) =>
      props.editing &&
      ` outline: none;
        box-shadow: inset 0 -1px 0 0 ${colors.interactive.primary__resting.hsla};
      `}
  }
`;

export interface EditableFieldProps {
  editable: boolean;
  inputField?: ReactElement;
  value?: string;
  onChange?: (value: string) => void;
  children?: ReactNode;
}

const EditableField: React.FC<EditableFieldProps> = ({
  editable,
  value: initValue,
  inputField,
  onChange,
  children,
}) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  useEffect(() => {
    if (!editable) setEditing(false);
  }, [editable]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> &
      React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement> &
      React.FocusEvent<HTMLTextAreaElement>
  ) => {
    if (onChange) onChange(e.target.value);
    setEditing(false);
  };

  const handleFieldClick = () => {
    if (editable) {
      if (!editing) {
        setEditing(true);
      }
    }
  };

  return (
    <Container
      editable={editable}
      data-testid="editablefield"
      onClick={handleFieldClick}
    >
      {!editing && !children && <Typography variant="h6">{value}</Typography>}
      {!editing && children && children}
      {editing && (
        <>
          {inputField ? (
            inputField
          ) : (
            <TextField
              autoFocus
              editing={editing}
              id={`edit-${initValue}`}
              onBlur={handleBlur}
              onChange={handleChange}
              value={value}
            ></TextField>
          )}
        </>
      )}
      {editable && !editing && <Icon data-testid="editableicon" data={edit} />}
    </Container>
  );
};

export default EditableField;
