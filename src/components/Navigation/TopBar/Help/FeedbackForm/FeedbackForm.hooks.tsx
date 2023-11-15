import { useMutation } from '@tanstack/react-query';

import {
  SERVICE_NOW_QUERY_KEY,
  SLACK_FILE_QUERY_KEY,
  SLACK_POST_QUERY_KEY,
} from './FeedbackForm.const';
import { FeedbackContentType } from './FeedbackForm.types';
import { PortalService } from 'src/api/services/PortalService';

export function useServiceNowIncidentMutation(
  feedbackContent: FeedbackContentType
) {
  return useMutation({
    mutationKey: [SERVICE_NOW_QUERY_KEY, feedbackContent],
    mutationFn: async (formData: FormData) =>
      PortalService.createIncident(formData),
  });
}
export function useSlackPostMessageMutation(
  feedbackContent: FeedbackContentType
) {
  return useMutation({
    mutationKey: [SLACK_POST_QUERY_KEY, feedbackContent],
    mutationFn: (formData: FormData) => PortalService.postmessage(formData),
  });
}
export function useSlackFileUploadMutation(
  feedbackContent: FeedbackContentType
) {
  return useMutation({
    mutationKey: [SLACK_FILE_QUERY_KEY, feedbackContent],
    mutationFn: (formData: FormData) => PortalService.fileUpload(formData),
  });
}
