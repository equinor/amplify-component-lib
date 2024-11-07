import { forwardRef, ReactNode } from 'react';

import { spacings } from 'src/atoms/style';
import { GlitchAnimation } from 'src/deprecated/ErrorPage/illustrations/GlitchAnimation';

import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium};
  margin: auto;
  align-items: center;
  h3,
  h4 {
    text-align: center;
    white-space: pre-line;
  }
  width: 500px;
`;

export interface ErrorContentProps {
  illustration?: ReactNode;
  children: ReactNode;
}

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
