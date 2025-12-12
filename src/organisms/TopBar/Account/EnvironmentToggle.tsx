import { Dispatch, FC, SetStateAction, useState } from 'react';

import { EnvironmentToggleFeatures } from '@equinor/subsurface-app-management';
import { useQueryClient } from '@tanstack/react-query';

import { formatFeatureName } from 'src/atoms/utils/environmentToggle';
import { ComboBox, SelectOptionRequired } from 'src/molecules';

interface EnvironmentToggleProps {
  environmentToggle: SelectOptionRequired[];
  setEnvironmentToggle: Dispatch<SetStateAction<SelectOptionRequired[]>>;
}

export const EnvironmentToggle: FC<EnvironmentToggleProps> = ({
  environmentToggle,
  setEnvironmentToggle,
}) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const items = Object.values(EnvironmentToggleFeatures).map((item) => ({
    value: item.toString(),
    label: formatFeatureName(item),
  }));

  const handleOnSelect = (value: SelectOptionRequired[]) => {
    setEnvironmentToggle(value);
    setIsLoading(true);
    setTimeout(() => {
      queryClient.invalidateQueries();
      setIsLoading(false);
    }, 2000);
  };

  return (
    <ComboBox
      loading={isLoading}
      items={items}
      values={environmentToggle}
      onSelect={handleOnSelect}
      placeholder={'Set current environment for feature'}
      helperText={'This will use current environment for selected features.'}
    />
  );
};
