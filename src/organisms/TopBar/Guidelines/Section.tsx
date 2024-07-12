import { FC, ReactNode } from 'react';

import { spacings } from 'src/atoms/style';
import { Typography } from 'src/molecules';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium};
  > p {
    padding-left: ${spacings.medium};
    padding-top: ${spacings.small};
  }

  > section {
    display: flex;
    flex-direction: column;
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

export const Section: FC<SectionProps> = ({ title, children }) => (
  <Container data-testid="guidelines-section">
    <Typography variant="overline">{title}</Typography>
    <section>{children}</section>
  </Container>
);
