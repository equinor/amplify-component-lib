import { Dispatch, FC, SetStateAction } from 'react';

import { EnvironmentToggleFeatures } from '@equinor/subsurface-app-management';

import { getActiveFeatureDisplayName } from 'src/atoms/utils/environmentToggle';
import { ComboBox, SelectOptionRequired } from 'src/molecules';

interface EnvironmentToggleProps {
  environmentToggle: SelectOptionRequired[];
  setEnvironmentToggle: Dispatch<SetStateAction<SelectOptionRequired[]>>;
}

export const EnvironmentToggle: FC<EnvironmentToggleProps> = ({
  environmentToggle,
  setEnvironmentToggle,
}) => {
  const items = Object.values(EnvironmentToggleFeatures).map((item) => ({
    value: item.toString(),
    label: getActiveFeatureDisplayName(item),
  }));

  const handleOnSelect = (value: SelectOptionRequired[]) => {
    setEnvironmentToggle(value);
  };

  return (
    <ComboBox
      items={items}
      values={environmentToggle}
      onSelect={handleOnSelect}
      placeholder={'Set current environment for feature'}
      helperText={'This will use current environment for selected features.'}
    />
  );
};
