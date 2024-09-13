import { spacings } from 'src/atoms/style';
import { TableOfContentsVariants } from 'src/organisms/TableOfContents/TableOfContents.types';

export const HEIGHT: Record<TableOfContentsVariants, string> = {
  buttons: '39px',
  border: '34px',
  borderHorizontal: '34px',
};

export const GAP: Record<TableOfContentsVariants, string> = {
  buttons: spacings.x_small,
  border: '0',
  borderHorizontal: '0',
};
