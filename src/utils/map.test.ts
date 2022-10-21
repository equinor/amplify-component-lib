import { faker } from '@faker-js/faker';

import map from './map';

test('distanceLatLng works as expected', () => {
  const firstLocation = {
    lat: Number(faker.address.latitude()),
    lng: Number(faker.address.longitude()),
  };
  const secondLocation = faker.address.nearbyGPSCoordinate(
    [firstLocation.lat, firstLocation.lng],
    10,
    true
  );

  expect(
    map.distanceLatLng(firstLocation, {
      lat: Number(secondLocation[0]),
      lng: Number(secondLocation[1]),
    })
  ).toBeLessThanOrEqual(10);
});
