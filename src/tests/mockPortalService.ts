import { CancelablePromise } from 'src/api';

import { vi } from 'vitest';

// Mock PortalService
class PortalServiceMock {
  public static createIncident(): CancelablePromise<any> {
    return new CancelablePromise((res) =>
      setTimeout(() => res('createIncident'), 1000)
    );
  }

  public static fileUpload(): CancelablePromise<any> {
    return new CancelablePromise((res) =>
      setTimeout(() => res('fileUpload'), 1000)
    );
  }

  public static postmessage(): CancelablePromise<any> {
    return new CancelablePromise((res) =>
      setTimeout(() => res('postmessage'), 1000)
    );
  }

  public static getFeatureToggleFromApplicationName(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    applicationName: string
  ): CancelablePromise<boolean> {
    return new CancelablePromise((res) => setTimeout(() => res(true), 1000));
  }
}

vi.stubGlobal('portalService', PortalServiceMock);
