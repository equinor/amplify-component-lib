import { useCallback, useEffect, useState } from 'react';

import { PointToProdFeaturesLocalStorageKey } from '@equinor/subsurface-app-management';

interface UseEnvironmentToggle {
  featureStates: Record<string, boolean>;
  hasUnsavedChanges: boolean;
  toggleFeature: (
    feature: PointToProdFeaturesLocalStorageKey,
    checked: boolean
  ) => void;
  applyChanges: () => void;
  resetChanges: () => void;
}

interface EnvironmentToggleType {
  featureToggle: boolean;
  tutroial: boolean;
  faq: boolean;
  impersonate: boolean;
}

export function useEnvironmentToggle(): UseEnvironmentToggle {
  const getLocalStorageState = useCallback((): Record<string, boolean> => {
    const state: Record<string, boolean> = {};
    Object.values(PointToProdFeaturesLocalStorageKey).forEach((feature) => {
      state[feature] = localStorage.getItem(feature) === 'true';
    });

    return state;
  }, []);

  const [featureStates, setFeatureStates] =
    useState<Record<string, boolean>>(getLocalStorageState);
  const [originalStates, setOriginalStates] =
    useState<Record<string, boolean>>(getLocalStorageState);

  useEffect(() => {
    const currentState = getLocalStorageState();
    setFeatureStates(currentState);
    setOriginalStates(currentState);
  }, [getLocalStorageState]);

  const hasUnsavedChanges = Object.keys(featureStates).some(
    (key) => featureStates[key] !== originalStates[key]
  );

  const toggleFeature = useCallback(
    (feature: PointToProdFeaturesLocalStorageKey, checked: boolean) => {
      setFeatureStates((prevStates) => ({
        ...prevStates,
        [feature]: checked,
      }));
    },
    []
  );

  const applyChanges = useCallback(() => {
    Object.entries(featureStates).forEach(([feature, isEnabled]) => {
      if (isEnabled) {
        localStorage.setItem(feature, 'true');
      } else {
        localStorage.removeItem(feature);
      }
    });

    window.location.reload();
  }, [featureStates]);

  const resetChanges = useCallback(() => {
    const currentState = getLocalStorageState();
    setFeatureStates(currentState);
    setOriginalStates(currentState);
  }, [getLocalStorageState]);

  return {
    featureStates,
    hasUnsavedChanges,
    toggleFeature,
    applyChanges,
    resetChanges,
  };
}
