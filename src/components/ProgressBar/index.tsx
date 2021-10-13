import { tokens } from '@equinor/eds-tokens';
import React from 'react';
import styled from 'styled-components';

const { colors, spacings, shape } = tokens;

interface ContainerProps {
  backgroundColor?: string;
}

const Container = styled.div<ContainerProps>`
  background-color: ${(props) =>
    props.backgroundColor
      ? props.backgroundColor
      : colors.ui.background__light.hsla};
  border-radius: ${shape.rounded};
  height: 100%;
`;

interface FillProps {
  progress?: number;
  value?: number;
  fillColor?: string;
  size: 8 | 16 | 32 | 64;
}

const Fill = styled.div<FillProps>`
  width: ${(props) => (props.progress ? clampValue(props.progress) : 0)}%;
  min-width: ${spacings.comfortable.large};
  background-color: ${(props) =>
    props.fillColor
      ? props.fillColor
      : colors.infographic.substitute__blue_sky.hsla};
  height: ${(props) => `${props.size}px`};
  border-radius: 100px;
  display: flex;
  justify-content: center;
`;

const FillValue = styled.span`
  align-self: center;
  color: ${colors.text.static_icons__primary_white.hsla};
`;

const clampValue = (num: number) => Math.min(Math.max(num, 0), 100);

export interface ProgressBarProps {
  progress: number;
  value?: number;
  backgroundColor: string;
  fillColor: string;
  unit?: string;
  size: 8 | 16 | 32 | 64;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  value,
  backgroundColor,
  fillColor,
  unit,
  size,
}) => {
  return (
    <Container
      backgroundColor={backgroundColor}
      data-testid="progressbarbackground"
    >
      <Fill
        value={progress}
        fillColor={fillColor}
        progress={progress}
        data-testid="progressbarfill"
        size={size}
      >
        <FillValue>{value && value + (unit ? ' ' + unit : '')}</FillValue>
      </Fill>
    </Container>
  );
};

export default ProgressBar;
