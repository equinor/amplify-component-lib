import { useStatusNavigation } from 'src/atoms/hooks';
import { Status } from 'src/organisms/Status';

interface MissingPermissionsProps {
  title?: string;
  description?: string;
  redirectFallbackUrl?: string;
  onBackClick?: () => void;
}

export const MissingPermissions = ({
  title = "It looks like you don't have permission to access this page.",
  description,
  redirectFallbackUrl,
  onBackClick,
}: MissingPermissionsProps) => {
  const handleOnClick = useStatusNavigation({
    onBackClick,
    redirectFallbackUrl,
  });

  return (
    <Status>
      <Status.Title title={title} />
      {description && <Status.Description text={description} />}
      <Status.Action onClick={handleOnClick} />
    </Status>
  );
};
