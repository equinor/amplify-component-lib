import { FC } from 'react';

import { useStatusNavigation } from 'src/atoms/hooks';
import { Status } from 'src/organisms/Status';

export const MissingPermissions: FC = () => {
  const handleOnClick = useStatusNavigation();

  return (
    <Status>
      <Status.Title title="It looks like you don't have permission to access this page." />
      <Status.Action onClick={handleOnClick} />
    </Status>
  );
};
