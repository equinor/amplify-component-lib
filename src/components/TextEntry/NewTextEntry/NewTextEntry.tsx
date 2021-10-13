import { ChangeEvent, FC, useState } from 'react';
import {
  Button,
  Icon,
  TextField,
  TextFieldProps,
} from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { add } from '@equinor/eds-icons';

const { colors, spacings } = tokens;

const CommentingButtonContainer = styled.div`
  margin-top: ${spacings.comfortable.small};
  display: flex;
  justify-content: flex-end;
`;

const CancelButton = styled(Button)`
  color: ${colors.text.static_icons__tertiary.rgba};
`;

const NewButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

const StyledIcon = styled(Icon)`
  margin-right: 8px !important;
`;

export type NewTextEntryProps = {
  title: string;
  onSave: (value: string) => void;
} & TextFieldProps;

const NewTextEntry: FC<NewTextEntryProps> = ({ onSave, title, ...rest }) => {
  const [value, setValue] = useState('');
  const [newEntry, setNewEntry] = useState(false);

  if (newEntry) {
    return (
      <>
        <TextField
          {...rest}
          value={value}
          autoFocus
          style={{ resize: 'none' }}
          onChange={(
            e: ChangeEvent<HTMLInputElement> & ChangeEvent<HTMLTextAreaElement>
          ) => setValue(e.target.value)}
          helperText={
            value.length > 900 ? `${value.length}/${1000}` : undefined
          }
        />
        <CommentingButtonContainer>
          <CancelButton
            variant="ghost"
            onClick={() => {
              setNewEntry(false);
              setValue('');
            }}
          >
            Cancel
          </CancelButton>
          <Button
            variant="ghost"
            onClick={() => {
              setNewEntry(false);
              onSave(value);
              setValue('');
            }}
          >
            Finish
          </Button>
        </CommentingButtonContainer>
      </>
    );
  }

  return (
    <NewButtonWrapper>
      <Button variant="ghost" onClick={() => setNewEntry(true)}>
        <>
          <StyledIcon data={add} />
          New {title}
        </>
      </Button>
    </NewButtonWrapper>
  );
};

export default NewTextEntry;
