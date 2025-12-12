import { EnvironmentToggleFeatures } from '@equinor/subsurface-app-management';

export function getActiveFeatureDisplayName(
  activeFeature: EnvironmentToggleFeatures
) {
  return (
    activeFeature.charAt(0).toUpperCase() +
    activeFeature.slice(1).replaceAll('-', ' ')
  );
}
