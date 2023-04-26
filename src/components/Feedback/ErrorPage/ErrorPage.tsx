import { forwardRef, ReactNode } from 'react';

import { tokens } from '@equinor/eds-tokens';

import GlitchAnimation from './illustrations/GlitchAnimation';

import styled from 'styled-components';

const { spacings } = tokens;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.medium};
  margin: auto;
  align-items: center;
  h3,
  h4 {
    text-align: center;
    white-space: pre-line;
  }
  width: 500px;
`;

export type ErrorContentProps = {
  illustration?: ReactNode;
  children: ReactNode;
};

export const ErrorPage = forwardRef<HTMLDivElement, ErrorContentProps>(
  ({ children, illustration = <GlitchAnimation /> }, ref) => {
    return (
      <Container ref={ref}>
        {illustration}
        {children}
      </Container>
    );
  }
);

ErrorPage.displayName = 'ErrorPage';
