export enum IconCellColors {
  GREEN = 'green',
  RED = 'red',
  ORANGE = 'orange',
  BLUE = 'blue',
  GREY = 'grey',
  LIGHTGREY = 'lightgrey',
  PINK = 'pink',
  YELLOW = 'yellow',
  PURPLE = 'purple',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
  DANGER = 'danger',
  DEFAULT = 'default',
}

export enum IconCellTypes {
  TRANSPARENT = 'transparent',
  COLOURED = 'colored',
  SCRIBBLED_OUT = 'scribbled_out',
}

export enum IconCellStates {
  DEFAULT = 'default',
  WARNING = 'warning',
  DANGER = 'danger',
}

export interface IconCellColor {
  backgroundColor: string;
  iconColor: string;
}
