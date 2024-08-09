import {
  ImpersonateUser,
  ReleaseNote,
  ReleaseNoteType,
} from '@equinor/subsurface-app-management';
import { faker } from '@faker-js/faker';

import { environment } from 'src/atoms/utils/auth_environment';

import { delay, http, HttpResponse } from 'msw';

export const fakeReleaseNotes: ReleaseNote[] = [
  {
    releaseId: faker.string.uuid(),
    applicationName: 'PWEX',
    version: null,
    title: 'Improved task board and reporting overview June',
    body: '<h1>Release notes body text</h1>',
    tags: [ReleaseNoteType.FEATURE, ReleaseNoteType.IMPROVEMENT],
    createdDate: faker.date.past().toDateString(),
  },
  {
    releaseId: faker.string.uuid(),
    applicationName: 'Acquire',
    version: null,
    title: 'SEARCH',
    body: '<h1>Some other text</h1>',
    tags: [ReleaseNoteType.IMPROVEMENT],
    createdDate: faker.date.past().toDateString(),
  },
];

function fakeUser(): ImpersonateUser {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const name = `${firstName} ${lastName}`;
  const uniqueName = `${firstName}.${lastName}`;
  const roles = faker.helpers.arrayElements(['admin', 'writer', 'reader'], {
    min: 1,
    max: 3,
  });

  return {
    firstName,
    lastName,
    name,
    uniqueName,
    roles,
    appName: environment.getAppName(import.meta.env.VITE_NAME),
    activeUsers: [],
  };
}

export const fakeImpersonateUsers: ImpersonateUser[] = [
  fakeUser(),
  fakeUser(),
  fakeUser(),
];

export const handlers = [
  http.post('*/api/v1/ImpersonateUser', async (resolver) => {
    const body = (await resolver.request.json()) as ImpersonateUser;

    await delay('real');
    return HttpResponse.json(body);
  }),
  http.put('*/api/v1/ImpersonateUser/StartImpersonating', async (resolver) => {
    const uniqueName = resolver.request.url.split('username=').at(-1);
    await delay('real');

    const user = fakeImpersonateUsers.find(
      (user) => user.uniqueName === uniqueName
    );

    if (user) return HttpResponse.json(user);

    return HttpResponse.text('Something went wrong!', { status: 500 });
  }),
  http.get('*/api/v1/ImpersonateUser', async () => {
    await delay('real');
    return HttpResponse.json(fakeImpersonateUsers);
  }),
  http.get('*/api/v1/Token/AmplifyPortal', async () => {
    await delay('real');
    return HttpResponse.text(faker.string.nanoid());
  }),
  http.get('*/api/v1/ReleaseNotes', async () => {
    await delay('real');
    return HttpResponse.json(fakeReleaseNotes);
  }),
  http.get('*/api/v1/ReleaseNotes/GetContainerSasUri', async () => {
    await delay('real');
    return HttpResponse.text(
      `${faker.internet.url()}?${faker.string.nanoid()}`
    );
  }),
];
