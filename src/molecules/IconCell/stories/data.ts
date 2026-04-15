import {
  car,
  check,
  error_outlined,
  info_circle,
  warning_outlined,
} from '@equinor/eds-icons';

import { IconCellProps } from '../IconCell';
import {
  IconCellColors,
  IconCellStates,
  IconCellVariants,
} from '../IconCell.types';

export interface StoryBookData {
  id: string;
  icon: IconCellProps;
}

export const storyBookData: StoryBookData[] = [
  {
    id: '1',
    icon: {
      icon: car,
      color: IconCellColors.BLUE,
      variant: IconCellVariants.COLOURED,
      state: IconCellStates.DEFAULT,
      label: 'Vehicle Info',
      helperIcon: info_circle,
    },
  },
  {
    id: '2',
    icon: {
      icon: check,
      color: IconCellColors.GREEN,
      variant: IconCellVariants.COLOURED,
      state: IconCellStates.DEFAULT,
      label: 'Approved',
    },
  },
  {
    id: '3',
    icon: {
      icon: error_outlined,
      color: IconCellColors.RED,
      variant: IconCellVariants.COLOURED,
      state: IconCellStates.ERROR,
      label: 'Error',
    },
  },
  {
    id: '4',
    icon: {
      icon: warning_outlined,
      color: IconCellColors.ORANGE,
      variant: IconCellVariants.COLOURED,
      state: IconCellStates.WARNING,
      label: 'Caution',
    },
  },
  {
    id: '5',
    icon: {
      icon: info_circle,
      color: IconCellColors.PURPLE,
      variant: IconCellVariants.COLOURED,
      label: 'Details',
    },
  },
  {
    id: '6',
    icon: {
      variant: IconCellVariants.SCRIBBLED_OUT,
      label: 'Removed',
    },
  },
  {
    id: '7',
    icon: {
      icon: car,
      color: IconCellColors.YELLOW,
      variant: IconCellVariants.COLOURED,
      label: 'Transport',
    },
  },
  {
    id: '8',
    icon: {
      icon: check,
      color: IconCellColors.LIGHTGREY,
      variant: IconCellVariants.COLOURED,
      label: 'Neutral',
    },
  },
  {
    id: '9',
    icon: {
      icon: warning_outlined,
      color: IconCellColors.PINK,
      variant: IconCellVariants.COLOURED,
      label: 'Alert',
    },
  },
  {
    id: '10',
    icon: {
      icon: info_circle,
      color: IconCellColors.DEFAULT,
      variant: IconCellVariants.COLOURED,
      label: 'General Info',
    },
  },
];
