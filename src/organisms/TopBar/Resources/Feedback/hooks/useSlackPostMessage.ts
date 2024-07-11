import { useMutation } from '@tanstack/react-query';

import { SLACK_POST_QUERY_KEY } from '../Feedback.const';
import { FeedbackContentType } from '../Feedback.types';
import { PortalService } from 'src/api/services/PortalService';

export function useSlackPostMessage(feedbackContent: FeedbackContentType) {
  return useMutation({
    mutationKey: [SLACK_POST_QUERY_KEY, feedbackContent],
    mutationFn: (formData: FormData) => PortalService.postmessage(formData),
  });
}
