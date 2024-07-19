/* c8 ignore start */
import { forwardRef, ReactNode } from 'react';

import { tokens } from '@equinor/eds-tokens';

import styled, { keyframes } from 'styled-components';

const { colors } = tokens;

const spawn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const HighlightedArea = styled.div`
  background: white;
  outline: 4px solid ${colors.interactive.primary__resting.rgba};
  animation: ${spawn} 500ms;
  border-radius: 4px;
  z-index: 1600;
`;

interface HighlightBlocksProps {
  children: ReactNode;
  active: boolean;
  className?: string;
}

/**
 * @deprecated since version 6.3.0. We use TutorialProvider instead, and add tutorials to a database on amplify-portal.
 * You can read a small guide in the front-end docs on the JS devops (JS devops -> Overview -> Wiki -> Documentation ->
 * Front-end docs -> Guides -> Creating tutorial for TutorialProvider)
 */
export const HighlightBlocks = forwardRef<HTMLDivElement, HighlightBlocksProps>(
  ({ children, className, active }, ref) =>
    active ? (
      <HighlightedArea
        className={className ? `${className} highlighted` : 'highlighted'}
        ref={ref}
      >
        {children}
      </HighlightedArea>
    ) : (
      <>{children}</>
    )
);

HighlightBlocks.displayName = 'HighlightBlocks';
/* c8 ignore end */
