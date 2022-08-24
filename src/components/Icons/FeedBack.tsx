import Fallback from './Fallback';
import { ISvgIconProps } from '.';
import NothingFilled from './NothingFIlled';
import NothingOutlined from './NothingOutlined';
import { FC } from 'react';
import SomethingFilled from './SomethingFilled';
import SomethingOutlined from './SomethingOutlined';

interface IFeedBackIconData {
  iconName: string;
  component: FC<ISvgIconProps>;
}

export interface IFeedBackIconProps {
  name: 'positive' | 'negative' | 'default';
  variant?: 'filled' | 'outline';
  size?: 16 | 24 | 32 | 40 | 48 | 96;
}

export const feedbackIcons: IFeedBackIconData[] = [
  { iconName: 'default', component: Fallback },
  { iconName: 'nothing-outline', component: NothingOutlined },
  { iconName: 'nothing-filled', component: NothingFilled },
  { iconName: 'something-filled', component: SomethingFilled },
  { iconName: 'something-outline', component: SomethingOutlined },
];

const FeedBackIcon: FC<IFeedBackIconProps> = ({ name, size, variant }) => {
  const DefaultComponent = feedbackIcons[0].component;
  if (name === 'default') {
    return <DefaultComponent size={size} />;
  }

  const appData = feedbackIcons.find(
    (icon) =>
      icon.iconName ===
      `${name === 'positive' ? 'something' : 'nothing'}-${
        variant ? variant : 'filled'
      }`
  );
  if (appData) {
    return <appData.component size={size} />;
  }

  return <DefaultComponent size={size} />;
};

export default FeedBackIcon;
