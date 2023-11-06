import { useMutation } from '@tanstack/react-query';

import { FeedbackContentType } from './FeedbackForm.types';
import { PortalService } from 'src/api/services/PortalService';

export function useServiceNowIncidentMutation(
  feedbackContent: FeedbackContentType
) {
  return useMutation({
    mutationKey: ['serviceNowIncident', feedbackContent],
    mutationFn: async (formData: FormData) =>
      PortalService.createIncident(formData),
  });
}
export function useSlackPostMessageMutation(
  feedbackContent: FeedbackContentType
) {
  return useMutation({
    mutationKey: ['slackPostMessage', feedbackContent],
    mutationFn: (formData: FormData) => PortalService.postmessage(formData),
  });
}
export function useSlackFileUploadMutation(
  feedbackContent: FeedbackContentType
) {
  return useMutation({
    mutationKey: ['slackFileUpload', feedbackContent],
    mutationFn: (formData: FormData) => PortalService.fileUpload(formData),
  });
}
