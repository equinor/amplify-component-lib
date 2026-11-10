import { animation, colors, shape, spacings } from 'src/atoms/style';

import styled, { css } from 'styled-components';

export const Container = styled.ol`
  display: flex;
  flex-direction: column;
  gap: ${spacings.x_small};
  list-style: none;
  margin: 0;
  padding: 0 ${spacings.small};
  min-width: 280px;
`;

interface ItemProps {
  $hovered: boolean;
}

export const Item = styled.li<ItemProps>`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: ${spacings.small};
  padding: ${spacings.small};
  border-radius: ${shape.corners.borderRadius};
  transition: background ${animation.transitionMS};
  ${({ $hovered }) =>
    $hovered &&
    css`
      background: ${colors.interactive.primary__hover_alt.rgba};
    `}
`;

interface NumberProps {
  $filled: boolean;
  $size: number;
  $disabled?: boolean;
  $offset?: number;
}

export const NumberContainer = styled.span<NumberProps>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: ${({ $offset = 0 }) => $offset}px;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: ${shape.circle.borderRadius};
  border: 1px solid
    ${({ $disabled }) =>
      $disabled
        ? colors.interactive.disabled__text.rgba
        : colors.interactive.primary__resting.rgba};
  background: ${({ $filled }) =>
    $filled ? colors.interactive.primary__resting.rgba : 'none'};
  color: ${({ $filled, $disabled }) => {
    if ($filled) return colors.text.static_icons__primary_white.rgba;
    if ($disabled) return colors.interactive.disabled__text.rgba;
    return colors.interactive.primary__resting.rgba;
  }};
  font-size: ${({ $size }) => ($size > 20 ? 16 : 12)}px;
  font-weight: 500;
  line-height: 1;
`;

interface LineProps {
  $active: boolean;
}

export const Line = styled.span<LineProps>`
  flex: 1;
  width: 1px;
  background: ${({ $active }) =>
    $active
      ? colors.interactive.primary__resting.rgba
      : colors.ui.background__heavy.rgba};
`;

export const NumberAndLine = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacings.small};
`;

export const StepButton = styled.button`
  all: unset;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  cursor: pointer;
  &:focus-visible {
    outline: 1px dashed ${colors.interactive.primary__resting.rgba};
    outline-offset: 2px;
  }
  &[aria-disabled='true'] {
    cursor: not-allowed;
  }
`;

interface TitleRowProps {
  $size: 'step' | 'substep';
  $disabled?: boolean;
}

export const TitleRow = styled.span<TitleRowProps>`
  display: flex;
  align-items: center;
  gap: ${spacings.small};
  white-space: nowrap;
  color: ${({ $disabled }) =>
    $disabled
      ? colors.interactive.disabled__text.rgba
      : colors.text.static_icons__default.rgba};
  font-weight: 500;
  letter-spacing: 0.2px;
  font-size: ${({ $size }) => ($size === 'step' ? 18 : 16)}px;
  line-height: 24px;
`;

interface DescriptionProps {
  $expanded: boolean;
}

export const Description = styled.span<DescriptionProps>`
  display: grid;
  grid-template-rows: ${({ $expanded }) => ($expanded ? '1fr' : '0fr')};
  opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
  transition:
    grid-template-rows ${animation.transitionMS},
    opacity ${animation.transitionMS};
  color: ${colors.text.static_icons__secondary.rgba};
  font-size: 16px;
  line-height: 20px;
  > span {
    overflow: hidden;
    min-height: 0;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.small};
  padding-bottom: ${spacings.medium};
  min-width: 0;
`;

export const SubSteps = styled.ol`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
`;

interface SubStepItemProps {
  $hovered: boolean;
}

export const SubStepItem = styled.li<SubStepItemProps>`
  display: flex;
  gap: ${spacings.small};
  padding: ${spacings.x_small};
  border-radius: ${shape.corners.borderRadius};
  transition: background ${animation.transitionMS};
  ${({ $hovered }) =>
    $hovered &&
    css`
      background: ${colors.interactive.primary__hover_alt.rgba};
    `}
`;

export const MissingInputs = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${spacings.x_small};
  padding: ${spacings.x_small} ${spacings.small} ${spacings.x_small}
    ${spacings.x_small};
  border-radius: ${shape.rounded.borderRadius};
  background: ${colors.dataviz.orange.lighter};
  color: ${colors.dataviz.orange.darker};
  font-size: 12px;
  line-height: 16px;
`;

export const StepHeader = styled.div`
  display: flex;
  flex-direction: column;
`;
