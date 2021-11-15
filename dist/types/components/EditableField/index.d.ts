import React, { ReactElement } from 'react';
export interface EditableFieldProps {
    editable: boolean;
    inputField?: ReactElement;
    value?: string;
    onChange?: (value: string) => void;
}
declare const EditableField: React.FC<EditableFieldProps>;
export default EditableField;
