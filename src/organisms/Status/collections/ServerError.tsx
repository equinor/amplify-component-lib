import { useStatusNavigation } from 'src/atoms/hooks';
import { Status } from 'src/organisms/Status';

interface ServerErrorProps {
  description?: string;
  redirectFallbackUrl?: string;
  onBackClick?: () => void;
}

export const ServerError = ({
  description = `Our server encountered an unexpected issue. Please try
        again shortly, or reach out via the feedback form if the problem
        continues.`,
  redirectFallbackUrl,
  onBackClick,
}: ServerErrorProps) => {
  const handleOnClick = useStatusNavigation({
    onBackClick,
    redirectFallbackUrl,
  });

  return (
    <Status color="#C47E84">
      <Status.Title title="Something is wrong on our servers" />
      <Status.Description text={description} />
      <Status.Action onClick={handleOnClick} />
    </Status>
  );
};
