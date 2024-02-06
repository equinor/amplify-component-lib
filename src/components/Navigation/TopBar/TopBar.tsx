import React, { forwardRef, ReactNode } from 'react';

import {
  CircularProgress as EDSCircularProgress,
  TopBar as EDSTopBar,
  Typography,
} from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import ApplicationIcon from '../../Icons/ApplicationIcon/ApplicationIcon';
import FieldSelector from 'src/components/Navigation/TopBar/FieldSelector';
import { spacings } from 'src/style';
import { EnvironmentType } from 'src/types/Environment';
import { Field } from 'src/types/Field';

import styled from 'styled-components';

const { colors } = tokens;

const Bar = styled(EDSTopBar)`
  border-bottom: 1px solid ${colors.ui.background__medium.rgba};
  padding-left: ${spacings.medium};
  position: relative;
`;

const Header = styled(EDSTopBar.Header)`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  > header {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  > svg {
    justify-self: center;
  }
`;

interface AppNameProps {
  $capitalize: boolean;
}

const AppName = styled(Typography)<AppNameProps>`
  text-transform: ${(props) => (props.$capitalize ? 'capitalize' : 'none')};
`;

const CircularProgress = styled(EDSCircularProgress)`
  position: absolute;
  right: -24px;

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

const EnvironmentTag = styled.div<EnvironmentTagProps>`
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

type TopBarType = {
  onHeaderClick: () => void;
  applicationIcon: string;
  applicationName: string;
  environment?: EnvironmentType;
  isFetching?: boolean;
  capitalize?: boolean;
  children: ReactNode;
  availableFields?: Field[];
  onSelectField?: (selectedField: Field) => void;
  currentField?: Field;
  showAccessITLink?: boolean;
} & React.HTMLAttributes<HTMLElement>;

export const TopBar = forwardRef<HTMLDivElement, TopBarType>(
  (
    {
      children,
      onHeaderClick,
      applicationIcon,
      applicationName,
      environment,
      isFetching = false,
      capitalize = false,
      availableFields,
      onSelectField,
      currentField,
      showAccessITLink,
    },
    ref
  ) => {
    return (
      <Bar ref={ref}>
        <Header>
          <header onClick={onHeaderClick}>
            <ApplicationIcon name={applicationIcon} size={40} withHover />
            <AppName variant="h6" $capitalize={capitalize}>
              {capitalize ? applicationName.toLowerCase() : applicationName}
            </AppName>
          </header>
          {availableFields && onSelectField && (
            <FieldSelector
              availableFields={availableFields}
              onSelect={onSelectField}
              currentField={currentField}
              showAccessITLink={showAccessITLink}
            />
          )}
          {isFetching && <CircularProgress size={16} />}
        </Header>
        {(environment === EnvironmentType.DEVELOP ||
          environment === EnvironmentType.STAGING ||
          environment === EnvironmentType.LOCALHOST) && (
          <EnvironmentTag $environmentType={environment}>
            <Typography group="heading" variant="h5">
              {environment}
            </Typography>
          </EnvironmentTag>
        )}
        {children}
      </Bar>
    );
  }
);

TopBar.displayName = 'TopBar';
