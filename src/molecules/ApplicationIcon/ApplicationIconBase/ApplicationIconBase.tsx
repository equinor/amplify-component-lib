import { forwardRef } from 'react';

import { IconData } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { ApplicationIconContent } from './ApplicationIconContent';
import { GRAYSCALE_FILTER_VALUE } from 'src/molecules/ApplicationIcon/ApplicationIcon.constants';
import { AppIconProps } from 'src/molecules/ApplicationIcon/ApplicationIcon.types';
import { IconDataWithColor } from 'src/molecules/ApplicationIcon/ApplicationIconCollection';

import styled, { css } from 'styled-components';

const { colors, elevation } = tokens;

interface ContainerProps {
  $size: number;
  $withHover: boolean;
  $grayScale: boolean;
  $iconOnly?: true;
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
  ${({ $grayScale }) =>
    $grayScale
      ? css`
          filter: ${GRAYSCALE_FILTER_VALUE};
        `
      : ''}
  > svg {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    transition: all 2s ease-in-out;
    z-index: 300;
    transform: scale(0.8);
  }
  > p {
    color: #ffffff;
    z-index: 300;
    font-weight: 700;
  }
  ${({ $withHover }) =>
    $withHover &&
    css`
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
  $grayScale: boolean;
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
  // This background is set to hex and not rgba because design do not want this color to change in dark mode , 18 march 2024.
  background: ${colors.interactive.primary__resting.hex};
  transition: all 3s cubic-bezier(0.25, 1, 0.5, 1);
  transform: rotate(${(props) => props.$rotation}deg);
  pointer-events: none;
`;

interface ApplicationIconBaseProps extends Required<AppIconProps> {
  shapes: ShapeProps[];
  iconOnly: boolean;
  withHover: boolean;
}

export interface ApplicationIconWithIconProps extends ApplicationIconBaseProps {
  iconData: IconData | IconDataWithColor[];
}

export interface ApplicationIconWithNameProps extends ApplicationIconBaseProps {
  name: string;
}

// Icon component from EDS can take whatever size we want in numbers, so casting size to any here is safe
// Size type is specified on the other higher level components
const ApplicationIconBase = forwardRef<
  HTMLDivElement,
  ApplicationIconWithIconProps | ApplicationIconWithNameProps
>(
  (
    { size = 48, shapes, iconOnly, withHover, grayScale = false, ...rest },
    ref
  ) => {
    if (iconOnly) {
      return (
        <Container
          data-testid="application-icon"
          ref={ref}
          $size={size}
          $iconOnly
          $withHover={withHover}
          $grayScale={grayScale}
        >
          <ApplicationIconContent size={size} {...rest} />
        </Container>
      );
    }

    return (
      <Container
        data-testid="application-icon"
        ref={ref}
        $size={size}
        $withHover={withHover}
        $grayScale={grayScale}
      >
        <ApplicationIconContent size={size} {...rest} />
        {shapes.map((shape, index) => (
          <Shape
            key={`shape-${index}`}
            data-testid="shape"
            $index={index}
            $top={shape.top}
            $left={shape.left}
            $rotation={shape.rotation}
            $grayScale={grayScale}
          />
        ))}
      </Container>
    );
  }
);

ApplicationIconBase.displayName = 'ApplicationIconBase';

export default ApplicationIconBase;
