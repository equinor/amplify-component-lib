import { Action } from './Action';
import { Description } from './Description';
import { MissingAccesses } from './MissingAccesses';
import { Status as BaseStatus } from './Status';
import { Title } from './Title';

type StatusType = typeof BaseStatus & {
  Title: typeof Title;
  Description: typeof Description;
  Action: typeof Action;
  MissingAccesses: typeof MissingAccesses;
};

export const Status = BaseStatus as StatusType;
Status.Title = Title;
Status.Description = Description;
Status.Action = Action;
Status.MissingAccesses = MissingAccesses;

export type { StatusType };
