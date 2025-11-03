import { useStatusNavigation } from 'src/atoms/hooks';
import { Status } from 'src/organisms/Status';

interface PageNotFoundProps {
  description?: string;
  redirectFallbackUrl?: string;
  onBackClick?: () => void;
}

export const PageNotFound = ({
  description = "It looks like the page you're looking for has gone missing. Please check the URL and try again.",
  redirectFallbackUrl,
  onBackClick,
}: PageNotFoundProps) => {
  const handleOnClick = useStatusNavigation({
    onBackClick,
    redirectFallbackUrl,
  });

  return (
    <Status center={false}>
      <Status.Title title="Page not found" />
      <Status.Description text={description} />
      <Status.Action onClick={handleOnClick} />
    </Status>
  );
};
