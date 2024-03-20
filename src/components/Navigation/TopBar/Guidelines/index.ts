import Colorbox from './Colorbox';
import { Guidelines as BaseGuidelines } from './Guidelines';

type BaseGuidelinesType = typeof BaseGuidelines;

interface GuidelinesType extends BaseGuidelinesType {
  Colorbox: typeof Colorbox;
}

const Guidelines = BaseGuidelines as GuidelinesType;

Guidelines.Colorbox = Colorbox;

export default Guidelines;
