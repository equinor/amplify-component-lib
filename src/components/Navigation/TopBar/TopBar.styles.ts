import { Button } from '@equinor/eds-core-react';
import {
  CircularProgress as EDSCircularProgress,
  TopBar as EDSTopBar,
  Typography,
} from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { spacings } from 'src/style';
import { EnvironmentType } from 'src/types/Environment';

import styled from 'styled-components';

const { colors } = tokens;

export const Bar = styled(EDSTopBar)`
  border-bottom: 1px solid ${colors.ui.background__medium.rgba};
  padding-left: 10px;
  position: relative;
`;

export const AppIdentifier = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${spacings.medium_small};
  padding: 5px;
  &:hover {
    border-radius: 8px;
    outline: none;
  }
  &:focus {
    border-radius: 8px;
    outline: 2px dashed ${colors.interactive.primary__resting.rgba};
  }
`;

export const AppAndFieldContainer = styled(EDSTopBar.Header)`
  display: flex;
  align-items: center;
  gap: ${spacings.medium};
`;

interface AppNameProps {
  $capitalize: boolean;
}

export const AppName = styled(Typography)<AppNameProps>`
  text-transform: ${(props) => (props.$capitalize ? 'capitalize' : 'none')};
`;

export const CircularProgress = styled(EDSCircularProgress)`
  circle {
    stroke: ${colors.interactive.primary__resting.rgba};
  }
  circle:first-child {
    stroke: ${colors.interactive.primary__hover_alt.rgba};
  }
`;

interface EnvironmentTagProps {
  $environmentType: EnvironmentType;
}

function environmentStyling(envType: EnvironmentType): string {
  let backgroundColor = 'none';
  let borderColor = 'none';
  if (envType === EnvironmentType.LOCALHOST) {
    backgroundColor = colors.interactive.disabled__fill.rgba;
    borderColor = colors.interactive.disabled__text.rgba;
  } else if (envType === EnvironmentType.DEVELOP) {
    backgroundColor = colors.ui.background__info.rgba;
    borderColor = colors.infographic.substitute__blue_overcast.rgba;
  } else if (envType === EnvironmentType.STAGING) {
    backgroundColor = colors.ui.background__warning.rgba;
    borderColor = colors.interactive.warning__text.rgba;
  }
  return `
    background-color: ${backgroundColor};
    border: 1px solid ${borderColor};
  `;
}

export const EnvironmentTag = styled.div<EnvironmentTagProps>`
  width: 214px;
  height: 36px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-transform: capitalize;
  ${(props) => environmentStyling(props.$environmentType)}
`;

export const UnreadRedDot = styled.div`
  background-color: ${colors.interactive.danger__resting.rgba};
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: absolute;
  right: 2px;
  top: 4px;
  border: 2px solid ${colors.text.static_icons__primary_white.rgba};
  // Box-sizing is a quickfix for use in PWEX because of global styling
  box-sizing: content-box;
`;

interface ButtonProps {
  $isSelected: boolean;
  $fieldSelector?: boolean;
}

export const TopBarButton = styled(Button)<ButtonProps>`
  height: ${({ $fieldSelector }) => ($fieldSelector ? '' : '36px')};
  width: ${({ $fieldSelector }) => ($fieldSelector ? '' : '36px')};
  border: ${({ $isSelected }) =>
    $isSelected ? `1px solid #132E31` : '1px solid none'};
  color: ${({ $isSelected }) =>
    $isSelected ? '#132E31' : colors.interactive.primary__resting.rgba};
  &:hover ${UnreadRedDot} {
    border: 2px solid ${colors.interactive.primary__hover_alt.rgba};
  }
`;
