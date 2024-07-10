import { FC } from 'react';

import { Progress, Scrim, StarProgress } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { colors } = tokens;

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
const CircularProgress = styled(Progress.Circular)`
  circle {
    stroke: ${colors.interactive.primary__resting.rgba};
  }
  circle:first-child {
    stroke: ${colors.interactive.primary__hover_alt.rgba};
  }
`;

export interface FullPageSpinnerProps {
  variant?: 'equinor' | 'circle' | 'dots';
  withoutScrim?: boolean;
}

export const FullPageSpinner: FC<FullPageSpinnerProps> = ({
  variant,
  withoutScrim,
}) => {
  const renderSpinner = () => {
    return (
      <>
        {(variant === 'equinor' || !variant) && <StarProgress />}
        {variant === 'circle' && <CircularProgress />}
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
