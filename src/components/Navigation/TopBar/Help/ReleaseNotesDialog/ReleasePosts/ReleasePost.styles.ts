import { Button as EDSbutton } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { spacings, shape, elevation } = tokens;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: ${spacings.comfortable.xx_large};
  background-color: #fff;
  box-shadow: ${elevation.raised};
  border-radius: ${shape.corners.borderRadius};
  overflow: hidden;
  max-width: 1100px;
  width: calc(100% - ${spacings.comfortable.xx_large} * 2);
`;

const TopContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  justify-items: end;
  padding-top: 0;
  padding-bottom: ${spacings.comfortable.medium_small};
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${spacings.comfortable.medium};
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${spacings.comfortable.small};
  align-items: center;
`;

const ReleaseNoteTypeContainer = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: 'Equionor', sans-serif;
  font-size: 16px;
  font-weight: 500;
  padding: 0px;

  > p {
    line-height: normal;
    height: min-content;
  }
`;

interface BtnContainerProps {
  $open: boolean;
}

const BtnContainer = styled.div<BtnContainerProps>`
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: ${spacings.comfortable.large};
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 20%
  );
  // Remove padding when setting width
  width: calc(100% - (${spacings.comfortable.large}) * 2);
`;

const Button = styled(EDSbutton)`
  width: auto;
  font-size: 14px;
  padding: ${spacings.comfortable.small};
  border-radius: 5px;
  &:hover {
    border-radius: 5px;
    align-items: center;
  }
`;

export {
  BtnContainer,
  Button,
  Container,
  ReleaseNoteTypeContainer,
  RightContainer,
  TitleContainer,
  TopContainer,
};
