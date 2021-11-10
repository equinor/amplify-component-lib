import React from 'react';
interface CreateItemProps {
    createLabel: string;
    onCreate: () => void;
    isOpen: boolean;
}
declare const CreateItem: React.FC<CreateItemProps>;
export default CreateItem;
