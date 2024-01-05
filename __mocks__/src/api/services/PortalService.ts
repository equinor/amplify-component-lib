export class PortalService {
  public static userApplications() {
    console.log('hello');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'e90e27a6-0352-473a-8bf0-122ee653dc98',
            name: 'Dasha',
            adGroups: [
              'd836994e-c823-46de-ad37-e0014d576ff4',
              '75492d9c-a328-4753-b245-47d247eb80d2',
              '4c49913a-cffb-4462-81e6-b166b0968893',
              'cf197e73-12fe-46f0-b59a-be9eb388e344',
              '951aad9d-b14a-416c-a4eb-b449c1bab1e7',
              '4cb64e11-cc97-45b6-8922-7f94493bd444',
              'f89b304e-e08b-45e0-a2eb-ffc7d191a929',
              '790fbcea-7187-4aff-9608-8db0dc1fef90',
              '52d6eff6-ef6f-4078-b159-e0d7bcf46527',
              '33c3f9d5-9c30-4eea-8de1-fcd40bb02d72',
              '72780911-4c49-41ae-ad6f-486daec3b600',
              '62f0a51c-901d-47ac-96f7-3a1ca2b738bb',
            ],
            url: 'https://dasha.equinor.com',
            accessRoles: [
              {
                role: 'Johan Sverdrup User (Dasha)',
                description: 'User access Dasha',
              },
              {
                role: 'Johan Sverdrup Publisher (Dasha)',
                description: 'Publisher access Dasha',
              },
            ],
            description:
              'Allow users and clients to access and download data related to their projects.',
            longDescription:
              'Dasha is the new way of sharing large data packages with licence partners.\nPreviously large data packages (too large to be shared via L2S, which is the formal licence communication software) were shared via the ftp-server. The challenges with this solution were that the data were available only for a limited amount of time, it was difficult to track what was shared, and also difficult to track who had access to the ftp password.\nWith Dasha, the data is always available and it is easy to keep track of what has been shared at what time. The access control is also highly improved.',
            category: 'Collaboration',
            version: '1.0.0',
            applicationInsightAPI: '00eef4ab-326f-4fd8-8acb-6b39d88a9d81',
            apI_Id: '23b07c34-ab93-4acf-968f-ba710a23f0b5',
            apiurl: 'https://dasha-api-dasha-test.radix.equinor.com/',
            monitored: true,
            productOwners: ['elbra@equinor.com'],
          },
          {
            id: '7d5ac98a-abc6-46ed-b66c-42d9c19cde27',
            name: 'Recap',
            adGroups: [
              '70d2039c-ce9e-4b19-b749-87e3c4074a6f',
              '7dcbfef2-42e4-4d8f-acb7-694e27c1a2e4',
              'cfc46bd7-bb60-4a23-94b3-96aaed2b3fce',
              'ed4ba24b-a476-4888-b4ef-0c3526dd5ea1',
              '16ba9ef5-33d1-46c2-813d-3748c542bcef',
              '0b843b1a-0d2a-46c1-a775-829ec9ea4705',
              'b50ef0f0-f2d3-4372-ab30-12d46a02a6ab',
              'c048abbc-395e-4403-82ac-d85ceb2cd74a',
            ],
            url: 'https://recap.equinor.com',
            accessRoles: [
              {
                role: 'Johan Sverdrup - Write (RECAP)',
                description: 'Write access',
              },
              {
                role: 'Johan Sverdrup - Read (RECAP)',
                description: 'Read access',
              },
            ],
            description: 'Get a complete overview of the well data process.',
            longDescription:
              'The Recap application sets out to allow users to access a complete overview of the well data process. All the way from data gathering to sharing and reporting data with the NPD authorities. <br /> <br />This application will replace current spreadsheet and PDF solutions. Saving time, ensuring data backup, and consistent and correct status overview for the team.',
            category: 'Planning',
            version: '1.0.0',
            applicationInsightAPI: '0e48eee8-0d76-48be-a7c6-cca96097b963',
            apI_Id: '603e6ffc-3cce-4e42-8007-992453cdaba3',
            apiurl: 'https://api-dart-development.radix.equinor.com',
            monitored: true,
            productOwners: ['orber@equinor.com'],
          },
          {
            id: '797959d3-e34e-47eb-9ae2-96af4ab61e93',
            name: '4DInsight',
            adGroups: [
              '73c72041-81c9-49d5-82db-39d221a2194d',
              '476bda73-82be-4df5-9fbb-05bdd503765f',
              'c01895c5-1dfa-4d11-aa1e-20916b09345f',
              '53c8eb0c-50be-4cd6-8a3f-9c5ba4082fa8',
            ],
            url: 'https://4dinsight.equinor.com',
            accessRoles: [
              {
                role: 'SUBSURFACE DATA LAKE (Johan sverdrup)',
                description: 'Access to subsurface data on behaf of user',
              },
            ],
            description:
              'Create workspaces and make observations of seismic maps.',
            longDescription:
              '4DInsight is a new tool used to capture and retrieve information and actions about 4D observations. All observations related to 4D time seismic differences are stored in specific workspaces with a set of metadata (e.g. 4D time interval, 4D attribute, geological formation, type of effect, etc.). The goal is that this should be a multi-disclipinary tool that can give a comprehensive overview and understanding of all observed 4D effects by extensive search and filter options.',
            category: 'Development',
            version: '',
            applicationInsightAPI: '8fbce56f-14d9-4bb3-a20f-2c07436acb0e',
            apI_Id: 'dca4753f-03fa-4b9d-9a14-c144b93df73b',
            apiurl: 'https://api-desert-development.radix.equinor.com',
            monitored: false,
            productOwners: ['ashska@equinor.com'],
          },
          {
            id: '85e46d17-7a97-44a5-8fbf-f9efd456fbde',
            name: 'Acquire',
            adGroups: [
              '73c72041-81c9-49d5-82db-39d221a2194d',
              '476bda73-82be-4df5-9fbb-05bdd503765f',
              'c01895c5-1dfa-4d11-aa1e-20916b09345f',
              '53c8eb0c-50be-4cd6-8a3f-9c5ba4082fa8',
            ],
            url: 'https://acquire.equinor.com',
            accessRoles: [
              {
                role: 'fg_WellDataAcquisition_Prod_Reader',
                description: 'Read access',
              },
              {
                role: 'fg_WellDataAcquisition_Prod_Writer',
                description: 'Write access',
              },
            ],
            description:
              'Create program lists for detailed well concepts and planning.',
            longDescription:
              'Acquire is an application to create and store log data acquisition program along entire well construction process, after drilling. It allows to save time, harmonize working process and avoid misunderstandings. It is cloud based: data easily accessible across applications, disciplines and assets, which allows all cross disciplinary team to be on one page all the time by visulation the program in the POZO app during well planning.',
            category: 'Planning',
            version: '1.0.0',
            applicationInsightAPI: 'e1c302ea-3f35-4c7d-bab3-d0522260a5fd',
            apI_Id: 'c9e00386-1caf-43fd-812d-ab85337ce4e8',
            apiurl: 'https://api-acquire-development.radix.equinor.com',
            monitored: true,
            productOwners: ['brif@equinor.com'],
          },
          {
            id: '59dfc1d0-7af4-4db7-8446-0ce9dbfa17e4',
            name: 'PWEX',
            adGroups: [
              '22504e2c-db62-458f-9f7c-795ef8de50b3',
              '1b88bd6e-7d97-4528-9903-7a6d3264c558',
              '04dc271d-5deb-4816-978b-eb7ce93f4924',
              '04dc271d-5deb-4816-978b-eb7ce93f4924',
              '04dc271d-5deb-4816-978b-eb7ce93f4924',
              '04dc271d-5deb-4816-978b-eb7ce93f4924',
              '69b38745-5f5c-4ed5-84d4-3d493f2c986c',
              '1a52fd11-58d6-4f1b-840e-a86f3169cc7f',
              '2bb11cbd-9514-4149-b435-c3b1341b3f4b',
              '0161abb6-17b3-4be1-a55e-bef114e4af9FOTON',
            ],
            url: 'https://pwex.equinor.com/',
            accessRoles: [
              {
                role: '',
                description: '',
              },
            ],
            description: 'Capture and search within well experiences',
            longDescription:
              'PWEX is a new way of capturing experiences from wells. The experiences are written by the all subsurface disciplines involved in the wellplanning, operational follow up, and production follow up. A search is facilitated by tagging the experiences with meta data. Figures and text is easy to load up, and easy to see. Experiences cover the full life of the well, both well construction and well life cycle. The app is tailored for knowledge transfer. This replaces various powerpoints and exel sheets, provIde one storage place, and one place to search. In Johan Sverdrup the app is shared with the partnership. A QA workflow is included in the app.',
            category: 'Planning',
            version: '1.0.0',
            applicationInsightAPI: '3106fc96-e9bb-4cd2-a12c-86b3a05ea432',
            apI_Id: 'f165eb61-585e-4f08-a789-b4a8a0327252',
            apiurl: 'https://api-pwex-api-dev.radix.equinor.com',
            monitored: true,
            productOwners: ['ebro@equinor.com'],
          },
          {
            id: '5cb47404-735d-4994-b5fb-1d0178c1447d',
            name: 'Orca',
            adGroups: [
              'd6362b70-5aed-4722-8b47-bfcc8f587969',
              'd6362b70-5aed-4722-8b47-bfcc8f587969',
              '1b8dd87a-c657-4174-b702-634b79708cbe',
              '1b8dd87a-c657-4174-b702-634b79708cbe',
              '0aa29f24-9a51-40a3-96fd-aeb3e23547e5',
              '2425f35c-ed27-47f2-91f2-4a2cc755ef1a',
              'a8b3e2b1-3be4-43f4-83a5-2ef002474c4a',
            ],
            url: 'https://client-depthconversion-development.radix.equinor.com',
            accessRoles: [
              {
                role: 'SUBSURFACE DATA LAKE (Johan sverdrup)',
                description: 'Access to subsurface data on behaf of user',
              },
              {
                role: 'Reviewer',
                description: 'Create and approve branch',
              },
              {
                role: 'User',
                description: 'Create branch',
              },
            ],
            description:
              'Tool facilitates depth conversions of seismic horizons ',
            longDescription:
              'The Depth Conversion Data Flow (DCDF) tool facilitates depth conversions of seismic horizons via multiple methods. \n The aim is to provide user friendly access to depth conversions and connect to different databases in order to source and export data.',
            category: 'Development',
            version: '',
            applicationInsightAPI: '0dd0af9b-0272-4069-8350-0cbe524bf827',
            apI_Id: '0df77003-f17c-40d8-82af-18f1bffc6f96',
            apiurl: 'https://api-depthconversion-development.radix.equinor.com',
            monitored: true,
            productOwners: ['sdu@equinor.com'],
          },
          {
            id: '72791695-9572-47ae-b3e3-07fa7c4b452b',
            name: 'InPress',
            adGroups: [
              'a636269f-a967-45b2-bb4e-3e02dbb624a2',
              'a129ea2d-8613-4d40-87b7-e4c8d1ea3b4f',
              '19094b8f-6ebd-4298-b5e5-a3241329886a',
              '71bd3203-d998-47c2-b428-af0befc3dfac',
              'be5e4954-041c-417d-b4c3-efd7f34c2889',
              'd6fe6c26-baee-4f09-9327-e51e8a484300',
              '5fab89a8-1b59-49c4-b7bd-5ebcb02e9df6',
              '009d00eb-af77-43aa-96a9-48b4e19f9054',
              'ed0bf28f-b1c8-41c1-8230-76a34664c3bd',
              '6ac247f5-527c-4ef9-be65-dcbb347be3ad',
              '37c9a87a-f471-4f29-85ea-d9b158d027a2',
              '58c6102b-25d5-462b-8db1-877cfb831e27',
              '73c72041-81c9-49d5-82db-39d221a2194d',
            ],
            url: 'https://client-pressureviz-development.radix.equinor.com',
            accessRoles: [],
            description:
              'Pressure data visualization tool from PressureDB, PDM, EC and PVT optimized datasets',
            longDescription:
              'Pressure data visualization tool from PressureDB, PDM, EC and PVT optimized datasets',
            category: 'Development',
            version: '1.0.2',
            applicationInsightAPI: '888fb3d0-3721-4df3-ab7b-6e4606c36146',
            apI_Id: 'ca5a2b49-f24f-485f-8633-47cb79e694dd',
            apiurl: 'https://api-pressureviz-development.radix.equinor.com/',
            monitored: true,
            productOwners: ['HAVL@equinor.com'],
          },
        ]);
      }, 1000);
    });
  }
}

export function decorator(story: any) {
  console.log(story(), 'story');
  return story();
}
