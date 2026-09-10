import { FC } from 'react';
import { useEffect, useRef } from 'react';

import { useAuth } from 'src/providers/AuthProvider/AuthProvider';
import { useSnackbar } from 'src/providers/SnackbarProvider/SnackbarProvider';

export interface RoleSyncNotifierProps {
  /** Message shown in the Snackbar when the user's roles/access have changed. */
  text?: string;
  /** Label for the action button that applies the new roles. */
  actionText?: string;
}

/**
 * Drop this anywhere inside both `<AuthProvider>` and `<SnackbarProvider>`
 * (order doesn't matter as long as both are ancestors) to automatically
 * surface a Snackbar when `AuthProvider` detects that the user's
 * roles/access changed since login (e.g. an AccessIT group assignment was
 * granted or revoked). Clicking the action applies the new roles instantly,
 * without requiring the user to log out/in or reload the page.
 *
 * @param text - Message shown in the Snackbar when the user's roles/access have changed
 * @param actionText - Label for the action button that applies the new roles
 */
export const RoleSyncNotifier: FC<RoleSyncNotifierProps> = ({
  text = 'Your access has changed. Refresh to apply your new permissions.',
  actionText = 'Refresh',
}) => {
  const { rolesOutdated, applyNewRoles } = useAuth();
  const { showSnackbar, hideSnackbar } = useSnackbar();
  const hasShownForCurrentChange = useRef(false);

  useEffect(() => {
    if (rolesOutdated && !hasShownForCurrentChange.current) {
      hasShownForCurrentChange.current = true;
      showSnackbar(
        { text, variant: 'info' },
        {
          customProps: { autoHideDuration: 30_000 },
          action: {
            text: actionText,
            handler: () => {
              applyNewRoles();
              hideSnackbar();
            },
          },
        }
      );
    }

    if (!rolesOutdated) {
      hasShownForCurrentChange.current = false;
    }
  }, [
    rolesOutdated,
    applyNewRoles,
    showSnackbar,
    hideSnackbar,
    text,
    actionText,
  ]);

  return null;
};
