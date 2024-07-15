import { PortalService } from '@equinor/subsurface-app-management';
import { useMutation } from '@tanstack/react-query';

import { SLACK_POST_QUERY_KEY } from '../Feedback.const';
import { FeedbackContentType } from '../Feedback.types';

export function useSlackPostMessage(feedbackContent: FeedbackContentType) {
  return useMutation({
    mutationKey: [SLACK_POST_QUERY_KEY, feedbackContent],
    mutationFn: (formData: FormData) => PortalService.postmessage(formData),
  });
}
