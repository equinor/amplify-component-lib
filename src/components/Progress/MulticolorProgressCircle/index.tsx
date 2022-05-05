import React from 'react';
import { Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
const { colors, typography } = tokens;

const Container = styled.div`
  margin: auto;
  display: flex;
  max-height: 100%;
`;

const Circle = styled.div`
  position: relative;
`;

interface CircleProps {
  dashoffset: number;
}

const BackgroundCircle = styled.circle<CircleProps>`
  stroke-dashoffset: ${(props) => props.dashoffset}px;
`;

const ColorCircle = styled.circle<CircleProps>`
  transition: stroke-dashoffset 0.5s cubic-bezier(0.65, 0, 0.35, 1);
  stroke-dashoffset: ${(props) => props.dashoffset}px;
`;

const TextContainer = styled.div`
  width: 100%;
  top: 50%;
  left: 50%;
  position: absolute;
  text-align: center;
  line-height: 28px;
  transform: translate(-50%, -50%);
`;

const CenterText = styled(Typography)`
  text-align: center;
  font-size: ${typography.ui.chart.fontSize};
`;

export type ColoredProgressCircle = {
  fillPercent: number;
  color: string;
};

export interface MulticolorProgressCircleProps {
  completed: number;
  data: Array<ColoredProgressCircle>;
  size?: string;
}

const MulticolorProgressCircle: React.FC<MulticolorProgressCircleProps> = ({
  completed,
  data = [],
  size,
}) => {
  const radius = 22;
  const radiusOffset = 90;
  let totalPercentageFilled = 0;

  const getCircumferenceInPixels = () => 2 * Math.PI * radius;

  const calculateDashoffset = (fillPercent: number) => {
    const circ = getCircumferenceInPixels();
    const percentageAsPixelValue = (circ / 100) * fillPercent;
    return circ - percentageAsPixelValue;
  };

  const calculateRotationOffset = (index: number) =>
    index > 0
      ? (360 / 100) * totalPercentageFilled - radiusOffset
      : radiusOffset * -1;

  return (
    <Container>
      <Circle>
        <svg
          data-testid="svgcontainer"
          viewBox="24 24 48 48"
          role="progressbar"
          height={size ? size : '100%'}
          width={size ? size : '100%'}
          preserveAspectRatio="xMidYMid meet"
        >
          <BackgroundCircle
            shapeRendering="geometricPrecision"
            cx="48"
            cy="48"
            r="22"
            fill="none"
            strokeWidth="3"
            stroke={colors.interactive.disabled__text.hsla}
            dashoffset={0}
          ></BackgroundCircle>
          {data.map((circle, i) => {
            const rotationOffset = calculateRotationOffset(i);
            totalPercentageFilled += circle.fillPercent;
            return (
              <ColorCircle
                key={i}
                shapeRendering="geometricPrecision"
                cx="48"
                cy="48"
                r="22"
                fill="none"
                strokeWidth="3"
                strokeDasharray={getCircumferenceInPixels()}
                stroke={circle.color}
                transform={`rotate(${rotationOffset} 48 48)`}
                dashoffset={calculateDashoffset(circle.fillPercent)}
              ></ColorCircle>
            );
          })}
        </svg>

        <TextContainer>
          <CenterText
            group="ui"
            variant="chart"
            color={colors.text.static_icons__secondary.hsla}
          >
            {Math.floor(completed)}% Complete
          </CenterText>
        </TextContainer>
      </Circle>
    </Container>
  );
};

export default MulticolorProgressCircle;
