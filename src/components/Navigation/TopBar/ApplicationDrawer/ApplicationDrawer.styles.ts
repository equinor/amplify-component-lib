import { Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { spacings, colors, shape } = tokens;

export const MenuSection = styled.div`
  border-bottom: 1px solid ${colors.ui.background__light.rgba};
  display: flex;
  flex-direction: column;

  padding: ${spacings.comfortable.medium} ${spacings.comfortable.large} 0
    ${spacings.comfortable.large};
  > p {
    margin-left: ${spacings.comfortable.small};
  }
`;

export const ApplicationName = styled.div`
  display: flex;
  align-items: flex-start;
  > p {
    text-align: center;
  }
`;

export const ApplicationContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding-top: ${spacings.comfortable.small};
  justify-items: center;
`;

export const MenuFixedItem = styled.div`
  > div {
    display: grid;
    grid-template-columns: 1fr 24px;
    justify-content: space-between;
    width: 100%;
  }
  &:hover {
    background: ${colors.interactive.primary__selected_hover.rgba};
    cursor: pointer;
  }
  border-top: 1px solid ${colors.ui.background__light.rgba};
  outline: none !important;
  padding: ${spacings.comfortable.medium} ${spacings.comfortable.large}
    ${spacings.comfortable.medium} ${spacings.comfortable.large};
  svg {
    align-self: center;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  > h6 {
    text-transform: capitalize;
  }
`;

export const NoApplications = styled.div`
  display: flex;
  padding: ${spacings.comfortable.medium};
`;

export const LoadingApplications = styled.div`
  display: flex;
  padding: ${spacings.comfortable.large};
  align-items: center;
  grid-column: span 3;
`;

interface ApplicationBoxProps {
  $isSelected?: boolean;
}

export const ApplicationBox = styled.div<ApplicationBoxProps>`
  display: flex;
  height: 96px;
  width: 64px;
  justify-content: center;
  flex-direction: column;
  padding: 0 ${spacings.comfortable.medium};
  gap: ${spacings.comfortable.medium};
  align-items: center;
  background: ${({ $isSelected }) =>
    $isSelected ? colors.interactive.primary__selected_highlight.rgba : 'none'};
  border-radius: ${shape.corners.borderRadius};
  &:hover {
    background: ${colors.interactive.primary__hover_alt.rgba};
    border-radius: ${shape.corners.borderRadius};
  }
`;

export const ApplicationButton = styled(Button)`
  height: 96px;
  width: 64px;
  > span {
    display: flex;
    flex-direction: column;
  }
`;
