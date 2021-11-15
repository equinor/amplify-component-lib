import { FC } from 'react';
import { TextFieldProps } from '@equinor/eds-core-react';
export declare type NewTextEntryProps = {
    title: string;
    onSave: (value: string) => void;
} & TextFieldProps;
declare const NewTextEntry: FC<NewTextEntryProps>;
export default NewTextEntry;
