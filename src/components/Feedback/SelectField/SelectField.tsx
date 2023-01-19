import { FC, useRef, useState } from 'react';

import { tokens } from '@equinor/eds-tokens';

import { Field } from '../../../types/Field';
import SelectorCard from './SelectorCard/SelectorCard';
import SelectorSkeleton from './SelectorCard/Skeleton';
import ChangingField from './ChangingField';

import styled from 'styled-components';

const { spacings } = tokens;

const ImageWrapper = styled.img`
  width: calc(100vw + 10px); //sidebar 72px
  object-fit: contain;
  position: absolute;
  bottom: 0;
  left: 0;
`;
const Container = styled.div`
  position: absolute;
  top: 35vh;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.medium_small};
`;

export type SelectFieldProps = {
  photo?: string;
  setField: (value: Field) => void;
  fields: Field[];
  isLoading?: boolean;
  onChangedField: () => void;
  showAccessITLink?: boolean;
  finishedText: string; // Example: 'Taking you to the dashboard'
};

const SelectField: FC<SelectFieldProps> = ({
  photo,
  setField,
  fields,
  isLoading,
  onChangedField,
  finishedText,
  showAccessITLink = true,
}) => {
  const [isChangingField, setIsChangingField] = useState(false);
  const fieldName = useRef<string>('');

  const handleClick = (field: Field) => {
    // Only field_identifier and field_guid are necessary for it to work
    // Some fields coming from the backend have country: null
    if (field.name && field.uuid) {
      setField({
        uuid: field.uuid,
        name: field.name,
        country: field.country ?? '',
      });
      fieldName.current = field.name ?? 'FieldName';
      setIsChangingField(true);
    }
  };

  if (isChangingField) {
    return (
      <ChangingField
        fieldName={fieldName.current}
        onChangedField={onChangedField}
        finishedText={finishedText}
      />
    );
  }

  return (
    <>
      {photo && <ImageWrapper src={photo} />}
      <Container>
        {!isLoading ? (
          <SelectorCard
            availableFields={fields}
            onSelect={handleClick}
            showAccessITLink={showAccessITLink}
          />
        ) : (
          <SelectorSkeleton />
        )}
      </Container>
    </>
  );
};

export default SelectField;
