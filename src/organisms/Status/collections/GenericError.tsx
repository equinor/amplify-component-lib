import { FC } from 'react';

import { useStatusNavigation } from 'src/atoms/hooks';
import { Status } from 'src/organisms/Status';

export const GenericError: FC = () => {
  const handleOnClick = useStatusNavigation();

  return (
    <Status>
      <Status.Title />
      <Status.Description />
      <Status.Action onClick={handleOnClick} />
    </Status>
  );
};
