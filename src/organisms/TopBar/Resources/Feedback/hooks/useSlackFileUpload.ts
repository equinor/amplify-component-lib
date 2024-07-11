import { useMutation } from '@tanstack/react-query';

import { SLACK_FILE_QUERY_KEY } from '../Feedback.const';
import { FeedbackContentType } from '../Feedback.types';
import { PortalService } from 'src/api/services/PortalService';

export function useSlackFileUpload(feedbackContent: FeedbackContentType) {
  return useMutation({
    mutationKey: [SLACK_FILE_QUERY_KEY, feedbackContent],
    mutationFn: (formData: FormData) => PortalService.fileUpload(formData),
  });
}
