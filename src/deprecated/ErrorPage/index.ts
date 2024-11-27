import { Action } from 'src/deprecated/ErrorPage/Action';
import { Description } from 'src/deprecated/ErrorPage/Description';
import { Details } from 'src/deprecated/ErrorPage/Details';
import {
  ErrorContentProps,
  ErrorPage as DefaultErrorPage,
} from 'src/deprecated/ErrorPage/ErrorPage';
import { MissingAccesses } from 'src/deprecated/ErrorPage/MissingAccesses';
import { Title } from 'src/deprecated/ErrorPage/Title';

type ErrorPageType = typeof DefaultErrorPage & {
  Title: typeof Title;
  Description: typeof Description;
  Action: typeof Action;
  Details: typeof Details;
  MissingAccesses: typeof MissingAccesses;
};

/**
 * @deprecated - Use Status component instead
 */
export const ErrorPage = DefaultErrorPage as ErrorPageType;
ErrorPage.Title = Title;
ErrorPage.Description = Description;
ErrorPage.Action = Action;
ErrorPage.Details = Details;
ErrorPage.MissingAccesses = MissingAccesses;

export type { ErrorContentProps };
