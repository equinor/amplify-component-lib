/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ServiceNowIncidentAttachmentResponse } from './ServiceNowIncidentAttachmentResponse';

export type ServiceNowIncidentResponse = {
  number?: string | null;
  assignmentGroup?: string | null;
  configurationItem?: string | null;
  title?: string | null;
  description?: string | null;
  caller?: string | null;
  state?: string | null;
  urgency?: string | null;
  sysId?: string | null;
  attachmentResponse?: ServiceNowIncidentAttachmentResponse;
};
