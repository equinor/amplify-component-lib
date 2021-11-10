import React from 'react';
export interface NewCommentFieldProps {
    placeholder?: string;
    label?: string;
    onPublish: (value: string) => void;
    defaultValue?: string;
}
declare const NewCommentField: React.FC<NewCommentFieldProps>;
export default NewCommentField;
