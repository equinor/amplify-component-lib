export const IconCellColors = {
  GREEN: 'green',
  RED: 'red',
  ORANGE: 'orange',
  BLUE: 'blue',
  GREY: 'grey',
  LIGHTGREY: 'lightgrey',
  PINK: 'pink',
  YELLOW: 'yellow',
  PURPLE: 'purple',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
  DANGER: 'danger',
  DEFAULT: 'default',
} as const;

export type IconCellColor =
  (typeof IconCellColors)[keyof typeof IconCellColors];

export const IconCellVariants = {
  DEFAULT: 'default',
  COLOURED: 'colored',
  SCRIBBLED_OUT: 'scribbled-out',
} as const;

export type IconCellVariant =
  (typeof IconCellVariants)[keyof typeof IconCellVariants];

export const IconCellStates = {
  DEFAULT: 'default',
  WARNING: 'warning',
  DANGER: 'danger',
} as const;

export type IconCellState =
  (typeof IconCellStates)[keyof typeof IconCellStates];

export interface IconCellColorObject {
  backgroundColor: string;
  iconColor: string;
}
