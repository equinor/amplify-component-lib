import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Status } from 'src/organisms/Status';

export const ServerError: FC = () => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(-1);
  };

  return (
    <Status color="#C47E84">
      <Status.Title title="Something is wrong on our servers" />
      <Status.Description
        text={`Our server encountered an unexpected issue. Please try
        again shortly, or reach out via the feedback form if the problem
        continues.`}
      />
      <Status.Action onClick={handleOnClick} />
    </Status>
  );
};
