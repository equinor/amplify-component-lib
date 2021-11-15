/// <reference types="react" />
declare type Field = {
    guid: string;
    name: string;
    country: string;
};
export declare type FieldSelectorType = {
    currentField?: Field;
    availableFields: Array<Field>;
    onSelect: (selectedField: Field) => void;
};
declare const FieldSelector: import("react").ForwardRefExoticComponent<FieldSelectorType & import("react").RefAttributes<HTMLButtonElement>>;
export default FieldSelector;
