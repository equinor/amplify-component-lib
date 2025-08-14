import { FC } from 'react';

import { environment } from 'src/atoms/utils';
import { Status } from 'src/organisms/Status';

export const MissingAccessToApp: FC = () => {
  const appName = environment.getAppName(import.meta.env.VITE_NAME);

  const handleOnClick = () => {
    window.open(
      `https://accessit.equinor.com/Search/Search?term=${encodeURIComponent(appName)}`,
      '_blank'
    );
  };

  return (
    <Status>
      <Status.Title title={`You don't have access to ${appName}`} />
      <Status.Description text="You can apply for acces to the app in AccessIT" />
      <Status.Action onClick={handleOnClick} buttonText="Apply for access" />
    </Status>
  );
};
