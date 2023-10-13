import Colorbox from './Colorbox';
import { Guidelines as BaseGuidelines } from './Guidelines';
import Item from './Item';
import Section from './Section';

type BaseGuidelinesType = typeof BaseGuidelines;

interface GuidelinesType extends BaseGuidelinesType {
  Section: typeof Section;
  Item: typeof Item;
  Colorbox: typeof Colorbox;
}

const Guidelines = BaseGuidelines as GuidelinesType;
Guidelines.Section = Section;
Guidelines.Item = Item;
Guidelines.Colorbox = Colorbox;

export default Guidelines;
