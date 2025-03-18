import { FC } from 'react';
import { useNavigate } from 'react-router';

import { Status } from 'src/organisms/Status';

export const PageNotFound: FC = () => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(-1);
  };

  return (
    <Status center={false}>
      <Status.Title title="Page not found" />
      <Status.Description
        text={`It looks like the page you're looking for has gone missing.
        Please check the URL and try again.`}
      />
      <Status.Action onClick={handleOnClick} />
    </Status>
  );
};
