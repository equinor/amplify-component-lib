import { Tooltip, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { spacings, colors } = tokens;

export const Title = styled(Typography)`
  margin: ${spacings.comfortable.small} ${spacings.comfortable.small} 0
    ${spacings.comfortable.small};
  color: ${colors.text.static_icons__tertiary.hex};
`;

export const FileUploadAreaWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  gap: ${spacings.comfortable.medium_small};
  height: fit-content;
  position: relative;
  > :first-child {
    margin-top: ${spacings.comfortable.medium_small};
  }
`;

// ImageFile.tsx
export const ImageWrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  border: 1px solid ${colors.ui.background__light.hex};
  position: relative;
  > img {
    width: 100%;
    overflow: hidden;
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

export const FileTooltip = styled(Tooltip)`
  white-space: break-spaces;
`;
