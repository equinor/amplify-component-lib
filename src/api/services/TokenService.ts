/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TokenService {
  /**
   * @returns string Success
   * @throws ApiError
   */
  public static getAmplifyPortalToken(): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/Token/AmplifyPortal',
    });
  }

  /**
   * @returns string Success
   * @throws ApiError
   */
  public static getAmplifyPortalProductionToken(): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/Token/AmplifyPortal/Production',
    });
  }
}
