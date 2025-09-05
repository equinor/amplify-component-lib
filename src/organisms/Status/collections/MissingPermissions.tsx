import { FC } from 'react';

import { useRouter } from '@tanstack/react-router';

import { Status } from 'src/organisms/Status';

export const MissingPermissions: FC = () => {
  const { history } = useRouter();

  const handleOnClick = () => {
    history.go(-1);
  };

  return (
    <Status>
      <Status.Title title="It looks like you don't have permission to access this page." />
      <Status.Action onClick={handleOnClick} />
    </Status>
  );
};
