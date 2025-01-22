import { FC } from 'react';

import {
  BadRequest,
  GenericError,
  MissingAccessToApp,
  MissingPermissions,
  PageNotFound,
  ServerError,
} from './';

interface ServerErrorProps {
  statusCode?: number;
}

/**
 * Will determine what kind of error message to show, for non-error status code will return nothing
 * @param statusCode - optional, will return generic error by default
 * @returns error component corresponding to http status code
 */
const ApiResponseError: FC<ServerErrorProps> = ({ statusCode }) => {
  if (statusCode! < 400) {
    return null;
  }
  if (statusCode === 400) {
    return <BadRequest />;
  }

  if (statusCode === 401) {
    return <MissingAccessToApp />;
  }

  if (statusCode === 403) {
    return <MissingPermissions />;
  }

  if (statusCode === 404) {
    return <PageNotFound />;
  }

  if (statusCode === 500) {
    return <ServerError />;
  }

  return <GenericError />;
};

export { ApiResponseError };
