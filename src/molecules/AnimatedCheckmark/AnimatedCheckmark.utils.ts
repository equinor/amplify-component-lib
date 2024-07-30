import { AnimatedCheckmarkProps } from './AnimatedCheckmark';

export function sizeToPx(size: AnimatedCheckmarkProps['size']): string {
  switch (size) {
    case 'small':
      return '70px';
    default:
    case 'medium':
      return '144px';
  }
}
