import { TopBar as BaseTopBar } from './TopBar';
import { Actions } from './Actions';
import { Guidelines, IGuidelineSections } from './Guidelines';

type TopBarType = typeof BaseTopBar & {
  Actions: typeof Actions;
  Guidelines: typeof Guidelines;
};

const TopBar = BaseTopBar as TopBarType;
TopBar.Actions = Actions;
TopBar.Guidelines = Guidelines;

export default TopBar;
export type { TopBarType, IGuidelineSections };
