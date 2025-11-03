import { FC } from 'react';

import { useStatusNavigation } from 'src/atoms/hooks';
import { Status } from 'src/organisms/Status';

export const ServerError: FC = () => {
  const handleOnClick = useStatusNavigation();

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
