import { FC } from 'react';
import { useNavigate } from 'react-router';

import { ErrorType } from 'src/atoms';
import { environment, errors } from 'src/atoms/utils';
import { ErrorPage } from 'src/deprecated/ErrorPage/index';

const { getErrorContent } = errors;
const { getAppName } = environment;

/**
 * @deprecated - Use "PageNotFound" instead
 */
export const OldPageNotFound: FC = () => {
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
