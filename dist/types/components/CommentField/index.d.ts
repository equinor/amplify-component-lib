import { FC } from 'react';
export interface CommentFieldProps {
    id: string;
    value: string;
    createdDate?: string;
    onChange: (value: string) => void;
    onDelete: (id: string) => void;
}
declare const CommentField: FC<CommentFieldProps>;
export default CommentField;
