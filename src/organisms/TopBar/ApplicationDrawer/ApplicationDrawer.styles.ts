import { Button } from '@equinor/eds-core-react';

import { colors, shape, spacings } from 'src/atoms/style';

import styled from 'styled-components';

export const MenuSection = styled.div`
  border-bottom: 1px solid ${colors.ui.background__light.rgba};
  display: flex;
  flex-direction: column;

  padding: ${spacings.small} ${spacings.medium} ${spacings.medium}
    ${spacings.medium};
  > p {
    margin-left: ${spacings.small};
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
  padding-top: ${spacings.small};
  justify-items: center;
  gap: ${spacings.small};
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
  padding: ${spacings.medium};
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
  padding: ${spacings.medium};
`;

export const LoadingApplications = styled.div`
  display: flex;
  padding: ${spacings.large};
  align-items: center;
  grid-column: span 3;
`;

interface ApplicationBoxProps {
  $isSelected?: boolean;
}

export const ApplicationBox = styled.div<ApplicationBoxProps>`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
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

  > span {
    display: flex;
    flex-direction: column;
  }
`;
