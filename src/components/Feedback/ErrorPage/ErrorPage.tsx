import { forwardRef, ReactNode } from 'react';

import { tokens } from '@equinor/eds-tokens';

import Robot1 from './illustrations/Robot1';

import styled from 'styled-components';

const { spacings } = tokens;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.medium};
  left: -72px; // size of the sidebar
  top: -64px; // size of the topbar
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
  ({ children, illustration = <Robot1 /> }, ref) => {
    return (
      <Container ref={ref}>
        {illustration}
        {children}
      </Container>
    );
  }
);

ErrorPage.displayName = 'ErrorPage';
