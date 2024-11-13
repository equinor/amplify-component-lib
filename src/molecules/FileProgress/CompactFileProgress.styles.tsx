import {
  CircularProgress as EDSCircularProgress,
  Tooltip,
  Typography,
} from '@equinor/eds-core-react';

import { animation, colors, spacings } from 'src/atoms/style';

import styled, { css } from 'styled-components';

export const BORDER_RADIUS = '8px';

interface ContainerProps {
  $isError?: boolean;
}

export const CompactFileProgressContainer = styled.div<ContainerProps>`
  border-radius: 4px;
  margin: 10px 0;
  width: 88px;
  height: 88px;
  box-sizing: border-box;
  position: relative;
  transition: ${animation.transitionMS};
  ${({ $isError }) =>
    $isError &&
    css`
      &:hover {
        background: ${colors.ui.background__warning.rgba};
      }
    `}
`;

export const Title = styled(Typography)`
  margin: ${spacings.small} ${spacings.small} 0 ${spacings.small};
  color: ${colors.text.static_icons__tertiary.rgba};
`;

export const LoadingWrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  border: 2px dashed ${colors.ui.background__medium.rgba};
  display: flex;
  flex-direction: column;
  gap: ${spacings.small};
  justify-content: center;
  align-items: center;
  border-radius: ${BORDER_RADIUS};
`;

export const DoneWrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  border: 2px solid ${colors.ui.background__medium.rgba};
  border-radius: ${BORDER_RADIUS};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  > img {
    object-fit: cover;
    width: 88px;
    height: 88px;
  }
  > svg {
    width: 40px;
    height: 40px;
  }
`;

export const Rejection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.small};
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  font-size: 11px;
  justify-items: center;
  text-align: center;
  border-radius: ${BORDER_RADIUS};
  border: 2px dashed ${colors.interactive.warning__text.rgba};
  > div {
    color: ${colors.interactive.warning__text.rgba};
  }
`;

export const CloseButton = styled.div`
  background-color: ${colors.text.static_icons__tertiary.rgba};
  border-radius: 50%;
  border: 2px solid ${colors.ui.background__light.rgba};
  position: absolute;
  width: 18px;
  height: 18px;
  right: -10px;
  cursor: pointer;
  top: -10px;
  > svg {
    width: 14px;
    height: 14px;
    fill: ${colors.ui.background__light.rgba};
  }
`;

export const AdditionalText = styled(Typography)`
  font-size: 10px;
  padding-top: ${spacings.x_small};
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-wrap: nowrap;
`;

export const FileTooltip = styled(Tooltip)`
  white-space: pre;
`;

export const CircularProgress = styled(EDSCircularProgress)`
  circle {
    stroke: ${colors.interactive.primary__resting.rgba};
  }
  circle:first-child {
    stroke: ${colors.interactive.primary__hover_alt.rgba};
  }
`;
