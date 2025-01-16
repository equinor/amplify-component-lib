import { FeatureToggleDto, Tutorial } from '@equinor/subsurface-app-management';
import { faker } from '@faker-js/faker';

import { delay, http, HttpResponse } from 'msw';

export const handlers = [
  http.get('*/api/v1/Tutorial/SASToken', async () => {
    await delay('real');
    return HttpResponse.text(faker.internet.mac());
  }),
  http.get('*/api/v1/Tutorial/{applicationName}', async () => {
    await delay('real');
    const body: Tutorial[] = [];
    return HttpResponse.json(body);
  }),
  http.get('*/api/v1/FeatureToggle', async () => {
    await delay('real');
    const body: FeatureToggleDto = {
      applicationName: 'orca',
      features: [],
    };
    return HttpResponse.json(body);
  }),
  http.get('*/api/v1/AmplifyApplication/application/*/appRoles', async () => {
    await delay('real');
    return HttpResponse.json([]);
  }),
  http.get('*/api/v1/ImpersonateUser/CanImpersonate', async () => {
    return HttpResponse.text('true');
  }),
  http.get('*/api/v1/ImpersonateUser/ActiveUser', async () => {
    await delay('real');
    return HttpResponse.json(undefined, { status: 204 });
  }),
  http.get('*/api/v1/ImpersonateUser/GetImpersonateUserForApp/*', async () => {
    await delay('real');
    return HttpResponse.json([]);
  }),
  http.get('*/api/v1/Token/AmplifyPortal', async () => {
    await delay('real');
    return HttpResponse.text(faker.string.nanoid());
  }),
  http.get('*/api/v1/Token/AmplifyPortal/*', async () => {
    await delay('real');
    return HttpResponse.text(faker.string.nanoid());
  }),
  http.get('*/api/v1/Token/SamPortal', async () => {
    await delay('real');
    return HttpResponse.text(faker.string.nanoid());
  }),
  http.get('*/api/v1/Token/SamPortal/*', async () => {
    await delay('real');
    return HttpResponse.text(faker.string.nanoid());
  }),
  http.get('*/api/v1/ReleaseNotes', async () => {
    await delay('real');
    return HttpResponse.json([]);
  }),
  http.get('*/api/v1/ReleaseNotes/:applicationName', async () => {
    await delay('real');
    return HttpResponse.json([]);
  }),
  http.get('*/api/v1/ReleaseNotes/GetContainerSasUri', async () => {
    await delay('real');
    return HttpResponse.text(
      `${faker.internet.url()}?${faker.string.nanoid()}`
    );
  }),
  http.get('*/api/v1/AmplifyApplication/userapplications', async () => {
    await delay('real');
    return HttpResponse.json([]);
  }),
  http.get(
    '*/api/v1/FeatureToggle/:appName/:currentEnvironment/myfeatures',
    async () => {
      await delay('real');
      return HttpResponse.json([]);
    }
  ),
];
