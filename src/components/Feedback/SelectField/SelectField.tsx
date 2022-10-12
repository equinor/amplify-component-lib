import React, { FC, useRef, useState } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import FieldCard from './FieldCard/FieldCard';
import AccessITCard from './AccessITCard';

import styled from 'styled-components';
import ChangingField from './ChangingField';
import FieldCardSkeleton from './FieldCard/Skeleton';

const { spacings } = tokens;

const Container = styled.div`
  position: absolute;
  top: 35vh;
  left: 50%;
  transform: translateX(-50%);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: ${spacings.comfortable.medium_small};
  > h3 {
    grid-column: 1 / 3;
  }
`;

export type Field = {
  uuid: string | null | undefined;
  name: string | null | undefined;
  country: string | null | undefined;
};

interface SelectFieldProps {
  setField: (value: Field) => void;
  fields: Field[];
  isLoading?: boolean;
  onChangedField: () => void;
  finishedText: string; // Example: 'Taking you to the dashboard'
}

const SelectField: FC<SelectFieldProps> = ({
  setField,
  fields,
  isLoading,
  onChangedField,
  finishedText,
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

  if (isLoading) {
    return (
      <Container>
        <Typography variant="h3">Please select a field</Typography>
        {new Array(4).fill(0).map((item, index) => (
          <FieldCardSkeleton key={`field-card-skeleton-${item + index}`} />
        ))}
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h3">Please select a field</Typography>
      {fields.map((field: Field) => (
        <FieldCard
          key={field.uuid}
          fieldName={field.name ?? ''}
          onClick={() => handleClick(field)}
        />
      ))}
      {!isLoading && <AccessITCard />}
    </Container>
  );
};

export default SelectField;
