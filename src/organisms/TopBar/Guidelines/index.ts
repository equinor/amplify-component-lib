import { Colorbox } from './Colorbox';
import { Guidelines as BaseGuidelines } from './Guidelines';

type BaseGuidelinesType = typeof BaseGuidelines;

interface GuidelinesType extends BaseGuidelinesType {
  Colorbox: typeof Colorbox;
}

export const Guidelines = BaseGuidelines as GuidelinesType;

Guidelines.Colorbox = Colorbox;
