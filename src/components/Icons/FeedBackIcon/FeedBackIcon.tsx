import { FC } from 'react';

import NegativeFilled from './NegativeFilled';
import NegativeOutlined from './NegativeOutlined';
import PositiveFilled from './PositiveFilled';
import PositiveOutlined from './PositiveOutlined';
import { SizeIconProps } from 'src/types/Icon';

interface FeedBackIconData {
  iconName: string;
  component: FC<SizeIconProps>;
}

export interface FeedBackIconProps extends SizeIconProps {
  name: 'positive' | 'negative';
  variant?: 'filled' | 'outlined';
}

const feedbackIcons: FeedBackIconData[] = [
  { iconName: 'negative-outlined', component: NegativeOutlined },
  { iconName: 'negative-filled', component: NegativeFilled },
  { iconName: 'positive-filled', component: PositiveFilled },
  { iconName: 'positive-outlined', component: PositiveOutlined },
];

const FeedBackIcon: FC<FeedBackIconProps> = ({ name, size, variant }) => {
  const DefaultComponent = feedbackIcons[0].component;
  if (
    !feedbackIcons.some(
      (icon) => icon.iconName === `${name}-${variant ? variant : 'filled'}`
    )
  ) {
    return <DefaultComponent size={size} />;
  }

  const appData = feedbackIcons.find(
    (icon) => icon.iconName === `${name}-${variant ? variant : 'filled'}`
  )!;
  return <appData.component size={size} />;
};

export default FeedBackIcon;
