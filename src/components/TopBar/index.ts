import { TopBar as BaseTopBar } from './TopBar';
import { Actions } from './Actions';
import { Guidelines, IGuidelineSections } from './Guidelines';
import { Account } from './Account';

type TopBarType = typeof BaseTopBar & {
  Account: typeof Account;
  Actions: typeof Actions;
  Guidelines: typeof Guidelines;
};

const TopBar = BaseTopBar as TopBarType;
TopBar.Account = Account;
TopBar.Actions = Actions;
TopBar.Guidelines = Guidelines;

export default TopBar;
export type { TopBarType, IGuidelineSections };
