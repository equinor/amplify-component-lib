import { shape, spacings } from 'src/atoms/style';

import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto 1fr;
  gap: ${spacings.medium};
  max-width: 1280px;
  margin: ${spacings.large} auto;
  height: fit-content;
  > h1 {
    grid-column: span 2;
    white-space: nowrap;
  }
`;

export const StickyRightSide = styled.div`
  position: sticky;
  top: calc(${spacings.medium});
  height: fit-content;
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: calc(${spacings.large} + ${spacings.x_small});
  > div {
    position: relative;
    height: fit-content;
  }
  > a {
    position: sticky;
    margin-right: auto;
    border-radius: ${shape.rounded.borderRadius};
    text-decoration: none;
    &:hover {
      border-radius: ${shape.rounded.borderRadius};
    }
  }
`;
