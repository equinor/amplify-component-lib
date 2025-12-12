import { EnvironmentToggleFeatures } from '@equinor/subsurface-app-management';

import { colors } from 'src/atoms';
import { StatusVariant } from 'src/organisms/TopBar/Account/Account.types';

export function formatFeatureName(activeFeature: EnvironmentToggleFeatures) {
  return (
    activeFeature.charAt(0).toUpperCase() +
    activeFeature.slice(1).replaceAll('-', ' ')
  );
}

type ColorConfig = {
  border: string;
  background: string;
  chip: string;
};

const VARIANT_COLORS: Record<StatusVariant, ColorConfig> = {
  combined: {
    border: colors.interactive.success__resting.rgba,
    background: colors.interactive.warning__text.rgba,
    chip: colors.interactive.warning__resting.rgba,
  },
  environment: {
    border: colors.interactive.success__resting.rgba,
    background: colors.interactive.success__text.rgba,
    chip: colors.interactive.success__resting.rgba,
  },
  impersonate: {
    border: colors.interactive.warning__resting.rgba,
    background: colors.interactive.warning__text.rgba,
    chip: colors.interactive.warning__resting.rgba,
  },
};

const DEFAULT_COLORS: ColorConfig = {
  border: colors.interactive.warning__resting.rgba,
  background: colors.interactive.warning__text.rgba,
  chip: colors.interactive.warning__resting.rgba,
};

export function getVariantColors(
  variant: StatusVariant | undefined
): ColorConfig {
  return variant ? VARIANT_COLORS[variant] : DEFAULT_COLORS;
}
