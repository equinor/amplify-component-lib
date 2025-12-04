import { useEffect, useState } from 'react';

import { PointToProdFeaturesLocalStorageKey } from 'src/atoms';

interface UseToggleActiveEnvironment {
  activeFeatures: string[] | null;
  isActiveFeatureOnCurrentEnvironment: boolean;
}

export function useToggleActiveEnvironment(): UseToggleActiveEnvironment {
  const [
    activeFeaturesOnCurrentEnvironment,
    setActiveFeaturesOnCurrentEnvironment,
  ] = useState<string[] | null>([]);

  useEffect(() => {
    const checkLocalStorage = () => {
      const features: string[] = [];
      Object.values(PointToProdFeaturesLocalStorageKey).forEach((feature) => {
        const isEnabled = localStorage.getItem(feature) === 'true';
        if (isEnabled) {
          features.push(feature);
        }
      });

      setActiveFeaturesOnCurrentEnvironment(features);
    };

    checkLocalStorage();
  }, []);

  return {
    activeFeatures: activeFeaturesOnCurrentEnvironment,
    isActiveFeatureOnCurrentEnvironment:
      activeFeaturesOnCurrentEnvironment != null
        ? activeFeaturesOnCurrentEnvironment.length > 0
        : false,
  };
}
