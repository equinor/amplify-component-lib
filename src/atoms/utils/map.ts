import proj4 from 'proj4';

export function degrees2radians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

interface Point {
  lat: number;
  lng: number;
}

export function distanceLatLng(x: Point, y: Point): number {
  const R = 6371; // Radius of the earth in km
  const dLat = degrees2radians(y.lat - x.lat);
  const dLon = degrees2radians(y.lng - x.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degrees2radians(x.lat)) *
      Math.cos(degrees2radians(y.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

export const utmProjection =
  '+proj=utm +zone=31 +ellps=intl +towgs84=-90.365,-101.13,-123.384,0.333,0.077,0.894,1.994 +units=m +no_defs';

export function convertUtmToLatLng(
  x: string | number,
  y: string | number
): Point {
  const converted = proj4(utmProjection, 'EPSG:4326', [Number(x), Number(y)]);
  return {
    lat: converted[1],
    lng: converted[0],
  };
}

export function convertLatLngToUtm(coordinate: Point): [number, number] {
  const converted = proj4('EPSG:4326', utmProjection, [
    coordinate.lng,
    coordinate.lat,
  ]);
  return [converted[0], converted[1]];
}
