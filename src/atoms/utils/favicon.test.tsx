import { faker } from '@faker-js/faker';

import { setupIcons } from './favicon';
import { render } from 'src/tests/jsdomtest-utils';

const lightId = 'light';
const darkId = 'dark';
test('setupFavicon works as expected', () => {
  const lightImg = faker.image.url({ width: 64, height: 64 });
  const darkImg = faker.image.url({ width: 64, height: 64 });
  render(<div>some page</div>);

  const light = document.createElement('link');
  light.id = lightId;
  light.href = lightImg;
  document.head.appendChild(light);

  const dark = document.createElement('link');
  dark.id = darkId;
  dark.href = darkImg;
  document.head.appendChild(dark);

  import.meta.env.DARK = 'false';
  setupIcons(lightId, darkId);

  expect(document.head.children.length).toBe(1);
  expect(document.head.querySelector(`#${lightId}`)).toBeInTheDocument();

  // Clean up
  document.head.removeChild(light);
});

test('setupFavicon works as expected when in dark mode', () => {
  const lightImg = faker.image.url({ width: 64, height: 64 });
  const darkImg = faker.image.url({ width: 64, height: 64 });
  render(<div>some page</div>);

  const light = document.createElement('link');
  light.id = lightId;
  light.href = lightImg;
  document.head.appendChild(light);

  const dark = document.createElement('link');
  dark.id = darkId;
  dark.href = darkImg;
  document.head.appendChild(dark);

  import.meta.env.DARK = 'true';

  setupIcons(lightId, darkId);

  expect(document.head.children.length).toBe(1);
  expect(document.head.querySelector(`#${darkId}`)).toBeInTheDocument();

  // Clean up
  document.head.removeChild(dark);
});
