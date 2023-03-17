import { Action } from './Action';
import { Description } from './Description';
import { Details } from './Details';
import { ErrorContentProps, ErrorPage as DefaultErrorPage } from './ErrorPage';
import { MissingAccesses } from './MissingAccesses';
import { Title } from './Title';

type ErrorPageType = typeof DefaultErrorPage & {
  Title: typeof Title;
  Description: typeof Description;
  Action: typeof Action;
  Details: typeof Details;
  MissingAccesses: typeof MissingAccesses;
};

const ErrorPage = DefaultErrorPage as ErrorPageType;
ErrorPage.Title = Title;
ErrorPage.Description = Description;
ErrorPage.Action = Action;
ErrorPage.Details = Details;
ErrorPage.MissingAccesses = MissingAccesses;

export default ErrorPage;
export type { ErrorContentProps };
