/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TokenService {
  /**
   * Gets a token for the application with the provided clientId
   * @param clientId
   * @returns string Success
   * @throws ApiError
   */
  public static getToken(clientId: string): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/Token/{clientId}',
      path: {
        clientId: clientId,
      },
    });
  }

  /**
   * Gets a Token for Amplify Portal for the Current Radix Environemnt (development/staging/production)
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
   * Gets a token for Amplify Portal in Production
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
