import {
  AmplifyApplication,
  ApplicationCategory,
  FaqCategoriesWithFaqDto,
  FeatureToggleDto,
  ImpersonateUserDto,
  MyFeatureDto,
  MyTutorialDto,
  ReleaseNote,
  ReleaseNoteType,
  ServiceNowIncidentResponse,
  Tutorial,
} from '@equinor/subsurface-app-management';
import { faker } from '@faker-js/faker';

import { Field } from 'src/atoms/types/Field';
import { environment } from 'src/atoms/utils/auth_environment';

import { delay, http, HttpResponse, RequestHandler } from 'msw';

export const fakeReleaseNotes: ReleaseNote[] = [
  {
    releaseId: faker.string.uuid(),
    applicationName: 'PWEX',
    version: null,
    title: faker.commerce.productName(),
    body: `<h5>Release notes body text</h5><p>${faker.lorem.paragraphs(6)}</p>`,
    tags: [ReleaseNoteType.FEATURE, ReleaseNoteType.IMPROVEMENT],
    draft: false,
    createdDate: faker.date.past().toISOString(),
    releaseDate: new Date().toISOString(),
  },
  {
    releaseId: faker.string.uuid(),
    applicationName: 'Acquire',
    version: null,
    title: faker.commerce.productName(),
    body: `<h5>Release notes body text</h5><p>${faker.lorem.paragraphs(6)}</p>`,
    tags: [ReleaseNoteType.IMPROVEMENT],
    draft: false,
    createdDate: faker.date.past().toISOString(),
  },
];

export const FAKE_ROLES = [
  {
    allowedMemberTypes: ['fake', 'fake2'],
    description: faker.word.words(),
    displayName: `${faker.airline.airplane().name} ${faker.airline.airplane().iataTypeCode}`,
    isEnabled: true,
    origin: faker.airline.airport().name,
    id: faker.string.uuid(),
    value: 'Admin',
  },
  {
    allowedMemberTypes: ['fake', 'fake2'],
    description: faker.word.words(),
    displayName: `${faker.airline.airplane().name} ${faker.airline.airplane().iataTypeCode}`,
    isEnabled: true,
    origin: faker.airline.airport().name,
    id: faker.string.uuid(),
    value: 'Writer',
  },
  {
    allowedMemberTypes: ['fake', 'fake2'],
    description: faker.word.words(),
    displayName: `${faker.airline.airplane().name} ${faker.airline.airplane().iataTypeCode}`,
    isEnabled: true,
    origin: faker.airline.airport().name,
    id: faker.string.uuid(),
    value: 'Reader',
  },
] as const;

export const FAKE_FIELDS: Field[] = [
  {
    country: faker.location.country(),
    name: faker.location.continent(),
    uuid: faker.location.city(),
  },
] as const;

export const FAKE_WELLS: string[] = [faker.location.zipCode()] as const;

function fakeUser(): ImpersonateUserDto {
  const firstName = faker.string.uuid();
  const lastName = faker.person.lastName();
  const fullName = `${firstName} ${lastName}`;
  const uniqueName = faker.internet.username();
  const email = faker.internet.email();
  const field = FAKE_FIELDS[0].name;
  const well = FAKE_WELLS[0];
  const roles = faker.helpers.arrayElements(FAKE_ROLES).map((i) => i.value);

  return {
    id: faker.string.uuid(),
    firstName,
    lastName,
    fullName,
    email,
    uniqueName,
    field,
    well,
    roles: [...roles, 'other'],
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

export function fakeTutorial({
  id,
  willPopUp,
  highlightElement,
  path,
  stepAmount = 9,
}: {
  id: string;
  willPopUp: boolean;
  highlightElement: boolean;
  path?: string;
  stepAmount?: number;
}): MyTutorialDto {
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
  fakeTutorial({ id, willPopUp: index === 0, highlightElement: index === 0 })
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

export const FAKE_FAQ_CATEGORIES = new Array(
  faker.number.int({ min: 2, max: 4 })
)
  .fill(0)
  .map((_, index) => ({
    id: index,
    categoryName: faker.commerce.productName(),
    orderBy: index < 2 ? undefined : index,
    applicationId: faker.string.uuid(),
    faqs: new Array(faker.number.int({ min: 2, max: 4 }))
      .fill(0)
      .map((_, faqIndex) => ({
        id: faqIndex,
        question: faker.commerce.productDescription() + '?',
        answer: `${index}${faqIndex}` + faker.lorem.paragraph(),
        visible: true,
        orderBy: faqIndex < 2 ? undefined : faqIndex,
        roles: [],
        faqCategoryId: 1,
        createdDate: faker.date.past().toISOString(),
        updatedDate: faker.date.recent().toISOString(),
      })),
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
  http.get('*/api/v1/Application/application/*/appRoles', async () => {
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
  http.get('*/api/v1/Application/userapplications', async () => {
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
  http.get('*/missing-data', async () => {
    await delay('real');
    return HttpResponse.text('missing', { status: 404 });
  }),
  http.get('*/failing-data', async () => {
    await delay('real');
    return HttpResponse.text('failed', { status: 500 });
  }),
  http.get('*/v1/Faq/faqcategorieswithfaqs/:appName', async () => {
    await delay('real');
    return HttpResponse.json(FAKED_FAQ_CATEGORIES_WITH_FAQS);
  }),
];

export const FAKED_FAQ_CATEGORIES_WITH_FAQS: FaqCategoriesWithFaqDto[] = [
  {
    id: 1,
    fkParentCategoryId: 0,
    categoryName: 'Getting Started',
    visible: true,
    applicationId: '1',
    orderBy: 1,
    faqs: [
      {
        id: 1,
        categoryId: 1,
        question: `How do I log in for the first time?`,
        answer: `<p>Navigate to ${faker.internet.url()} and use your company credentials. If you're having trouble, make sure caps lock is off - it happens to the best of us!</p>`,
        visible: true,
        orderBy: 1,
        createdDate: faker.date.past({ years: 1 }).toISOString(),
      },
      {
        id: 2,
        categoryId: 2,
        question: 'What browsers work best?',
        answer: `<p>We recommend using the latest version of ${faker.helpers.arrayElement(['Chrome', 'Firefox', 'Edge', 'Safari'])}. Really any modern browser should work fine.</p>`,
        visible: true,
        orderBy: 2,
        createdDate: faker.date.past({ years: 1 }).toISOString(),
      },
      {
        id: 3,
        categoryId: 3,
        question: 'Where can I find the user guide?',
        answer: `<p>Check out the documentation at ${faker.system.directoryPath()}/docs or click the Help icon in the top menu. There's also video tutorials if you prefer watching over reading.</p>`,
        visible: true,
        orderBy: 3,
        createdDate: faker.date.past({ years: 1 }).toISOString(),
      },
    ],
    subCategories: [
      {
        id: 2,
        fkParentCategoryId: 1,
        categoryName: 'Profile Setup',
        visible: true,
        applicationId: '1',
        orderBy: 1,
        faqs: [
          {
            id: 4,
            categoryId: 2,
            question: 'Can I use a custom avatar?',
            answer: `<p>Yes! Upload any ${faker.system.fileExt()} image up to 5MB. Pro tip: photos work better than abstract art for helping colleagues recognize you.</p>`,
            visible: true,
            orderBy: 1,
            createdDate: faker.date.past({ years: 1 }).toISOString(),
          },
          {
            id: 5,
            categoryId: 2,
            question: 'How do I change my notification preferences?',
            answer: `<p>Go to Settings > Notifications and customize what you want to hear about. You can choose email, ${faker.helpers.arrayElement(['SMS', 'push notifications', 'carrier pigeon'])}, or both.</p>`,
            visible: true,
            orderBy: 2,
            createdDate: faker.date.past({ years: 1 }).toISOString(),
          },
        ],
      },
    ],
  },
  {
    id: 3,
    fkParentCategoryId: 0,
    categoryName: 'Working with Data',
    visible: true,
    applicationId: '1',
    orderBy: 2,
    faqs: [
      {
        id: 6,
        categoryId: 6,
        question: 'What file formats can I import?',
        answer: `<p>We support CSV, Excel, JSON, and ${faker.system.fileExt().toUpperCase()} files. Maximum file size is ${faker.number.int({ min: 100, max: 500 })}MB. Larger files should be split or compressed first.</p>`,
        visible: true,
        orderBy: 1,
        createdDate: faker.date.past({ years: 1 }).toISOString(),
      },
      {
        id: 7,
        categoryId: 7,
        question: 'How long does data processing take?',
        answer: `<p>Most imports finish in ${faker.number.int({ min: 2, max: 10 })} minutes. Larger datasets might take up to an hour. You'll get an email notification when it's done.</p>`,
        visible: true,
        orderBy: 2,
        createdDate: faker.date.past({ years: 1 }).toISOString(),
      },
    ],
    subCategories: [
      {
        id: 12,
        fkParentCategoryId: 3,
        categoryName: 'Empty',
        visible: true,
        applicationId: '1',
        orderBy: 8,
      },
      {
        id: 4,
        fkParentCategoryId: 3,
        categoryName: 'Exporting Data',
        visible: true,
        applicationId: '1',
        orderBy: 1,
        faqs: [
          {
            id: 8,
            categoryId: 4,
            question: 'Can I schedule automatic exports?',
            answer: `<p>Absolutely! Set up scheduled exports in the ${faker.hacker.noun()} section. Choose daily, weekly, or monthly intervals. Exports are saved to ${faker.system.directoryPath()}/exports.</p>`,
            visible: true,
            orderBy: 1,
            createdDate: faker.date.past({ years: 1 }).toISOString(),
          },
        ],
      },
      {
        id: 5,
        fkParentCategoryId: 3,
        categoryName: 'Data Validation',
        visible: true,
        applicationId: '1',
        orderBy: 2,
        faqs: [
          {
            id: 9,
            categoryId: 5,
            question: 'What validation checks are performed?',
            answer: `<p>We check for ${faker.number.int({ min: 15, max: 50 })} different data quality rules including format consistency, required fields, and ${faker.hacker.ingverb()} patterns. Results appear in the validation dashboard.</p>`,
            visible: true,
            orderBy: 1,
            createdDate: faker.date.past({ years: 1 }).toISOString(),
          },
          {
            id: 10,
            categoryId: 5,
            question: 'Can I create custom validation rules?',
            answer: `<p>Yes! Premium users can define custom rules using our ${faker.hacker.adjective()} rule builder. Contact ${faker.internet.email()} for access.</p>`,
            visible: true,
            orderBy: 2,
            createdDate: faker.date.past({ years: 1 }).toISOString(),
          },
        ],
      },
    ],
  },
  {
    id: 6,
    fkParentCategoryId: 0,
    categoryName: 'Troubleshooting',
    visible: true,
    applicationId: '1',
    faqs: [
      {
        id: 11,
        categoryId: 6,
        question: 'Why is the page loading slowly?',
        answer: `<p>Try clearing your cache first. If that doesn't help, check your connection speed - we need at least ${faker.number.int({ min: 5, max: 20 })} Mbps. Also close unused tabs, especially if you have ${faker.number.int({ min: 20, max: 50 })} of them open.</p>`,
        visible: true,
        orderBy: 1,
        createdDate: faker.date.past({ years: 0.5 }).toISOString(),
      },
      {
        id: 13,
        categoryId: 6,
        question: 'I got error code 404. What now?',
        answer: `<p>Error 404 means the page wasn't found. Double-check the URL or try navigating from the home page. If you got here by clicking a link, let us know at ${faker.internet.email()}.</p>`,
        visible: true,
        orderBy: 2,
        createdDate: faker.date.past({ years: 0.5 }).toISOString(),
      },
    ],
  },
  {
    id: 7,
    fkParentCategoryId: 0,
    categoryName: 'Security & Access',
    visible: true,
    applicationId: '1',
    orderBy: 4,
    faqs: [
      {
        id: 15,
        categoryId: 7,
        question: 'How do I reset my password?',
        answer: `<p>Click "Forgot Password" on the login page. You'll receive a reset link at ${faker.internet.email()}. The link expires in ${faker.number.int({ min: 15, max: 60 })} minutes for security.</p>`,
        visible: true,
        orderBy: 1,
        createdDate: faker.date.past({ years: 0.25 }).toISOString(),
      },
      {
        id: 14,
        categoryId: 7,
        question: 'Is two-factor authentication available?',
        answer: `<p>Yes! Enable it in Settings > Security. Use an authenticator app like ${faker.helpers.arrayElement(['Google Authenticator', 'Microsoft Authenticator', 'Authy'])} for the best experience. SMS codes are also available.</p>`,
        visible: true,
        orderBy: 2,
        createdDate: faker.date.past({ years: 0.25 }).toISOString(),
      },
    ],
  },
  {
    id: 8,
    fkParentCategoryId: 0,
    categoryName: 'Empty',
    visible: true,
    applicationId: '1',
  },
];

export const getMockedFaqCategoriesWithFaqs: RequestHandler = http.get(
  '*/v1/Faq/faqcategorieswithfaqs/*',
  () => {
    return HttpResponse.json(FAKED_FAQ_CATEGORIES_WITH_FAQS);
  }
);
