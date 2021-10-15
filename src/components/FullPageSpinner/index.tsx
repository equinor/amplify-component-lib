import { Progress, Scrim, StarProgress } from '@equinor/eds-core-react';
import styled from 'styled-components';

interface IFullpageSpinnerProps {
  variant?: 'equinor' | 'circle' | 'dots';
  withoutScrim?: boolean;
}

const NoScrimContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 500;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const FullPageSpinner: React.FC<IFullpageSpinnerProps> = ({
  variant,
  withoutScrim,
}) => {
  const renderSpinner = () => {
    return (
      <>
        {(variant === 'equinor' || !variant) && <StarProgress />}
        {variant === 'circle' && <Progress.Circular />}
        {variant === 'dots' && <Progress.Dots />}
      </>
    );
  };

  return (
    <>
      {withoutScrim ? (
        <NoScrimContainer>{renderSpinner()}</NoScrimContainer>
      ) : (
        <Scrim>{renderSpinner()}</Scrim>
      )}
    </>
  );
};

export default FullPageSpinner;
