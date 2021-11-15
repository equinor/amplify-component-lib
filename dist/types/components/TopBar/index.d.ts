import { TopBar as BaseTopBar } from './TopBar';
import { Actions } from './Actions';
declare type TopBarType = typeof BaseTopBar & {
    Actions: typeof Actions;
};
declare const TopBar: TopBarType;
export default TopBar;
export type { TopBarType };
