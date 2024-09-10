import {
  FeatureToggleDto,
  ImpersonateUserDto,
  ReleaseNote,
  ReleaseNoteType,
  Tutorial,
} from '@equinor/subsurface-app-management';
import { GraphAppRole } from '@equinor/subsurface-app-management/dist/api/models/GraphAppRole';
import { faker } from '@faker-js/faker';

import { environment } from 'src/atoms/utils/auth_environment';

import { bypass, delay, http, HttpResponse } from 'msw';

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

export const FAKE_ROLES: GraphAppRole[] = [
  {
    allowedMemberTypes: ['fake', 'fake2'],
    description: faker.word.words(),
    displayName: faker.airline.airplane().name,
    isEnabled: true,
    origin: faker.airline.airport().name,
    id: faker.string.uuid(),
    value: 'Admin',
  },
  {
    allowedMemberTypes: ['fake', 'fake2'],
    description: faker.word.words(),
    displayName: faker.airline.airplane().name,
    isEnabled: true,
    origin: faker.airline.airport().name,
    id: faker.string.uuid(),
    value: 'Writer',
  },
  {
    allowedMemberTypes: ['fake', 'fake2'],
    description: faker.word.words(),
    displayName: faker.airline.airplane().name,
    isEnabled: true,
    origin: faker.airline.airport().name,
    id: faker.string.uuid(),
    value: 'Reader',
  },
] as const;

function fakeUser(): ImpersonateUserDto {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const fullName = `${firstName} ${lastName}`;
  const uniqueName = faker.internet.userName();
  const roles = faker.helpers.arrayElements(FAKE_ROLES).map((i) => i.value);

  return {
    firstName,
    lastName,
    fullName,
    uniqueName,
    roles,
    appName: environment.getAppName(import.meta.env.VITE_NAME),
    activeUsers: [],
  };
}

export const fakeImpersonateUsers: ImpersonateUserDto[] = [
  fakeUser(),
  fakeUser(),
  fakeUser(),
];

let activeImpersonateUser: ImpersonateUserDto | undefined = undefined;

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
  http.get(
    '*/api/v1/AmplifyApplication/application/fake-id/appRoles',
    async () => {
      await delay('real');
      return HttpResponse.json(FAKE_ROLES);
    }
  ),
  http.get('*/api/v1/ImpersonateUser/CanImpersonate', async () => {
    await delay('real');
    return HttpResponse.text('true');
  }),
  http.get('*/api/v1/ImpersonateUser/ActiveUser', async () => {
    await delay('real');
    if (!activeImpersonateUser) return HttpResponse.json(null, { status: 204 });
    return HttpResponse.json(activeImpersonateUser);
  }),
  http.post('*/api/v1/ImpersonateUser', async (resolver) => {
    const body = (await resolver.request.json()) as ImpersonateUserDto;

    fakeImpersonateUsers.push(body);

    await delay('real');
    return HttpResponse.json(body);
  }),
  http.put('*/api/v1/ImpersonateUser/StartImpersonating', async (resolver) => {
    const uniqueName = resolver.request.url.split('username=').at(-1);
    await delay('real');

    const user = fakeImpersonateUsers.find(
      (user) => user.uniqueName === uniqueName
    );
    activeImpersonateUser = user;

    if (user) {
      return HttpResponse.json(user);
    }

    return new HttpResponse(null, { status: 204 });
  }),
  http.put('*/api/v1/ImpersonateUser/StopImpersonating', async () => {
    await delay('real');

    activeImpersonateUser = undefined;

    return HttpResponse.text('Ok');
  }),
  http.get(
    '*/api/v1/ImpersonateUser/GetImpersonateUserForApp/:appName',
    async () => {
      await delay('real');
      return HttpResponse.json(fakeImpersonateUsers);
    }
  ),
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
  http.get('https://cdn.eds.equinor.com/*', ({ request }) => {
    return fetch(bypass(request));
  }),
];
