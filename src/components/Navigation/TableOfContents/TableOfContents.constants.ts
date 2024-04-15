import { TableOfContentsVariants } from './TableOfContents.types';
import { spacings } from 'src/style';

export const HEIGHT: Record<TableOfContentsVariants, string> = {
  buttons: '39px',
  border: '34px',
};

export const GAP: Record<TableOfContentsVariants, string> = {
  buttons: spacings.x_small,
  border: '0',
};
