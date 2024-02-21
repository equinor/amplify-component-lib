import { FC } from 'react';

import ErrorPage from './ErrorPage';
import { ErrorType } from 'src/types/Errors';
import { environment } from 'src/utils';
import { getErrorContent } from 'src/utils/errors';

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
