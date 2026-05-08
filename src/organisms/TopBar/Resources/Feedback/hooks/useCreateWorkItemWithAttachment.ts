import { WorkItemsService } from '@equinor/subsurface-app-management';
import { useMutation } from '@tanstack/react-query';

import { CREATE_WORK_ITEM_QUERY_KEY } from '../Feedback.const';

type CreateWorkItemParams = Parameters<
  typeof WorkItemsService.createWorkItemWithAttachment
>;

interface CreateWorkItemWithAttachmentParams {
  slackMessage: CreateWorkItemParams[0];
  attachmentMessage: CreateWorkItemParams[1];
  formData: CreateWorkItemParams[2];
}

export function useCreateWorkItemWithAttachment() {
  return useMutation({
    mutationKey: [CREATE_WORK_ITEM_QUERY_KEY],
    mutationFn: ({
      slackMessage,
      attachmentMessage,
      formData,
    }: CreateWorkItemWithAttachmentParams) =>
      WorkItemsService.createWorkItemWithAttachment(
        slackMessage,
        attachmentMessage,
        formData
      ),
  });
}
