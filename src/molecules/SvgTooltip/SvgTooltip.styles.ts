import { typographyTemplate } from '@equinor/eds-utils';

import { shape, typography } from 'src/atoms/style';
import { colors } from 'src/atoms/style/colors';

import styled from 'styled-components';

export const Group = styled.g`
  pointer-events: none;
`;

export const Background = styled.rect`
  fill: ${colors.text.static_icons__default.rgba};
  rx: ${shape.corners.borderRadius};
`;

export const Text = styled.text`
  ${typographyTemplate(typography.ui.tooltip)}
  fill: ${colors.text.static_icons__primary_white.rgba};
  text-anchor: middle;
  dominant-baseline: central;
`;
