import { Tooltip, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { spacings, colors } = tokens;

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
  transition: 0.3s;
  ${({ $isError }) =>
    $isError &&
    `&:hover { 
        background: ${colors.ui.background__warning.hex}
    }`}
`;

export const Title = styled(Typography)`
  margin: ${spacings.comfortable.small} ${spacings.comfortable.small} 0
    ${spacings.comfortable.small};
  color: ${colors.text.static_icons__tertiary.hex};
`;

export const LoadingWrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  border: 1px dashed ${colors.ui.background__medium.hex};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

export const ImageWrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  border: 1px solid ${colors.ui.background__light.hex};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  > img {
    width: 100%;
    overflow: hidden;
    text-align: center;
  }
`;

export const Rejection = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  font-size: 11px;
  justify-items: center;
  text-align: center;
  border-radius: 4px;
  border: 1px dashed ${colors.interactive.warning__text.hex};
  gap: 0;
  > svg {
    grid-row: 2/3;
  }
  > div {
    grid-row: 3/4;
    color: ${colors.interactive.warning__text.hex};
  }
`;

export const CloseButton = styled.div`
  background-color: ${colors.text.static_icons__tertiary.hex};
  border-radius: 50%;
  border: 2px solid ${colors.text.static_icons__primary_white.rgba};
  position: absolute;
  width: 18px;
  height: 18px;
  right: -10px;
  cursor: pointer;
  top: -10px;
  > svg {
    width: 18px;
    height: 18px;
    fill: ${colors.text.static_icons__primary_white.rgba};
  }
`;

export const AdditionalText = styled(Typography)`
  font-size: 10px;
  padding-top: ${spacings.comfortable.x_small};
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const FileTooltip = styled(Tooltip)`
  white-space: pre;
`;
