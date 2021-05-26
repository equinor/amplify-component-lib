import {
  ChangeEvent,
  FC,
  FocusEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button, TextField, TextFieldProps } from "@equinor/eds-core-react";
import { tokens } from "@equinor/eds-tokens";
import styled from "styled-components";
import TextEntry from "../TextEntry";

const { colors, spacings } = tokens;

const CommentingButtonContainer = styled.div`
  margin-top: ${spacings.comfortable.small};
  display: flex;
  justify-content: space-between;
`;

const CancelButton = styled(Button)`
  color: ${colors.text.static_icons__tertiary.rgba};
`;

export type EditableTextEntryProps = {
  body: string;
  onDelete: () => void;
  onSave: (value: string) => void;
} & TextFieldProps;

const EditableTextEntry: FC<EditableTextEntryProps> = ({
  body,
  onDelete,
  onSave,
  ...rest
}) => {
  const [value, setValue] = useState(body);
  const [editing, setEditing] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setEditing(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  if (editing) {
    return (
      <div ref={wrapperRef}>
        <TextField
          {...rest}
          autoFocus
          onFocus={(e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            e.currentTarget.setSelectionRange(
              e.currentTarget.value.length,
              e.currentTarget.value.length
            )
          }
          style={{ resize: "none" }}
          value={value}
          helperText={
            value.length > 900 ? `${value.length}/${1000}` : undefined
          }
          onChange={(
            e: ChangeEvent<HTMLInputElement> & ChangeEvent<HTMLTextAreaElement>
          ) => setValue(e.target.value)}
        />
        <CommentingButtonContainer>
          <Button
            variant="outlined"
            color="danger"
            onClick={() => {
              setEditing(false);
              onDelete();
            }}
          >
            Delete
          </Button>
          <div>
            <CancelButton
              variant="ghost"
              onClick={() => {
                setEditing(false);
                setValue(body);
              }}
            >
              Cancel
            </CancelButton>
            <Button
              variant="ghost"
              onClick={() => {
                setEditing(false);
                onSave(value);
              }}
            >
              Finish
            </Button>
          </div>
        </CommentingButtonContainer>
      </div>
    );
  }

  return <TextEntry body={body} onClick={() => setEditing(true)} />;
};

export default EditableTextEntry;
