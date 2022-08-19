import { Progress, Scrim, StarProgress } from '@equinor/eds-core-react';
import { FC } from 'react';

import styled from 'styled-components';

export interface FullpageSpinnerProps {
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

const FullPageSpinner: FC<FullpageSpinnerProps> = ({
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
        <Scrim open>{renderSpinner()}</Scrim>
      )}
    </>
  );
};

export default FullPageSpinner;
