import { colors } from 'src/atoms/style';

export const colorSwitch = (color?: 'red' | 'white' | 'black') => {
  switch (color) {
    case 'red':
      return colors.logo.fill_positive.rgba;
    case 'white':
      return colors.logo.fill_negative.rgba;
    case 'black':
      return '#000';
    default:
      return colors.logo.fill_positive.rgba;
  }
};
