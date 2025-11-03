import { useStatusNavigation } from 'src/atoms/hooks';
import { Status } from 'src/organisms/Status';

interface GenericErrorProps {
  title?: string;
  description?: string;
  redirectFallbackUrl?: string;
  onBackClick?: () => void;
}

export const GenericError = ({
  title,
  description,
  redirectFallbackUrl,
  onBackClick,
}: GenericErrorProps) => {
  const handleOnClick = useStatusNavigation({
    onBackClick,
    redirectFallbackUrl,
  });

  return (
    <Status>
      <Status.Title title={title} />
      <Status.Description text={description} />
      <Status.Action onClick={handleOnClick} />
    </Status>
  );
};
