import { EnvironmentType } from 'src/atoms';

export function environmentAndAppNameToURL(
  environment: EnvironmentType,
  applicationName: string
) {
  if (environment && environment !== EnvironmentType.PRODUCTION) {
    return `https://client-subsurfappmanagement-frontend-${environment}.radix.equinor.com/release-notes?filters={"applications"%3A["${encodeURIComponent(applicationName)}"]}`;
  }
  return `https://subsurfappmanagement.equinor.com/release-notes?filters={"applications"%3A["${encodeURIComponent(applicationName)}"]}`;
}
