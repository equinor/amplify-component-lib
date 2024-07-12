import { useMutation } from '@tanstack/react-query';

import { SERVICE_NOW_QUERY_KEY } from '../Feedback.const';
import { FeedbackContentType } from '../Feedback.types';
import { PortalService } from 'src/api/services/PortalService';

export function useServiceNowIncident(feedbackContent: FeedbackContentType) {
  return useMutation({
    mutationKey: [SERVICE_NOW_QUERY_KEY, feedbackContent],
    mutationFn: async (formData: FormData) =>
      PortalService.createIncident(formData),
  });
}
