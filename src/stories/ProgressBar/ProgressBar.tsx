import { tokens } from "@equinor/eds-tokens";
import React from "react";
import styled from "styled-components";

const { colors, spacings, typography, shape } = tokens;

enum Size {
  Small = "Small",
  Medium = "Medium",
  Large = "Large",
}

interface IInternalComponentProps {
  progress?: number;
  value?: number;
  backgroundColor?: string;
  fillColor?: string;
  size?: Size;
}

const Container = styled.div<IInternalComponentProps>`
  background-color: ${(props) =>
    props.backgroundColor
      ? props.backgroundColor
      : colors.ui.background__light.hsla};
  border-radius: ${shape.rounded};
  height: 100%;
`;

const Fill = styled.div<IInternalComponentProps>`
  width: ${(props) => (props.progress ? clampValue(props.progress) : 0)}%;
  min-width: ${spacings.comfortable.large};
  background-color: ${(props) =>
    props.fillColor
      ? props.fillColor
      : colors.infographic.substitute__blue_sky.hsla};
  height: ${(props) =>
    props.size
      ? props.size === Size.Small
        ? "16px"
        : props.size === Size.Medium
        ? "32px"
        : "64px"
      : "8px"};
  border-radius: 100px;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const FillValue = styled.span`
  align-self: center;
  color: ${colors.text.static_icons__primary_white.hsla};
`;

const ValueDisplay = styled.div`
  color: ${(props) =>
    props.color ? props.color : colors.text.static_icons__primary_white.hsla};
  font-size: ${typography.paragraph.caption.fontSize};
  line-height: 16px;
  margin-top: 4px;
`;

const clampValue = (num: number) => Math.min(Math.max(num, 0), 100);

export interface ProgressBarProps {
  progress: number;
  value?: number;
  backgroundColor?: string;
  fillColor?: string;
  displayValueInBar?: boolean;
  valueUnit?: string;
  style?: React.CSSProperties;
  className?: string | undefined;
  size?: Size;
  valueColor?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  return (
    <div className={props.className} style={props.style}>
      <Container
        backgroundColor={props.backgroundColor}
        data-testid="progressbarbackground"
        style={props.style}
      >
        <Fill
          value={props.progress}
          fillColor={props.fillColor}
          progress={props.progress}
          data-testid="progressbarfill"
          size={props.size}
        >
          {props.displayValueInBar && (
            <FillValue>
              {props.value + (props.valueUnit ? " " + props.valueUnit : "")}
            </FillValue>
          )}
        </Fill>
      </Container>
      <ValueDisplay data-testid="progressbarvalue" color={props.valueColor}>
        {props.value && !props.displayValueInBar && props.value.toFixed(1)}
      </ValueDisplay>
    </div>
  );
};

export default ProgressBar;
