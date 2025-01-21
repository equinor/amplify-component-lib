import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Status } from 'src/organisms/Status';

export const MissingPermissions: FC = () => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(-1);
  };

  return (
    <Status>
      <Status.Title title="It looks like you don't have permission to access this page." />
      <Status.Action onClick={handleOnClick} />
    </Status>
  );
};
