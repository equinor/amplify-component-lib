import { css } from 'styled-components';

export const spacingTokens = css`
  /*Comfortable, by default*/
  html {
    --eds_spacing_xxx_large: 48px;
    --eds_spacing_xx_large: 40px;
    --eds_spacing_x_large: 32px;
    --eds_spacing_large: 24px;
    --eds_spacing_medium: 16px;
    --eds_spacing_medium_small: 12px;
    --eds_spacing_small: 8px;
    --eds_spacing_x_small: 4px;
    --eds_spacing_xx_small: 2px;
    /* Override button padding variables to make it work with spacings */
    --eds_button__padding_x: var(--eds_spacing_medium);

    --eds_icon-button__size: 40px;
    --eds_button__height: 36px;
  }

  /*Compact*/
  [data-spacings-mode='compact'] {
    --eds_spacing_xxx_large: 40px;
    --eds_spacing_xx_large: 32px;
    --eds_spacing_x_large: 40px;
    --eds_spacing_large: 16px;
    --eds_spacing_medium: 12px;
    --eds_spacing_medium_small: 8px;
    --eds_spacing_small: 4px;
    --eds_spacing_x_small: 2px;
    --eds_spacing_xx_small: 0px;

    --eds_icon-button__size: 32px;
    --eds_button__height: 28px;
  }

  /*Extra Compact*/
  [data-spacings-mode='extra-compact'] {
    --eds_spacing_xxx_large: 32px;
    --eds_spacing_xx_large: 24px;
    --eds_spacing_x_large: 16px;
    --eds_spacing_large: 12px;
    --eds_spacing_medium: 8px;
    --eds_spacing_medium_small: 4px;
    --eds_spacing_small: 2px;
    --eds_spacing_x_small: 0px;
    --eds_spacing_xx_small: 0px;
    --eds_icon-button__size: 28px;
    --eds_button__height: 20px;
  }
`;
