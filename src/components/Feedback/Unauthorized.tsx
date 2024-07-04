import { FC } from 'react';

import ErrorPage from './ErrorPage';
import { ErrorType } from 'src/types/Errors';
import { environment } from 'src/utils';
import { getErrorContent } from 'src/utils/errors';

import styled from 'styled-components';

const { getAppName } = environment;

const FullPageWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

export const Unauthorized: FC = () => {
  const error = getErrorContent(
    getAppName(import.meta.env.VITE_NAME),
    ErrorType.ERROR_401
  );

  return (
    <FullPageWrapper>
      <ErrorPage illustration={error.illustration}>
        <ErrorPage.Title title={error.title} />
        <ErrorPage.Description text={error.description} />
        <ErrorPage.Action
          buttonText={error.button?.text}
          onClick={error.button?.onClick}
        />
      </ErrorPage>
    </FullPageWrapper>
  );
};
