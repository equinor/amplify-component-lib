import { FC } from 'react';
import { useNavigate } from 'react-router';

import ErrorPage from './ErrorPage';
import { environment } from 'src/utils';
import { ErrorType, getErrorContent } from 'src/utils/errors';

const { getAppName } = environment;

const PageNotFound: FC = () => {
  const error = getErrorContent(
    getAppName(import.meta.env.VITE_NAME),
    ErrorType.ERROR_404
  );

  const navigate = useNavigate();

  return (
    <ErrorPage illustration={error.illustration}>
      <ErrorPage.Title title={error.title} />
      <ErrorPage.Description text={error.description} />
      <ErrorPage.Action onClick={() => navigate(-1)} />
    </ErrorPage>
  );
};

export default PageNotFound;
