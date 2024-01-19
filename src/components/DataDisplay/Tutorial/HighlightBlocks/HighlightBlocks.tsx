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

const HighlightBlocks = forwardRef<HTMLDivElement, HighlightBlocksProps>(
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
export default HighlightBlocks;
