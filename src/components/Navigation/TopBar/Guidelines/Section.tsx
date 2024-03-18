import { FC, ReactNode } from 'react';

import { Typography } from '@equinor/eds-core-react';

import { spacings } from 'src/style';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium};
  > p {
    padding-left: ${spacings.medium};
  }
  > section {
    display: flex;
    flex-direction: column;
    margin-bottom: ${spacings.large};
    gap: ${spacings.medium};
    margin-left: ${spacings.medium};
    overflow: auto;
    height: fit-content;
    max-height: 66vh;
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
