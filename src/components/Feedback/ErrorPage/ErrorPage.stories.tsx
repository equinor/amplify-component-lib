import { Meta, Story } from '@storybook/react';

import { ErrorType, getErrorContent } from '../../../utils/errors';
import Template from '../../Template/Template';
import { ErrorContentProps } from './ErrorPage';
import ErrorPage from '.';

export default {
  title: 'Feedback/ErrorPage',
  component: ErrorPage,
} as Meta;

export const Primary: Story<ErrorContentProps> = (args) => {
  const defaultError = getErrorContent('Amplify portal', ErrorType.DEFAULT);
  return (
    <Template>
      <ErrorPage {...args}>
        <ErrorPage.Title title={defaultError.title} />
        <ErrorPage.Description text={defaultError.description} />
        <ErrorPage.Action
          buttonText={defaultError.button?.text}
          onClick={() => console.log('Clicked!')}
        />
      </ErrorPage>
    </Template>
  );
};

export const Error400: Story<ErrorContentProps> = () => {
  const error400 = getErrorContent('Amplify portal', ErrorType.ERROR_400);
  return (
    <Template>
      <ErrorPage illustration={error400.illustration}>
        <ErrorPage.Title title={error400.title} />
        <ErrorPage.Description text={error400.description} />
        <ErrorPage.Action
          buttonText={error400.button?.text}
          onClick={() => console.log('Clicked!')}
        />
      </ErrorPage>
    </Template>
  );
};

export const Error401: Story<ErrorContentProps> = () => {
  const error401 = getErrorContent('Amplify portal', ErrorType.ERROR_401);
  return (
    <Template>
      <ErrorPage illustration={error401.illustration}>
        <ErrorPage.Title title={error401.title} />
        <ErrorPage.Description text={error401.description} />
        <ErrorPage.Action
          buttonText={error401.button?.text}
          onClick={() => console.log('Clicked!')}
        />
      </ErrorPage>
    </Template>
  );
};

export const Error403: Story<ErrorContentProps> = () => {
  const error403 = getErrorContent('Amplify portal', ErrorType.ERROR_403);
  const dumyAccesses = [
    { title: 'SMDA', url: 'https://accessit.equinor.com/#' },
    {
      title: 'SSDL relevant access groups',
      url: 'https://accessit.equinor.com/#',
    },
  ];
  return (
    <Template>
      <ErrorPage illustration={error403.illustration}>
        <ErrorPage.Title title={error403.title} />
        <ErrorPage.Description text={error403.description} />
        <ErrorPage.MissingAccesses accesses={dumyAccesses} />
        <ErrorPage.Action
          buttonText={error403.button?.text}
          onClick={() => window.open('https://accessit.equinor.com/#')}
        />
      </ErrorPage>
    </Template>
  );
};

export const Error404: Story<ErrorContentProps> = () => {
  const error404 = getErrorContent('Amplify portal', ErrorType.ERROR_404);
  return (
    <Template>
      <ErrorPage illustration={error404.illustration}>
        <ErrorPage.Title title={error404.title} />
        <ErrorPage.Description text={error404.description} />
        <ErrorPage.Action
          buttonText={error404.button?.text}
          onClick={() => console.log('Clicked!')}
        />
      </ErrorPage>
    </Template>
  );
};

export const Error500: Story<ErrorContentProps> = () => {
  const error500 = getErrorContent('Amplify portal', ErrorType.ERROR_500);
  return (
    <Template>
      <ErrorPage illustration={error500.illustration}>
        <ErrorPage.Title title={error500.title} />
        <ErrorPage.Description text={error500.description} />
        <ErrorPage.Action
          buttonText={error500.button?.text}
          onClick={() => console.log('Clicked!')}
        />
        <ErrorPage.Details
          text={
            '500 Internal Server Error server error response code indicates that the server encountered an unexpected condition that prevented it from fulfilling the request. This error response is a generic "catch-all" response.'
          }
        />
      </ErrorPage>
    </Template>
  );
};
