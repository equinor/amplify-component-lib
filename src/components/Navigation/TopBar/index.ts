import ApplicationDrawer from './ApplicationDrawer/ApplicationDrawer';
import { GuidelineSections } from './Guidelines/Guidelines';
import { Resources } from './Resources/Resources';
import { Account } from './Account';
import { Actions } from './Actions';
import FieldSelector from './FieldSelector';
import Notifications from './Notifications';
import { ISettingsProps, Settings } from './Settings';
import { TopBar as BaseTopBar } from './TopBar';
import Guidelines from 'src/components/Navigation/TopBar/Guidelines';

type TopBarType = typeof BaseTopBar & {
  Account: typeof Account;
  Actions: typeof Actions;
  Guidelines: typeof Guidelines;
  Settings: typeof Settings;
  Notifications: typeof Notifications;
  FieldSelector: typeof FieldSelector;
  Resources: typeof Resources;
  ApplicationDrawer: typeof ApplicationDrawer;
};

const TopBar = BaseTopBar as TopBarType;
TopBar.Account = Account;
TopBar.Actions = Actions;
TopBar.Guidelines = Guidelines;
TopBar.Settings = Settings;
TopBar.Notifications = Notifications;
TopBar.FieldSelector = FieldSelector;
TopBar.Resources = Resources;
TopBar.ApplicationDrawer = ApplicationDrawer;

export default TopBar;
export type { GuidelineSections, ISettingsProps, TopBarType };
