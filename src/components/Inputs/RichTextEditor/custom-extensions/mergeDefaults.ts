import { AmplifyKitOptions } from './DefaultKit';

interface MergedDefaults {
  options?: Partial<AmplifyKitOptions>;
  defaults: Partial<AmplifyKitOptions>;
}

function mergeDefaults({ options, defaults }: MergedDefaults) {
  if (!options) return defaults;
  const mergedOptions = { ...defaults };
  for (const key in options) {
    const typedKey = key as keyof AmplifyKitOptions;
    const property = options[typedKey];
    if (!property) {
      //@ts-expect-error - Typescript shits the bed here because the union type is just too complex for it to handle
      mergedOptions[typedKey] = property;
    } else {
      mergedOptions[typedKey] = {
        ...defaults[typedKey],
        ...options[typedKey],
      };
    }
  }
  return mergedOptions;
}

export { mergeDefaults };
