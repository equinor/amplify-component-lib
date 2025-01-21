import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Status } from 'src/organisms/Status';

export const GenericError: FC = () => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(-1);
  };

  return (
    <Status>
      <Status.Title />
      <Status.Description />
      <Status.Action onClick={handleOnClick} />
    </Status>
  );
};
