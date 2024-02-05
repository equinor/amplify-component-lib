import { useQuery } from '@tanstack/react-query';

import { TutorialService } from '../../api/services/TutorialService';
import { environment } from '../../utils';

const { getAppName } = environment;

export const useGetTutorialsForApp = () => {
  const appName = getAppName(import.meta.env.VITE_NAME);
  return useQuery({
    queryKey: ['', appName],
    queryFn: () => TutorialService.getTutorialsForApplication(appName),
  });
};
