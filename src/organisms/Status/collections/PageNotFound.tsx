import { useStatusNavigation } from 'src/atoms/hooks';
import { Status } from 'src/organisms/Status';

interface PageNotFoundProps {
  description?: string;
  redirectFallbackUrl?: string;
  onBackClick?: () => void;
  hideBackButton?: boolean;
}

export const PageNotFound = ({
  description = "It looks like the page you're looking for has gone missing. Please check the URL and try again.",
  redirectFallbackUrl,
  onBackClick,
  hideBackButton = false,
}: PageNotFoundProps) => {
  const handleOnClick = useStatusNavigation({
    onBackClick,
    redirectFallbackUrl,
  });

  return (
    <Status center={false}>
      <Status.Title title="Page not found" />
      <Status.Description text={description} />
      {!hideBackButton && <Status.Action onClick={handleOnClick} />}
    </Status>
  );
};
