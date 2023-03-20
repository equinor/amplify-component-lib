import { FC } from 'react';

import Fallback from '../Fallback';
import { SvgIconProps } from '../index';
import NegativeFilled from './NegativeFilled';
import NegativeOutlined from './NegativeOutlined';
import PositiveFilled from './PositiveFilled';
import PositiveOutlined from './PositiveOutlined';

interface FeedBackIconData {
  iconName: string;
  component: FC<SvgIconProps>;
}

export interface FeedBackIconProps {
  name: 'positive' | 'negative' | 'default';
  variant?: 'filled' | 'outlined';
  size?: 16 | 24 | 32 | 40 | 48 | 96;
}

const feedbackIcons: FeedBackIconData[] = [
  { iconName: 'default', component: Fallback },
  { iconName: 'negative-outlined', component: NegativeOutlined },
  { iconName: 'negative-filled', component: NegativeFilled },
  { iconName: 'positive-filled', component: PositiveFilled },
  { iconName: 'positive-outlined', component: PositiveOutlined },
];

const FeedBackIcon: FC<FeedBackIconProps> = ({ name, size, variant }) => {
  const DefaultComponent = feedbackIcons[0].component;
  if (
    name === 'default' ||
    !feedbackIcons.some((icon) => icon.iconName.includes(name))
  ) {
    return <DefaultComponent size={size} />;
  }

  const appData = feedbackIcons.find(
    (icon) => icon.iconName === `${name}-${variant ? variant : 'filled'}`
  ) as FeedBackIconData;
  return <appData.component size={size} />;
};

export default FeedBackIcon;
