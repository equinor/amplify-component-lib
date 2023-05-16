import { FC } from 'react';

import { environment } from '../../utils/auth_environment';
import { ErrorType, getErrorContent } from '../../utils/errors';
import ErrorPage from './ErrorPage';

const { getAppName } = environment;

const Unauthorized: FC = () => {
  const error = getErrorContent(
    getAppName(import.meta.env.VITE_NAME),
    ErrorType.ERROR_401
  );

  return (
    <ErrorPage illustration={error.illustration}>
      <ErrorPage.Title title={error.title} />
      <ErrorPage.Description text={error.description} />
      <ErrorPage.Action
        buttonText={error.button?.text}
        onClick={error.button?.onClick}
      />
    </ErrorPage>
  );
};

export default Unauthorized;
