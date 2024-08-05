import { FC, useMemo } from 'react';

import { Progress, Scrim, StarProgress } from '@equinor/eds-core-react';

import { colors } from 'src/atoms/style';
import { environment } from 'src/atoms/utils/auth_environment';
import { ApplicationIcon } from 'src/molecules/ApplicationIcon/ApplicationIcon';

import styled from 'styled-components';

const { getAppName } = environment;

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
  variant?: 'equinor' | 'circle' | 'dots' | 'application';
  withScrim?: boolean;
}

export const FullPageSpinner: FC<FullPageSpinnerProps> = ({
  variant = 'application',
  withScrim = false,
}) => {
  const spinner = useMemo(() => {
    switch (variant) {
      case 'dots':
        return <Progress.Dots color="primary" />;
      case 'circle':
        return <CircularProgress />;
      case 'equinor':
        return <StarProgress />;
      case 'application':
        return (
          <ApplicationIcon
            name={getAppName(import.meta.env.VITE_NAME)}
            animationState="loading"
          />
        );
    }
  }, [variant]);

  if (!withScrim) {
    return <NoScrimContainer>{spinner}</NoScrimContainer>;
  }

  return <Scrim open>{spinner}</Scrim>;
};
