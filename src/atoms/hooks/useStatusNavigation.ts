import { useRouter } from '@tanstack/react-router';

interface UseStatusNavigationOptions {
  /**
   * Custom callback to execute instead of default navigation
   */
  onBackClick?: () => void;
  /**
   * Fallback URL to navigate to when there's no browser history
   * Defaults to '/' if not provided
   */
  redirectFallbackUrl?: string;
}

/**
 * Hook for handling navigation in Status components
 * Provides a consistent way to handle back navigation with fallbacks
 */
export const useStatusNavigation = (
  options: UseStatusNavigationOptions = {}
) => {
  const { onBackClick, redirectFallbackUrl } = options;
  const { history, navigate } = useRouter();

  const handleNavigation = () => {
    if (onBackClick) {
      onBackClick();
    } else if (history.length > 1) {
      history.go(-1);
    } else {
      navigate({ to: redirectFallbackUrl || '/' });
    }
  };

  return handleNavigation;
};
