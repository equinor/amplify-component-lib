import { TopBar as BaseTopBar } from './TopBar';
import { Actions } from './Actions';

type TopBarType = typeof BaseTopBar & {
  Actions: typeof Actions;
};

const TopBar = BaseTopBar as TopBarType;
TopBar.Actions = Actions;

export default TopBar;
export type { TopBarType };
