import { animation, colors, spacings } from 'src/atoms';

import styled from 'styled-components';

export const UploadWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${spacings.small};
  justify-content: center;
  flex-direction: column;
  border: 2px dashed ${colors.interactive.primary__resting.rgba};
  border-radius: 15px;
  padding: ${spacings.medium_small} ${spacings.xx_large};
  /* v8 ignore next */
  background: ${colors.ui.background__light.rgba};
  transition: background ${animation.transitionMS};

  > svg {
    flex-shrink: 0;
  }

  > p {
    text-wrap: nowrap;
  }

  > section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${spacings.x_small};
    margin: calc(${spacings.medium_small} / 2) 0;
  }
`;
export const SmallUploadWrapper = styled(UploadWrapper)`
  width: 88px;
  height: 88px;
  margin-bottom: 1.6em;
  > svg {
    width: 48px;
    height: 48px;
  }
  > p {
    color: ${colors.interactive.primary__resting.rgba};
  }
  > p:last-child {
    color: ${colors.text.static_icons__tertiary.rgba};
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    text-wrap: nowrap;
    position: absolute;
    bottom: calc((1.6em + ${spacings.small}) * -1);
  }

  &:hover {
    cursor: pointer;
    background: ${colors.interactive.primary__hover_alt.rgba};
  }
`;

export const MediumUploadWrapper = styled(UploadWrapper)`
  width: 180px;
  height: 180px;
  gap: 0;
  > svg {
    width: 62px;
    height: 62px;
  }
  > section > p {
    text-wrap: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  > button {
    margin-top: ${spacings.x_small};
    text-wrap: nowrap;
  }
`;

export const DividerRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  width: 100%;
  gap: ${spacings.x_small};
  align-items: center;

  > p {
    color: ${colors.text.static_icons__tertiary.rgba};
  }

  > hr {
    width: 100%;
    height: 2px;
  }
`;
