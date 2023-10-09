import { forwardRef } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { SvgIconProps } from '../index';

import styled from 'styled-components';

const { colors, elevation } = tokens;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15%;
  background: #004f55;
  width: fit-content;
  height: fit-content;
  z-index: 100;
  overflow: hidden;
  > svg:first-child {
    pointer-events: none;
    transition: all 2s ease-in-out;
    z-index: 300;
    transform: scale(0.8);
  }
  cursor: pointer;
  &:hover {
    > svg:first-child {
      transform: scale(0.9);
    }
    > div:nth-child(even) {
      top: -80%;
      left: 80%;
    }
    > div:nth-child(odd) {
      top: 93%;
      left: -93%;
    }
  }
`;

export interface ShapeProps {
  top: number;
  left: number;
  rotation: number;
}

type ShapeElementProps = {
  $top: number;
  $left: number;
  $rotation: number;
  $index: number;
};

const Shape = styled.div<ShapeElementProps>`
  position: absolute;
  top: ${(props) => props.$top}%;
  left: ${(props) => props.$left}%;
  border-radius: 55% 50% 80% 50%;
  z-index: ${(props) => 200 - props.$index};
  width: 120%;
  height: 80%;
  box-shadow: ${elevation.raised};
  background: ${colors.interactive.primary__resting.hex};
  transition: all 3s cubic-bezier(0.25, 1, 0.5, 1);
  transform: rotate(${(props) => props.$rotation}deg);
  pointer-events: none;
`;

interface ApplicationIconBaseProps extends SvgIconProps {
  iconData: IconData;
  shapes: ShapeProps[];
}

const ApplicationIconBase = forwardRef<
  HTMLDivElement,
  ApplicationIconBaseProps
>(({ size = 48, iconData, shapes }, ref) => (
  <Container ref={ref}>
    <Icon
      data={iconData}
      size={size}
      color={colors.text.static_icons__primary_white.hex}
    />
    {shapes.map((shape, index) => (
      <Shape
        key={`shape-${index}`}
        $index={index}
        $top={shape.top}
        $left={shape.left}
        $rotation={shape.rotation}
      />
    ))}
  </Container>
));

ApplicationIconBase.displayName = 'ApplicationIconBase';

export default ApplicationIconBase;
