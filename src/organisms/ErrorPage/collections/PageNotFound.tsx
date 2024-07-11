import { FC } from 'react';
import { useNavigate } from 'react-router';

import { ErrorPage } from '..';
import { ErrorType } from 'src/atoms/types/Errors';
import { environment, errors } from 'src/atoms/utils';

const { getErrorContent } = errors;
const { getAppName } = environment;

export const PageNotFound: FC = () => {
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
