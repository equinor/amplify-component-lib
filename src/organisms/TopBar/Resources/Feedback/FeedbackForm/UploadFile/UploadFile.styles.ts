import { Tooltip, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { spacings } from 'src/atoms/style';

import styled from 'styled-components';

const { colors } = tokens;

export const Title = styled(Typography)`
  margin: ${spacings.small} ${spacings.small} 0 ${spacings.small};
  color: ${colors.text.static_icons__tertiary.rgba};
`;

export const FileUploadAreaWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  gap: ${spacings.medium_small};
  height: fit-content;
  position: relative;
  > :first-child {
    margin-top: ${spacings.medium_small};
  }
`;

// ImageFile.tsx
export const ImageWrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  height: 88px;
  width: 88px;
  margin-top: 2px;
  border-radius: 4px;
  border: 1px solid ${colors.ui.background__medium.rgba};
  position: relative;
  transition: 0.1s ease-in;
  > img {
    width: 100%;
    overflow: hidden;
  }
  &:hover {
    background-color: ${colors.ui.background__semitransparent.rgba};
  }
`;

export const Rejection = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  align-items: center;
  justify-content: center;
  height: 88px;
  width: 88px;
  margin-top: 2px;
  font-size: 11px;
  justify-items: center;
  text-align: center;
  border-radius: 4px;
  border: 1px dashed ${colors.interactive.warning__text.rgba};
  gap: 0;
  transition: 0.1s ease-in;
  > svg {
    grid-row: 2/3;
  }
  > div {
    grid-row: 3/4;
    color: ${colors.interactive.warning__text.rgba};
  }
  &:hover {
    background-color: ${colors.interactive.warning__highlight.rgba};
  }
`;

export const CloseButton = styled.div`
  background-color: ${colors.text.static_icons__tertiary.rgba};
  border-radius: 50%;
  border: 2px solid ${colors.ui.background__default.rgba};
  position: absolute;
  width: 18px;
  height: 18px;
  right: -20px;
  top: -8px;
  transition: 0.1s ease-in;
  cursor: pointer;
  > svg {
    width: 18px;
    height: 18px;
    fill: ${colors.ui.background__default.rgba};
  }

  &:hover {
    background-color: ${colors.text.static_icons__default.rgba};
  }
`;

export const FileTooltip = styled(Tooltip)`
  white-space: pre;
`;
