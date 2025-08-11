import { Meta, StoryFn } from '@storybook/react-vite';

import UtilStory from 'src/storybook/UtilStory';

export default {
  title: 'Atoms/Utils/Map',
} as Meta;

export const DistanceLatLng: StoryFn = () => {
  const codeText = `
  distanceLatLng(
    x: LatLngLiteral,
    y: LatLngLiteral
  )
  => returns distance in km between two lat lng points
  `;
  return <UtilStory name="distanceLatLng" codeText={codeText} />;
};

export const UtmProjection: StoryFn = () => {
  const codeText = `
  utmProjection => proj64 string for Johan Sverdrup map projection
  `;
  return <UtilStory name="utmProjection" codeText={codeText} />;
};

export const ConvertUtmToLatLng: StoryFn = () => {
  const codeText = `
  convertUtmToLatLng(
    x: string | number,
    y: string | number
  )
  => returns lat lng object with correct coordinates
  `;
  return <UtilStory name="convertUtmToLatLng" codeText={codeText} />;
};

export const ConvertLatLngToUtm: StoryFn = () => {
  const codeText = `
  convertUtmToLatLng(
    coordinate: LatLngLiteral
  )
  => returns [x (UTM x value), Y (UTM y value)]
  `;
  return <UtilStory name="convertLatLngToUtm" codeText={codeText} />;
};
