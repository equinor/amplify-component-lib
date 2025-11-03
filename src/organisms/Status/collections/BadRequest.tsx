import { useStatusNavigation } from 'src/atoms/hooks';
import { Status } from 'src/organisms/Status';

interface BadRequestProps {
  description?: string;
  redirectFallbackUrl?: string;
  onBackClick?: () => void;
  hideBackButton?: boolean;
}

export const BadRequest = ({
  description = `We encountered some confusion regarding your request.
         Please try again later, or if the issue persists, kindly report
         it using the feedback form located in the top bar.`,
  redirectFallbackUrl,
  onBackClick,
  hideBackButton = false,
}: BadRequestProps) => {
  const handleOnClick = useStatusNavigation({
    onBackClick,
    redirectFallbackUrl,
  });

  return (
    <Status color="#AB9067">
      <Status.Title title="Bad request" />
      <Status.Description text={description} />
      {!hideBackButton && <Status.Action onClick={handleOnClick} />}
    </Status>
  );
};
