import { Button as EDSbutton, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { colors, spacings } from 'src/atoms/style';

import styled from 'styled-components';

const { shape, elevation } = tokens;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: ${spacings.xx_large};
  background-color: ${colors.ui.background__default.rgba};
  box-shadow: ${elevation.raised};
  border-radius: ${shape.corners.borderRadius};
  overflow: hidden;
  width: calc(100% - ${spacings.xx_large} * 2);
`;

const TopContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  justify-items: end;
  padding-top: 0;
  padding-bottom: ${spacings.medium_small};
`;

const HeadingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacings.medium};
`;

const TitleContainer = styled.div`
  margin-bottom: 48px;
`;

const BodyContainer = styled.div`
  margin-bottom: 50px;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${spacings.small};
  align-items: center;
`;

const ReleaseNoteTypeContainer = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: 'Equionor', sans-serif;
  font-size: 16px;
  font-weight: 500;
  padding: 0;

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
  padding: ${spacings.large};
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    ${colors.ui.background__default.rgba} 20%
  );
  // Remove padding when setting width
  width: calc(100% - (${spacings.large}) * 2);
`;

const Button = styled(EDSbutton)`
  width: auto;
  font-size: 14px;
  padding: ${spacings.small};
  border-radius: 5px;
  &:hover {
    border-radius: 5px;
    align-items: center;
  }
`;

const AccordionText = styled(Typography)`
  font-size: 14px;
  color: ${colors.interactive.primary__resting.rgba};
`;

export {
  AccordionText,
  BodyContainer,
  BtnContainer,
  Button,
  Container,
  HeadingContainer,
  ReleaseNoteTypeContainer,
  RightContainer,
  TitleContainer,
  TopContainer,
};
