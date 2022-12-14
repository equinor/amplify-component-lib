import { FC, useRef, useState } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { platform } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { Field } from '../../../types/Field';
import SelectorCard from './SelectorCard/SelectorCard';
import SelectorSkeleton from './SelectorCard/Skeleton';
import ChangingField from './ChangingField';

import styled from 'styled-components';

const { spacings, colors } = tokens;

const ImageWrapper = styled.img`
  height: calc(100% + 64px); // topbar 64px
  width: calc(100% + 72px); //sidebar 72px
  object-fit: cover;
  position: absolute;
  top: -64px;
  left: -72px;
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

const Label = styled.div`
  display: flex;
  gap: ${spacings.comfortable.medium};
  align-items: center; ;
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
        <Label>
          <Icon
            data={platform}
            size={24}
            color={colors.interactive.primary__resting.hsla}
          />
          <Typography variant="h4">Please select a field</Typography>
        </Label>
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
