import { Progress, Scrim, StarProgress } from '@equinor/eds-core-react';

interface IFullpageSpinnerProps {
  variant?: 'equinor' | 'circle' | 'dots';
}

const FullPageSpinner: React.FC<IFullpageSpinnerProps> = ({ variant }) => {
  return (
    <Scrim>
      {(variant === 'equinor' || !variant) && <StarProgress />}
      {variant === 'circle' && <Progress.Circular />}
      {variant === 'dots' && <Progress.Dots />}
    </Scrim>
  );
};

export default FullPageSpinner;
