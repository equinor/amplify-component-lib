import { FC, ReactNode, useMemo } from 'react';

import { Progress, Scrim, StarProgress } from '@equinor/eds-core-react';

import { colors } from 'src/atoms/style';

import styled from 'styled-components';

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

const ChildrenWrapper = styled.div`
  visibility: hidden;
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
  children?: ReactNode | ReactNode[];
}

export const FullPageSpinner: FC<FullPageSpinnerProps> = ({
  variant = 'application',
  withScrim = false,
  children,
}) => {
  const spinner = useMemo(() => {
    switch (variant) {
      case 'dots':
        return (
          <Progress.Dots
            color="primary"
            data-testid={`full-page-spinner-${variant}`}
          />
        );
      case 'circle':
        return (
          <CircularProgress data-testid={`full-page-spinner-${variant}`} />
        );
      case 'equinor':
        return <StarProgress data-testid={`full-page-spinner-${variant}`} />;
      case 'application':
        // TODO: :NEW-APP-ICON-TODOS: Go back to showing appIcon when we start using new design
        // Old app icons do not have a loading state, so cant be used in this case
        return <CircularProgress data-testid="app-icon-svg" />;
    }
  }, [variant]);

  if (!withScrim) {
    return (
      <NoScrimContainer>
        {spinner}
        {children && <ChildrenWrapper>{children}</ChildrenWrapper>}
      </NoScrimContainer>
    );
  }

  return (
    <Scrim open>
      {spinner}
      {children && <ChildrenWrapper>{children}</ChildrenWrapper>}
    </Scrim>
  );
};
