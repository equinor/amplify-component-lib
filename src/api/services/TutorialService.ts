/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Tutorial } from '../models/Tutorial';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI_Portal } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TutorialService {
  /**
   * Gets All Tutorials across applications
   * @returns Tutorial Success
   * @throws ApiError
   */
  public static getAllTutorials(): CancelablePromise<Array<Tutorial>> {
    return __request(OpenAPI_Portal, {
      method: 'GET',
      url: '/api/v1/Tutorial',
    });
  }

  /**
   * Creates a tutorial
   * @param requestBody
   * @returns Tutorial Success
   * @throws ApiError
   */
  public static createTutorial(
    requestBody?: Tutorial
  ): CancelablePromise<Tutorial> {
    return __request(OpenAPI_Portal, {
      method: 'POST',
      url: '/api/v1/Tutorial',
      body: requestBody,
      mediaType: 'application/json-patch+json',
    });
  }

  /**
   * Edits or Creates a tutorial if it doesnt exist
   * @param requestBody
   * @returns Tutorial Success
   * @throws ApiError
   */
  public static putTutorial(
    requestBody?: Tutorial
  ): CancelablePromise<Tutorial> {
    return __request(OpenAPI_Portal, {
      method: 'PUT',
      url: '/api/v1/Tutorial',
      body: requestBody,
      mediaType: 'application/json-patch+json',
    });
  }

  /**
   * Gets all tutorials for Application
   * @param applicationName
   * @returns Tutorial Success
   * @throws ApiError
   */
  public static getTutorialsForApplication(
    applicationName: string
  ): CancelablePromise<Array<Tutorial>> {
    return __request(OpenAPI_Portal, {
      method: 'GET',
      url: '/api/v1/Tutorial/{applicationName}',
      path: {
        applicationName: applicationName,
      },
    });
  }

  /**
   * Deletes a tutorial by its id
   * @param tutorialId
   * @returns Tutorial Success
   * @throws ApiError
   */
  public static deleteTutorial(
    tutorialId: string
  ): CancelablePromise<Tutorial> {
    return __request(OpenAPI_Portal, {
      method: 'DELETE',
      url: '/api/v1/Tutorial/{tutorialId}',
      path: {
        tutorialId: tutorialId,
      },
    });
  }
}
