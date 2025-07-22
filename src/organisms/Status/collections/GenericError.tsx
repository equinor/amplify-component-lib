import { FC } from 'react';

import { useRouter } from '@tanstack/react-router';

import { Status } from 'src/organisms/Status';

export const GenericError: FC = () => {
  const { history } = useRouter();

  const handleOnClick = () => {
    history.go(-1);
  };

  return (
    <Status>
      <Status.Title />
      <Status.Description />
      <Status.Action onClick={handleOnClick} />
    </Status>
  );
};
