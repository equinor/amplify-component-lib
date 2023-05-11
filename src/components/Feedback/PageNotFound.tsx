import { FC } from 'react';
import { useNavigate } from 'react-router';

import { environment } from '../../utils/auth_environment';
import { ErrorType, getErrorContent } from '../../utils/errors';
import ErrorPage from './ErrorPage';

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
