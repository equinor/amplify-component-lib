import { forwardRef } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { IconDataWithColor } from './ApplicationIconCollection';
import { AppIconProps } from 'src/types/AppIcon';

import styled from 'styled-components';

const { colors, elevation } = tokens;

interface ContainerProps {
  $size: number;
  $iconOnly: boolean;
  $withHover: boolean;
}

const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15%;
  background: ${({ $iconOnly }) => ($iconOnly ? 'transparent' : '#004f55')};
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  z-index: 100;
  overflow: hidden;
  > svg {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    transition: all 2s ease-in-out;
    z-index: 300;
    transform: scale(0.8);
  }
  ${({ $withHover }) =>
    $withHover &&
    `
  cursor: pointer;
  &:hover {
    > svg {
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
  `};
`;

export interface ShapeProps {
  top: number;
  left: number;
  rotation: number;
}

interface ShapeElementProps {
  $top: number;
  $left: number;
  $rotation: number;
  $index: number;
}

const Shape = styled.div<ShapeElementProps>`
  position: absolute;
  top: ${(props) => props.$top}%;
  left: ${(props) => props.$left}%;
  border-radius: 55% 50% 80% 50%;
  z-index: ${(props) => 200 - props.$index};
  width: 120%;
  height: 80%;
  box-shadow: ${elevation.raised};
  background: ${colors.interactive.primary__resting.rgba};
  transition: all 3s cubic-bezier(0.25, 1, 0.5, 1);
  transform: rotate(${(props) => props.$rotation}deg);
  pointer-events: none;
`;

interface ApplicationIconBaseProps extends AppIconProps {
  iconData: IconData | IconDataWithColor[];
  shapes: ShapeProps[];
  iconOnly: boolean;
  withHover: boolean;
}

// Icon component from EDS can take whatever size we want in numbers, so casting size to any here is safe
// Size type is specified on the other higher level components
const ApplicationIconBase = forwardRef<
  HTMLDivElement,
  ApplicationIconBaseProps
>(({ size = 48, iconData, shapes, iconOnly, withHover }, ref) => {
  if (iconOnly) {
    return (
      <Container
        data-testid="application-icon"
        ref={ref}
        $size={size}
        $iconOnly={iconOnly}
        $withHover={withHover}
      >
        {Array.isArray(iconData) ? (
          iconData.map((icon, index) => (
            <Icon
              key={`icon-${index}`}
              data={icon}
              size={size}
              color={icon.color}
            />
          ))
        ) : (
          <Icon data={iconData} size={size} color="#ffffff" />
        )}
      </Container>
    );
  }
  return (
    <Container
      data-testid="application-icon"
      ref={ref}
      $size={size}
      $iconOnly={iconOnly}
      $withHover={withHover}
    >
      {Array.isArray(iconData) ? (
        iconData.map((icon, index) => (
          <Icon
            key={`icon-${index}`}
            data={icon}
            size={size}
            color={icon.color}
          />
        ))
      ) : (
        <Icon data={iconData} size={size} color="#ffffff" />
      )}
      {shapes.map((shape, index) => (
        <Shape
          key={`shape-${index}`}
          data-testid="shape"
          $index={index}
          $top={shape.top}
          $left={shape.left}
          $rotation={shape.rotation}
        />
      ))}
    </Container>
  );
});

ApplicationIconBase.displayName = 'ApplicationIconBase';

export default ApplicationIconBase;
