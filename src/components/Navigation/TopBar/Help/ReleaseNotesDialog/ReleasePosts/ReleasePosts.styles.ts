import { tokens } from '@equinor/eds-tokens';

import { spacings } from 'src/style';

import styled from 'styled-components';

const { shape } = tokens;

const ContainerNoResults = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  height: 168px;
  border-radius: ${shape.corners.borderRadius};
  border: dotted 2px lightgray;
  width: calc(100% - 348px); // Remove padding and left container
  margin-left: 200px; // move the container as opposed to creating an empty element representing the left container
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium};
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 168px;
`;

export { Container, ContainerNoResults, LoadingWrapper };
