import { FC } from 'react';

import { useRouter } from '@tanstack/react-router';

import { Status } from 'src/organisms/Status';

export const BadRequest: FC = () => {
  const { history } = useRouter();

  const handleOnClick = () => {
    history.go(-1);
  };

  return (
    <Status color="#AB9067">
      <Status.Title title="Bad request" />
      <Status.Description
        text={`We encountered some confusion regarding your request.
         Please try again later, or if the issue persists, kindly report
         it using the feedback form located in the top bar.`}
      />
      <Status.Action onClick={handleOnClick} />
    </Status>
  );
};
