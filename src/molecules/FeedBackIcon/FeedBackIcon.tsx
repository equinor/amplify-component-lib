import { FC } from 'react';

import { NegativeFilled } from './NegativeFilled';
import { NegativeOutlined } from './NegativeOutlined';
import { PositiveFilled } from './PositiveFilled';
import { PositiveOutlined } from './PositiveOutlined';
// Needs to be relative path for the type to be importable after build
import { SizeIconProps } from 'src/atoms/types';

interface FeedBackIconData {
  iconName: string;
  component: FC<SizeIconProps>;
}

export interface FeedBackIconProps extends Partial<SizeIconProps> {
  name: 'positive' | 'negative';
  variant?: 'filled' | 'outlined';
}

const feedbackIcons: FeedBackIconData[] = [
  { iconName: 'negative-outlined', component: NegativeOutlined },
  { iconName: 'negative-filled', component: NegativeFilled },
  { iconName: 'positive-filled', component: PositiveFilled },
  { iconName: 'positive-outlined', component: PositiveOutlined },
];

export const FeedBackIcon: FC<FeedBackIconProps> = ({
  name,
  size = 48,
  variant = 'filled',
}) => {
  const appData = feedbackIcons.find(
    (icon) => icon.iconName === `${name}-${variant}`
  )!;

  return <appData.component size={size} />;
};
