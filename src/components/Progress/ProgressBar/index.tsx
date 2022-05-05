import { tokens } from '@equinor/eds-tokens';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const { colors, spacings, typography, shape } = tokens;

export interface ProgressBarProps {
  progress: number;
  displayValue?: number;
  backgroundColor?: string;
  fillColor?: string;
  displayValueInBar?: boolean;
  valueUnit?: string;
  style?: React.CSSProperties;
  className?: string | undefined;
  valueColor?: string;
}

interface ContainerProps {
  backgroundColor?: string;
}

const DefaultStyle = styled.div`
  width: 100%;
  height: ${spacings.comfortable.medium};
`;

const Bar = styled.div<ContainerProps>`
  background-color: ${(props) =>
    props.backgroundColor
      ? props.backgroundColor
      : colors.ui.background__light.hsla};
  border-radius: ${shape.rounded};
  height: 100%;
`;

interface FillProps {
  value?: number;
  progress?: number;
  fillColor?: string;
}

const Fill = styled.div<FillProps>`
  transition: width 700ms cubic-bezier(0.65, 0, 0.2, 1);
  width: ${(props) => (props.progress ? clampValue(props.progress) : 0)}%;
  min-width: ${spacings.comfortable.xx_large};
  background-color: ${(props) =>
    props.fillColor
      ? props.fillColor
      : colors.infographic.substitute__blue_sky.hsla};
  height: 100%;
  border-radius: 100px;
  display: flex;
  justify-content: center;
`;

const FillValue = styled.span`
  align-self: center;
  color: ${(props) =>
    props.color ? props.color : colors.text.static_icons__primary_white.hsla};
`;

const ValueDisplay = styled.div`
  color: ${(props) =>
    props.color ? props.color : colors.text.static_icons__primary_white.hsla};
  font-size: ${typography.paragraph.caption.fontSize};
  line-height: 16px;
  margin-top: 4px;
`;

const clampValue = (num: number) => Math.min(Math.max(num, 0), 100);

const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  const [fill, setFill] = useState(0);

  useEffect(() => {
    setFill(props.progress);
  }, [props.progress]);

  return (
    <DefaultStyle className={props.className} style={props.style}>
      <Bar
        backgroundColor={props.backgroundColor}
        data-testid="progressbarbackground"
      >
        <Fill
          value={props.progress}
          fillColor={props.fillColor}
          progress={fill}
          data-testid="progressbarfill"
        >
          {props.displayValueInBar && (
            <FillValue color={props.valueColor}>
              {props.displayValue +
                (props.valueUnit ? ' ' + props.valueUnit : '')}
            </FillValue>
          )}
        </Fill>
      </Bar>
      <ValueDisplay data-testid="progressbarvalue" color={props.valueColor}>
        {props.displayValue &&
          !props.displayValueInBar &&
          props.displayValue.toFixed(1) +
            (props.valueUnit ? ' ' + props.valueUnit : '')}
      </ValueDisplay>
    </DefaultStyle>
  );
};

export default ProgressBar;
