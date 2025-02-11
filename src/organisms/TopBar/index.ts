import { Account } from './Account/Account';
import { ApplicationDrawer } from './ApplicationDrawer/ApplicationDrawer';
import { FieldMenu } from './FieldMenu/FieldMenu';
import { GuidelineSections } from './Guidelines/Guidelines';
import { Notifications } from './Notifications/Notifications';
import { Resources } from './Resources/Resources';
import { Tutorials } from './Tutorials/Tutorials';
import { Actions } from './Actions';
import { Guidelines } from './Guidelines';
import { Settings, SettingsProps } from './Settings';
import { TopBar as BaseTopBar } from './TopBar';

type TopBarType = typeof BaseTopBar & {
  Account: typeof Account;
  Actions: typeof Actions;
  Guidelines: typeof Guidelines;
  Settings: typeof Settings;
  Notifications: typeof Notifications;
  FieldSelector: typeof FieldMenu;
  Resources: typeof Resources;
  ApplicationDrawer: typeof ApplicationDrawer;
  Tutorials: typeof Tutorials;
};

export const TopBar = BaseTopBar as TopBarType;
TopBar.Account = Account;
TopBar.Actions = Actions;
TopBar.Guidelines = Guidelines;
TopBar.Settings = Settings;
TopBar.Notifications = Notifications;
TopBar.FieldSelector = FieldMenu;
TopBar.Resources = Resources;
TopBar.ApplicationDrawer = ApplicationDrawer;
TopBar.Tutorials = Tutorials;

export type { GuidelineSections, SettingsProps, TopBarType };
