import { FC, ReactNode } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { spacings } = tokens;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.medium};
  > section {
    display: flex;
    flex-direction: column;
    margin-bottom: ${spacings.comfortable.large};
    gap: ${spacings.comfortable.medium};
    margin-left: ${spacings.comfortable.medium_small};
  }
`;

interface SectionProps {
  title: string;
  children: ReactNode | ReactNode[];
}

const Section: FC<SectionProps> = ({ title, children }) => (
  <Container data-testid="guidelines-section">
    <Typography variant="overline">{title}</Typography>
    <section>{children}</section>
  </Container>
);

export default Section;
