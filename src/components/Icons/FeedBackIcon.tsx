import React from 'react';
import { find } from 'lodash';
import NothingOutline from './nothing-outline';
import NothingFilled from './nothing-filled';
import SomethingFilled from './something-filled';
import SomethingOutline from './something-outline';
import Default from './default';

interface ISvgIconProps {
  size?: 16 | 24 | 32 | 40 | 48;
}

interface IFeedBackIconData {
  iconName: string;
  component: React.FC<ISvgIconProps>;
}

export interface IFeedBackIconProps {
  name: 'positive' | 'negative' | 'default';
  variant?: 'filled' | 'outline';
  size?: 16 | 24 | 32 | 40 | 48;
}

export const feedbackIcons: IFeedBackIconData[] = [
  { iconName: 'default', component: Default },
  { iconName: 'nothing-outline', component: NothingOutline },
  { iconName: 'nothing-filled', component: NothingFilled },
  { iconName: 'something-filled', component: SomethingFilled },
  { iconName: 'something-outline', component: SomethingOutline },
];

const FeedBackIcon: React.FC<IFeedBackIconProps> = ({
  name,
  size,
  variant,
}) => {
  const DefaultComponent = feedbackIcons[0].component;
  if (name === 'default') {
    return <DefaultComponent size={size} />;
  }

  const appData = find(feedbackIcons, {
    iconName: `${name === 'positive' ? 'something' : 'nothing'}-${
      variant ? variant : 'filled'
    }`,
  });
  if (appData) {
    return <appData.component size={size} />;
  }

  return <DefaultComponent size={size} />;
};

export default FeedBackIcon;
