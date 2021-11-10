import { FC } from 'react';
import { TextFieldProps } from '@equinor/eds-core-react';
export declare type EditableTextEntryProps = {
    body: string;
    onDelete: () => void;
    onSave: (value: string) => void;
} & TextFieldProps;
declare const EditableTextEntry: FC<EditableTextEntryProps>;
export default EditableTextEntry;
