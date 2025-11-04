import { FaqService } from '@equinor/subsurface-app-management';
import { faker } from '@faker-js/faker';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

export type FaqDto = {
  id: number;
  question?: string | null;
  answer?: string | null;
  visible?: boolean | null;
  orderBy?: number | null;
  roles?: Array<string> | null;
  categoryId: number;
  updatedDate?: string | null;
  createdDate?: string | null;
};

export type FaqCategoryDto = {
  id: number;
  fkParentCategoryId?: number | null;
  visible: boolean;
  categoryName: string;
  orderBy: number;
  applicationId: string;
  updatedDate?: string | null;
  createdDate?: string | null;
  subCategories?: Array<FaqCategoryDto> | null;
};

export type FaqCategoriesWithFaqDto = {
  id: number;
  fkParentCategoryId: number;
  categoryName: string;
  orderBy?: number | null;
  visible: boolean;
  applicationId: string;
  faqs?: Array<FaqDto> | null;
  updatedDate?: string | null;
  createdDate?: string | null;
  subCategories?: Array<FaqCategoriesWithFaqDto> | null;
};

export type AmplifyApplicationInfoDto = {
  id: string;
  name: string;
  updatedBy?: string | null;
  updatedByName?: string | null;
  updatedDate?: string | null;
  createdBy?: string | null;
  createdByName?: string | null;
  createdDate: string;
  url: string;
  monitored: boolean;
  isInternalAmplifyApplication?: boolean | null;
};

export type Resource = {
  resourceName: string;
  status: string;
  message: string;
};

export type ApplicationHealth = {
  applicationName: string;
  requestDate: string;
  readonly resources: Array<Resource>;
};

export type ApplicationFailCount = {
  applicationId: string;
  applicationName: string;
  failedCount: Array<FailedCount>;
};

export type FailedCount = {
  timeStamp: string;
  resultCode: string;
  count?: string | null;
};

type ApplicationTypes =
  | AmplifyApplicationInfoDto
  | ApplicationHealth
  | ApplicationFailCount;

export const GET_FAQ_CATEGORIES_WITH_FAQS = 'getFaqCategoriesWithFaqs';
export const ALL_APPLICATIONS = 'allApplications';
export const APP_INFO = 'query-appinfo';

export function faqInSearch(
  faq: Pick<FaqDto, 'answer' | 'question'>,
  searchValue: string
) {
  const lowerCase = searchValue.toLowerCase();

  if (!faq.answer || !faq.question) return false;

  return (
    faq.answer.toLowerCase().includes(lowerCase) ||
    faq.question.toLowerCase().includes(lowerCase)
  );
}

export function sortApplications(
  a: ApplicationTypes,
  b: ApplicationTypes
): number {
  const first = 'name' in a ? a.name : a.applicationName;
  const second = 'name' in b ? b.name : b.applicationName;

  return first.localeCompare(second);
}

export function useAllApplications(args?: { filterMonitored: boolean }) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [ALL_APPLICATIONS, args?.filterMonitored],
    queryFn: async () => {
      // const allApplications = await ApplicationService.getAllApplications();
      const allApplications: AmplifyApplicationInfoDto[] = [
        {
          id: '1',
          name: 'Mock Application',
          createdDate: new Date().toISOString(),
          monitored: true,
          url: 'https://example.com',
        },
        {
          id: '2',
          name: 'Another Application',
          createdDate: new Date().toISOString(),
          monitored: false,
          url: 'https://example.org',
        },
      ];

      // Update query cache
      for (const application of allApplications) {
        queryClient.setQueryData([APP_INFO, application.id], application);
      }

      const sorted = allApplications.toSorted(sortApplications);

      if (args?.filterMonitored) return sorted.filter((app) => app.monitored);
      return sorted;
    },
    gcTime: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 60,
  });
}

export function faqOrderBy(
  a: FaqDto | FaqCategoryDto | FaqCategoriesWithFaqDto,
  b: FaqDto | FaqCategoryDto | FaqCategoriesWithFaqDto
) {
  const aOrder = a.orderBy ?? -1;
  const bOrder = b.orderBy ?? -1;

  return aOrder - bOrder;
}

export function useAppIdToAppName(overrideAppId?: string) {
  const { appId } = useParams({ strict: false });
  console.log('appid', appId);
  const { data } = useAllApplications();

  const usingAppId = overrideAppId ?? appId;

  if (!data || !usingAppId) return;

  return data.find((app) => app.id.toLowerCase() === usingAppId.toLowerCase())
    ?.name;
}

export function useFaqCategoriesWithFaqs() {
  const applicationName = useAppIdToAppName();

  return useQuery({
    queryKey: [GET_FAQ_CATEGORIES_WITH_FAQS, applicationName],
    queryFn: async () => {
      // const categories =
      //   await FaqService.getCategoriesWithFaqsFromApplicationName(
      //     applicationName ?? ''
      //   );
      const categories: FaqCategoriesWithFaqDto[] = [
        {
          id: 1,
          fkParentCategoryId: 0,
          categoryName: 'General',
          visible: true,
          applicationId: '1',
          orderBy: 1,
          faqs: [
            {
              id: 1,
              categoryId: 1,
              question: 'What is this?',
              answer: 'This is a mock FAQ answer.',
              visible: true,
              orderBy: 1,
              createdDate: faker.date.past().toDateString(),
            },
            {
              id: 2,
              categoryId: 1,
              question: 'How does it work?',
              answer: 'It works like this.',
              visible: true,
              orderBy: 2,
              createdDate: faker.date.past().toDateString(),
            },
          ],
        },
        {
          id: 2,
          fkParentCategoryId: 0,
          categoryName: 'Technical',
          visible: true,
          applicationId: '1',
          orderBy: 2,
          faqs: [
            {
              id: 3,
              categoryId: 2,
              question: 'What technologies are used?',
              answer: 'Various modern web technologies are used.',
              visible: true,
              orderBy: 1,
              createdDate: faker.date.past().toDateString(),
            },
          ],
        },
      ];

      for (const category of categories) {
        category.faqs?.sort(faqOrderBy);
      }

      return categories.toSorted(faqOrderBy);
    },
    // enabled: applicationName !== undefined,
  });
}
