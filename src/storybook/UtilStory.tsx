import { FC } from 'react';

import { Typography } from '@equinor/eds-core-react';

import { spacings } from 'src/atoms/style';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium};
  code {
    background: #3d3d3d;
    padding: 24px;
    color: white;
    font-family: monospace;
    display: block;
    white-space: pre-wrap;
  }
`;

interface UtilStoryProps {
  name: string;
  codeText: string;
}

const UtilStory: FC<UtilStoryProps> = ({ name, codeText }) => (
  <Container>
    <Typography variant="h1">{name}</Typography>
    <code>{codeText}</code>
  </Container>
);

export default UtilStory;
