import { faker } from '@faker-js/faker';

import { convertLatLngToUtm, convertUtmToLatLng, distanceLatLng } from './map';

test('distanceLatLng works as expected', () => {
  const firstLocation = {
    lat: Number(faker.location.latitude()),
    lng: Number(faker.location.longitude()),
  };
  const secondLocation = faker.location.nearbyGPSCoordinate({
    origin: [firstLocation.lat, firstLocation.lng],
    radius: 10,
    isMetric: true,
  });

  expect(
    distanceLatLng(firstLocation, {
      lat: Number(secondLocation[0]),
      lng: Number(secondLocation[1]),
    })
  ).toBeLessThanOrEqual(10);
});

const utmCoordinate = {
  x: 431400,
  y: 6537900,
};
const latLng = { lat: 58.973227394399274, lng: 1.8052774673154197 };

test('convertUtmToLatLng works as expected', () => {
  const converted = convertUtmToLatLng(utmCoordinate.x, utmCoordinate.y);

  expect(converted).toStrictEqual(latLng);
});

test('convertLatLngToUtm works as expected', () => {
  const converted = convertLatLngToUtm(latLng);

  /// The conversion includes a lot of decimals which is why we round it to the nearest whole number
  expect(Math.round(converted[0])).toBe(utmCoordinate.x);
  expect(Math.round(converted[1])).toBe(utmCoordinate.y);
});
