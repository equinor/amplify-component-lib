import { useStatusNavigation } from 'src/atoms/hooks';
import { Status } from 'src/organisms/Status';

interface GenericErrorProps {
  title?: string;
  description?: string;
  redirectFallbackUrl?: string;
  onBackClick?: () => void;
  hideBackButton?: boolean;
}

export const GenericError = ({
  title,
  description,
  redirectFallbackUrl,
  onBackClick,
  hideBackButton = false,
}: GenericErrorProps) => {
  const handleOnClick = useStatusNavigation({
    onBackClick,
    redirectFallbackUrl,
  });

  return (
    <Status>
      <Status.Title title={title} />
      <Status.Description text={description} />
      {!hideBackButton && <Status.Action onClick={handleOnClick} />}
    </Status>
  );
};
