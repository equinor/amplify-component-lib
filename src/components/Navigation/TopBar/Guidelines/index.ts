import { Guidelines as BaseGuidelines } from './Guidelines';
import Item from './Item';
import Section from './Section';

interface GuidelinesType {
  Section: typeof Section;
  Item: typeof Item;
}

const Guidelines = BaseGuidelines as unknown as GuidelinesType;
Guidelines.Section = Section;
Guidelines.Item = Item;

export default Guidelines;
