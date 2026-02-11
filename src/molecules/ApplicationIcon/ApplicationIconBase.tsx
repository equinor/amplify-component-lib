import { forwardRef, ReactElement } from 'react';

import { colors } from 'src/atoms/style';
import { GRAYSCALE_FILTER_VALUE } from 'src/molecules/ApplicationIcon/ApplicationIcon.constants';
import { AppIconProps } from 'src/molecules/ApplicationIcon/ApplicationIcon.types';

import styled, { css } from 'styled-components';

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
    width: 100%;
    height: 100%;
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
          transform: scale(1.08);
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
  box-shadow: rgb(0, 0, 0) 0 0 12px;
  // This background is set to hex and not rgba because design do not want this color to change in dark mode , 18 march 2024.
  background: ${colors.interactive.primary__resting.hex};
  transition: all 3s cubic-bezier(0.25, 1, 0.5, 1);
  transform: rotate(${(props) => props.$rotation}deg);
  pointer-events: none;
`;

interface ApplicationIconBaseProps extends AppIconProps {
  shapes: ShapeProps[];
  children: ReactElement;
}

export const ApplicationIconBase = forwardRef<
  HTMLDivElement,
  ApplicationIconBaseProps
>(({ size, shapes, iconOnly, withHover, grayScale = false, children }, ref) => {
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
        {children}
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
      {children}
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
});

ApplicationIconBase.displayName = 'ApplicationIconBase';
