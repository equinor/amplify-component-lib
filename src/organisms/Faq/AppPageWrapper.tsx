import { CSSProperties, FC, ReactNode } from 'react';

import { spacings } from 'src/atoms';

import { styled } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  margin: ${spacings.large} auto;
  max-width: 1280px;
`;

interface AppPageWrapperProps {
  children: ReactNode;
  style?: CSSProperties;
}

export const AppPageWrapper: FC<AppPageWrapperProps> = ({
  children,
  style,
}) => <Container style={style}>{children}</Container>;
