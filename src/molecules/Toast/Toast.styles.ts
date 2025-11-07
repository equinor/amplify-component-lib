import { shape, spacings } from 'src/atoms';
import { ToastProps } from 'src/molecules';
import { TOAST_COLORS } from 'src/molecules/Toast/Toast.utils';

import styled, { css, keyframes } from 'styled-components';

export const Header = styled.header`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: ${spacings.medium};
  overflow: hidden;
  > h6 {
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: calc((40px - 24px) / 2);
  }
  > svg:first-child {
    margin-top: calc((40px - 24px) / 2);
    margin-left: calc((40px - 24px) / 2);
  }
`;

interface ContainerProps {
  $variant: ToastProps['variant'];
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${spacings.small};
  border-radius: ${shape.corners.borderRadius};
  padding: ${spacings.medium_small};
  overflow: hidden;
  min-width: 300px;
  max-width: 420px;
  > p,
  > button {
    margin: 0 ${spacings.small};
  }

  ${({ $variant }) => {
    const usingColors = TOAST_COLORS[$variant ?? 'neutral'];

    return css`
      background: ${usingColors.background};

      > button {
        margin-right: auto;
        color: ${usingColors.icon};
        border-color: ${usingColors.icon};
        &:hover {
          background: none;
          color: ${usingColors.actionHover};
          border-color: ${usingColors.actionHover};
          &:before {
            position: absolute;
            left: 0;
            content: '';
            width: 100%;
            height: 100%;
            background: ${usingColors.icon};
            opacity: 0.15;
            overflow: visible;
          }
        }
      }

      > ${Header} {
        > svg:first-child {
          color: ${usingColors.icon};
        }
        > button {
          svg {
            color: ${usingColors.close};
          }
          &:hover {
            background: none;
            &:before {
              position: absolute;
              left: 0;
              content: '';
              width: 100%;
              height: 100%;
              background: ${usingColors.close};
              opacity: 0.15;
              border-radius: 50%;
              overflow: visible;
            }
          }
        }
      }
    `;
  }}
`;
const durationAnimation = keyframes`
 from {
   width: 100%
 }
  to {
    width: 0
  }
`;

interface DurationBarProps {
  $duration: number;
  $variant?: ToastProps['variant'];
}

export const DurationBar = styled.span<DurationBarProps>`
  background: ${({ $variant }) => TOAST_COLORS[$variant ?? 'neutral'].duration};
  width: 100%;
  height: 2px;
  position: absolute;
  bottom: 0;
  left: 0;
  animation: ${durationAnimation} ${({ $duration }) => $duration}s linear;
  animation-fill-mode: forwards;
`;
