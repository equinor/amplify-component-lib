import { EnvironmentType } from 'src/components';
import { environment } from 'src/utils/auth_environment';

const { getEnvironmentName } = environment;

function getPortalWithoutLocalhost() {
  const environmentName = getEnvironmentName(
    import.meta.env.VITE_ENVIRONMENT_NAME
  );

  const environmentNameWithoutLocalHost =
    environmentName === EnvironmentType.LOCALHOST
      ? EnvironmentType.DEVELOP
      : environmentName;

  return `https://client-amplify-portal-${environmentNameWithoutLocalHost}.radix.equinor.com`;
}

const PORTAL_URL_WITHOUT_LOCALHOST = getPortalWithoutLocalhost();

export default {
  PORTAL_URL_WITHOUT_LOCALHOST: PORTAL_URL_WITHOUT_LOCALHOST,
};
