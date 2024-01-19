export const spacingTokens = `
/*Comfortable, by default*/
html{
    --eds_spacing_xxx_large: 48px;
    --eds_spacing_xx_large: 40px;
    --eds_spacing_x_large: 32px;
    --eds_spacing_large: 24px;
    --eds_spacing_medium: 16px;
    --eds_spacing_medium_small: 12px;
    --eds_spacing_small: 8px;
    --eds_spacing_x_small: 4px;
    --eds_spacing_xx_small: 2px;
}
    
/*Compact*/
[data-spacing-mode="compact"] {
--eds_spacing_xxx_large: 40px;
--eds_spacing_xx_large: 32px;
--eds_spacing_x_large: 40px;
--eds_spacing_large: 16px;
--eds_spacing_medium: 12px;
--eds_spacing_medium_small: 8px;
--eds_spacing_small: 4px;
--eds_spacing_x_small: 2px;
--eds_spacing_xx_small: 0px;
}

/*Extra Compact*/
[data-spacing-mode="extra-compact"] {
--eds_spacing_xxx_large: 32px;
--eds_spacing_xx_large: 24px;
--eds_spacing_x_large: 16px;
--eds_spacing_large: 12px;
--eds_spacing_medium: 8px;
--eds_spacing_medium_small: 4px;
--eds_spacing_small: 2px;
--eds_spacing_x_small: 0px;
--eds_spacing_xx_small: 0px;
}
`;
