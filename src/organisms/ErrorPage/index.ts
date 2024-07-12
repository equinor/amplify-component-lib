import { Action } from 'src/organisms/ErrorPage/Action';
import { Description } from 'src/organisms/ErrorPage/Description';
import { Details } from 'src/organisms/ErrorPage/Details';
import {
  ErrorContentProps,
  ErrorPage as DefaultErrorPage,
} from 'src/organisms/ErrorPage/ErrorPage';
import { MissingAccesses } from 'src/organisms/ErrorPage/MissingAccesses';
import { Title } from 'src/organisms/ErrorPage/Title';

type ErrorPageType = typeof DefaultErrorPage & {
  Title: typeof Title;
  Description: typeof Description;
  Action: typeof Action;
  Details: typeof Details;
  MissingAccesses: typeof MissingAccesses;
};

export const ErrorPage = DefaultErrorPage as ErrorPageType;
ErrorPage.Title = Title;
ErrorPage.Description = Description;
ErrorPage.Action = Action;
ErrorPage.Details = Details;
ErrorPage.MissingAccesses = MissingAccesses;

export type { ErrorContentProps };
