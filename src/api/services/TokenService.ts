// /* istanbul ignore file */
// /* tslint:disable */
// /* eslint-disable */
// import type { CancelablePromise } from '../core/CancelablePromise';
// import { getToken, OpenAPI } from '../core/OpenAPI';
// import { request as __request } from '../core/request';
// import { environment } from 'src/utils';
//
// const { getEnvironmentName } = environment;
//
// const environmentName = getEnvironmentName(
//   import.meta.env.VITE_ENVIRONMENT_NAME
// );
//
// export const getPortalToken = async () => {
//   return getToken(
//     `amplify-portal-${environmentName}`,
//     TokenService.getAmplifyPortalToken
//   );
// };
//
// export const getPortalProdToken = async () => {
//   return getToken(
//     `amplify-portal-production`,
//     TokenService.getAmplifyPortalProductionToken
//   );
// };
