import {
  DEFAULT_FEATURES,
  ImageExtensionFnProps,
  RichTextEditorFeatures,
} from 'src/molecules/RichTextEditor/RichTextEditor.types';

export interface FeaturesProps
  extends Pick<ImageExtensionFnProps, 'onImageUpload'> {
  features?: RichTextEditorFeatures[];
  extendFeatures?: RichTextEditorFeatures[];
  removeFeatures?: RichTextEditorFeatures[];
}

export function getFeatures({
  features,
  extendFeatures,
  removeFeatures,
  onImageUpload,
}: FeaturesProps) {
  const defaultFeatures = features ?? DEFAULT_FEATURES;
  const additionalFeatures = extendFeatures ?? [];
  const usedFeatures = [...defaultFeatures, ...additionalFeatures]
    .filter((feature) => !removeFeatures?.includes(feature))
    .filter((value, index, array) => index === array.indexOf(value)); // Remove duplicates

  if (
    usedFeatures.includes(RichTextEditorFeatures.IMAGES) &&
    onImageUpload === undefined
  ) {
    throw new Error(
      `onImageUpload cannot be undefined when features include images!
      Either add the onImageUpload function or remove RichTextEditorFeatures.IMAGES from the features array`
    );
  }
  return usedFeatures;
}

export const IMG_WITH_SRC_AND_ALT = /(<img src=".*?" alt="(.*?)">)/g;
export const IMG_WITH_ALT = /(<img alt="(.*?)" \/>)/g;

export function extractImageUrls(value: string | undefined): string[] {
  if (!value) return [];

  const images: string[] = [];
  const matches = value.matchAll(IMG_WITH_ALT);
  for (const match of matches) {
    images.push(match[2]);
  }

  return images;
}

export function imageToB64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result);
    };
    reader.onerror = reject;
  });
}

export function cleanRichTextValue(value: string) {
  return value.replaceAll(IMG_WITH_SRC_AND_ALT, `<img alt="$2" />`);
}
