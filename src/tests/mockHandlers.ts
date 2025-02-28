import {
  AmplifyApplication,
  ApplicationCategory,
  FeatureToggleDto,
  ImpersonateUserDto,
  MyFeatureDto,
  MyTutorialDto,
  ReleaseNote,
  ReleaseNoteType,
  ServiceNowIncidentResponse,
  Tutorial,
} from '@equinor/subsurface-app-management';
import { GraphAppRole } from '@equinor/subsurface-app-management/dist/api/models/GraphAppRole';
import { faker } from '@faker-js/faker';

import { environment } from 'src/atoms/utils/auth_environment';

import { delay, http, HttpResponse } from 'msw';

export const fakeReleaseNotes: ReleaseNote[] = [
  {
    releaseId: faker.string.uuid(),
    applicationName: 'PWEX',
    version: null,
    title: 'Improved task board and reporting overview June',
    body: '<h1>Release notes body text</h1><br/><br/><br/><p>Hei</p>',
    tags: [ReleaseNoteType.FEATURE, ReleaseNoteType.IMPROVEMENT],
    draft: false,
    createdDate: faker.date.past().toDateString(),
  },
  {
    releaseId: faker.string.uuid(),
    applicationName: 'Acquire',
    version: null,
    title: 'SEARCH',
    body: '<h1>Some other text</h1>',
    tags: [ReleaseNoteType.IMPROVEMENT],
    draft: false,
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
  const firstName = faker.string.uuid();
  const lastName = faker.person.lastName();
  const fullName = `${firstName} ${lastName}`;
  const uniqueName = faker.internet.username();
  const roles = faker.helpers.arrayElements(FAKE_ROLES).map((i) => i.value);

  return {
    id: faker.string.uuid(),
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

const TUTORIAL_IDS = [faker.string.uuid(), faker.string.uuid()];

export function fakeTutorial(
  id: string,
  willPopUp: boolean,
  highlightElement: boolean,
  path?: string,
  stepAmount = 9
): MyTutorialDto {
  return {
    id,
    name: faker.commerce.productName(),
    path: path ? path : '/tutorial',
    willPopUp,
    application: environment.getEnvironmentName(import.meta.env.VITE_NAME),
    steps: new Array(stepAmount).fill(0).map((_, index) => ({
      id: index.toString(),
      title: faker.vehicle.vehicle(),
      body: faker.music.artist(),
      highlightElement,
    })),
  };
}

export const FAKE_TUTORIALS = TUTORIAL_IDS.map((id, index) =>
  fakeTutorial(id, index === 0, index === 0)
);

function fakeApplication(): AmplifyApplication {
  return {
    id: faker.string.uuid(),
    name: faker.animal.dog() + faker.animal.fish(),
    adGroups: [faker.animal.cat()],
    url: faker.animal.bird(),
    accessRoles: [
      { role: faker.lorem.word(), description: faker.airline.seat() },
    ],
    description: faker.lorem.sentence(),
    longDescription: faker.animal.crocodilia(),
    contentTabs: [],
    partnerAccess: faker.datatype.boolean(),
    sponsors: [],
    category: faker.helpers.arrayElement(
      Object.values(ApplicationCategory)
    ) as ApplicationCategory,
    version: faker.string.numeric(),
    applicationInsightAPI: faker.animal.insect(),
    apI_Id: faker.animal.lion(),
    apiurl: faker.animal.snake(),
    monitored: true,
    productOwners: [faker.animal.cow()],
  };
}
export const FAKE_APPS = [
  fakeApplication(),
  fakeApplication(),
  fakeApplication(),
] as AmplifyApplication[];

export const FAKE_FEATURE_TOGGLES: MyFeatureDto[] = new Array(
  faker.number.int({ min: 2, max: 5 })
)
  .fill(0)
  .map(() => ({
    uuid: faker.string.uuid(),
    active: true,
  }));

export const tokenHandler = http.get(`*/api/v1/Token/*`, async () => {
  await delay('real');

  return HttpResponse.text(faker.lorem.word());
});

export const getTutorialImageHandler = http.get(
  `*/api/v1/Tutorial/gettutorialimage/:path`,
  async () => {
    return HttpResponse.text(
      faker.image.dataUri({ width: 1920, height: 1080 })
    );
  }
);

export const handlers = [
  getTutorialImageHandler,
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
    return HttpResponse.json(FAKE_ROLES);
  }),
  http.get('*/api/v1/ImpersonateUser/CanImpersonate', async () => {
    return HttpResponse.text('true');
  }),
  http.get('*/api/v1/ImpersonateUser/ActiveUser', async () => {
    await delay('real');
    if (!activeImpersonateUser)
      return HttpResponse.json(undefined, { status: 204 });
    return HttpResponse.json(activeImpersonateUser);
  }),
  http.post('*/api/v1/ImpersonateUser', async (resolver) => {
    const body = (await resolver.request.json()) as ImpersonateUserDto;

    fakeImpersonateUsers.push(body);

    await delay('real');
    return HttpResponse.json(body);
  }),
  http.delete(
    '*/api/v1/ImpersonateUser/DeleteImpersonationUser',
    async (resolver) => {
      await delay('real');
      const id = resolver.request.url.split('impersonationUserId=').at(-1);

      const index = fakeImpersonateUsers.findIndex((user) => user.id === id);

      if (index >= 0) {
        fakeImpersonateUsers.splice(index, 1);
      }

      return HttpResponse.text('Ok');
    }
  ),
  http.put('*/api/v1/ImpersonateUser', async (resolver) => {
    const body = (await resolver.request.json()) as ImpersonateUserDto;

    const index = fakeImpersonateUsers.findIndex(
      (user) => user.uniqueName === body.uniqueName
    );
    if (index === -1) {
      return new HttpResponse(null, { status: 204 });
    }
    fakeImpersonateUsers[index] = body;

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
      user.activeUsers.push(faker.internet.username());
      return HttpResponse.json(user);
    }

    return new HttpResponse(undefined, { status: 204 });
  }),
  http.put('*/api/v1/ImpersonateUser/StopImpersonating', async () => {
    await delay('real');

    activeImpersonateUser = undefined;

    return HttpResponse.text('Ok');
  }),
  http.get('*/api/v1/ImpersonateUser/GetImpersonateUserForApp/*', async () => {
    await delay('real');
    return HttpResponse.json(fakeImpersonateUsers);
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
  http.get('*/api/v1/ReleaseNotes/:applicationName', async () => {
    await delay('real');
    return HttpResponse.json(fakeReleaseNotes);
  }),
  http.get('*/api/v1/ReleaseNotes/getreleasenoteimage/*', async () => {
    await delay('real');
    return HttpResponse.text(
      faker.image.dataUri({ width: 1920, height: 1080 })
    );
  }),
  http.get('*/api/v1/ReleaseNotes/GetContainerSasUri', async () => {
    await delay('real');
    return HttpResponse.text(
      `${faker.internet.url()}?${faker.string.nanoid()}`
    );
  }),
  http.post('*/api/v1/ServiceNow/incident', async () => {
    await delay('real');
    return HttpResponse.json({
      sysId: faker.string.uuid(),
    } as ServiceNowIncidentResponse);
  }),
  http.post('*/api/v1/Slack/fileUpload', async (resolver) => {
    await delay('real');
    const body = (await resolver.request.formData()) as FormData;

    return HttpResponse.formData(body);
  }),
  http.post('*/api/v1/Slack/postmessage', async (resolver) => {
    await delay('real');
    const body = (await resolver.request.formData()) as FormData;

    return HttpResponse.formData(body);
  }),
  http.get('*/api/v1/AmplifyApplication/userapplications', async () => {
    await delay('real');
    return HttpResponse.json(FAKE_APPS);
  }),
  http.get(
    '*/api/v1/FeatureToggle/Amplify%20components/local/myfeatures',
    async () => {
      await delay('real');

      return HttpResponse.json(FAKE_FEATURE_TOGGLES);
    }
  ),
  http.get(`*/api/v1/Tutorial/draft/:appName`, async () => {
    await delay('real');
    return HttpResponse.json(FAKE_TUTORIALS);
  }),
];
