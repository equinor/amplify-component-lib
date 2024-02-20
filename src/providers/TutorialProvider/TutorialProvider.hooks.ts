import { useQuery } from '@tanstack/react-query';

import {
  GET_TUTORIALS_FOR_APP,
  GET_TUTORIALS_SAS_TOKEN,
} from './TutorialProvider.const';
import { TutorialService } from 'src/api/services/TutorialService';
import { environment } from 'src/utils';

const { getAppName } = environment;

export const useGetTutorialsForApp = () => {
  const appName = getAppName(import.meta.env.VITE_NAME);
  return useQuery({
    queryKey: [GET_TUTORIALS_FOR_APP, appName],
    queryFn: () => TutorialService.getTutorialsForApplication(appName),
  });
};
export const useGetTutorialSasToken = () => {
  return useQuery({
    queryKey: [GET_TUTORIALS_SAS_TOKEN],
    queryFn: () => TutorialService.getTutorialSasToken(),
  });
};