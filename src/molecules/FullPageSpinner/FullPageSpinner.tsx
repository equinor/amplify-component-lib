import { FC, ReactNode, useMemo } from 'react';

import { Progress, Scrim, StarProgress } from '@equinor/eds-core-react';

import { colors } from 'src/atoms/style';

import styled, { css } from 'styled-components';

interface NoScrimContainerProps {
  $fixedPosition: boolean;
}

const NoScrimContainer = styled.div<NoScrimContainerProps>`
  ${({ $fixedPosition }) => {
    if ($fixedPosition) {
      return css`
        position: fixed;
        z-index: 500;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      `;
    }
    return css`
      position: absolute;
      z-index: 500;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `;
  }}
`;

const ChildrenWrapper = styled.div`
  display: none;
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
  fixedPosition?: boolean;
  children?: ReactNode | ReactNode[];
}

export const FullPageSpinner: FC<FullPageSpinnerProps> = ({
  variant = 'application',
  withScrim = false,
  fixedPosition = false,
  children,
}) => {
  const spinner = useMemo(() => {
    switch (variant) {
      case 'dots':
        return (
          <Progress.Dots
            color="primary"
            data-testid={`full-page-spinner-${variant}`}
            size={48}
          />
        );
      case 'circle':
        return (
          <CircularProgress
            data-testid={`full-page-spinner-${variant}`}
            size={48}
          />
        );
      case 'equinor':
        return (
          <StarProgress
            data-testid={`full-page-spinner-${variant}`}
            size={48}
          />
        );
      case 'application':
        // TODO: :NEW-APP-ICON-TODOS: Go back to showing appIcon when we start using new design
        // Old app icons do not have a loading state, so cant be used in this case
        return <CircularProgress data-testid="app-icon-svg" size={48} />;
    }
  }, [variant]);

  if (!withScrim) {
    return (
      <NoScrimContainer $fixedPosition={fixedPosition}>
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
