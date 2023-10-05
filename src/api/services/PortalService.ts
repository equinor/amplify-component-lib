/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../';
import { request as __request, FeatureToggleDto } from '../';

import { OpenAPI_Portal, OpenAPI_Portal_Prod } from '../core/OpenAPI';
import { ServiceNowIncidentResponse } from 'src/api/models/ServiceNowIncidentResponse';

export class PortalService {
  // ConfigurationItem: string;
  // Title: string;
  // Description: string;
  // CallerEmail: string;
  // urgency?: ServiceNowUrgency;
  // Image?: Blob;

  /**
   * Creates a incident report in service now
   * @param formData
   * @returns any Success
   * @throws ApiError
   */
  public static createIncident(
    formData?: FormData
  ): CancelablePromise<ServiceNowIncidentResponse> {
    return __request(OpenAPI_Portal, {
      method: 'POST',
      url: '/api/v1/ServiceNow/incident',
      body: formData,
    });
  }

  /**
   * Uploads file to slack and links it to a channel defined in config
   * @param formData
   * @returns any Success
   * @throws ApiError
   */

  public static fileUpload(formData?: FormData): CancelablePromise<any> {
    return __request(OpenAPI_Portal, {
      method: 'POST',
      url: '/api/v1/Slack/fileUpload',
      body: formData,
    });
  }

  /**
   * Posts a slack message to channel defined in config
   * @param formData
   * @returns any Success
   * @throws ApiError
   */

  public static postmessage(formData?: FormData): CancelablePromise<any> {
    return __request(OpenAPI_Portal, {
      method: 'POST',
      url: '/api/v1/Slack/postmessage',
      body: formData,
    });
  }

  /**
   * Gets a Feature Toggle from Application name
   * @param applicationName name
   * @returns FeatureToggleDto Success
   * @throws ApiError
   */

  public static getFeatureToggleFromApplicationName(
    applicationName: string
  ): CancelablePromise<FeatureToggleDto> {
    return __request(OpenAPI_Portal_Prod, {
      method: 'GET',
      url: '/api/v1/FeatureToggle/{applicationName}',
      path: {
        applicationName: applicationName,
      },
      errors: {
        400: `Bad Request`,
        404: `Not Found`,
        500: `Server Error`,
      },
    });
  }
}
