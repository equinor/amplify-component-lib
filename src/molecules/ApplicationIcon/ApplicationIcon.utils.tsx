import { AppIconData } from 'src/molecules/ApplicationIcon/ApplicationIconData/ApplicationIconCollection';

export type AllowedColors =
  | 'blue'
  | 'green'
  | 'purple'
  | 'red'
  | 'yellow'
  | 'magenta';

export const colorMap: Record<AllowedColors, string> = {
  blue: '#61ACB2',
  green: '#62B295',
  purple: '#BE9FD0',
  red: '#DB949A',
  yellow: '#C7A97A',
  magenta: '#BC6B88',
};

export const darkenColor = (
  color: AllowedColors,
  percentage: number,
  alphaHex: string
) => {
  return `color-mix(in srgb, ${colorMap[color]}${alphaHex}, rgba(0, 0, 0, 1) ${percentage}%)`;
};

export interface AppBaseProps {
  waveIntervalDist?: number;
  size?: number;
  color?: AllowedColors;
  rotationVariant?: number;
  numWaves?: number;
  hasLargeWaves?: boolean;
  animationState?: 'none' | 'hoverable' | 'animated' | 'loading';
  appIconData: AppIconData['svgPathData'];
}
