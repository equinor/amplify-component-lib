import {
  samClearAuthenticatedUser,
  samSetAuthenticatedUser,
} from '@equinor/subsurface-app-management';

/**
 * Attributes later browser telemetry, such as page views, to the signed-in user, or to no one.
 * @param userId - The signed-in account's username, the same ID the backends record for the user, or `undefined`
 * when no one is signed in.
 */
export function setTelemetryUser(userId: string | undefined) {
  if (userId) samSetAuthenticatedUser(userId);
  else samClearAuthenticatedUser();
}
