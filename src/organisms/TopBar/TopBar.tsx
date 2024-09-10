import React, { forwardRef, ReactNode } from 'react';

import { FieldMenu } from './FieldMenu/FieldMenu';
import {
  AppAndFieldContainer,
  AppIdentifier,
  AppName,
  Bar,
  CircularProgress,
  EnvironmentTag,
} from './TopBar.styles';
import { EnvironmentType } from 'src/atoms/enums/Environment';
import { Field } from 'src/atoms/types/Field';
import { Typography } from 'src/molecules';
import { ApplicationIcon } from 'src/molecules/ApplicationIcon/ApplicationIcon';

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
        <AppAndFieldContainer>
          <AppIdentifier onClick={onHeaderClick} tabIndex={0}>
            <ApplicationIcon name={applicationIcon} size={32} withHover />
            <AppName
              group="navigation"
              variant="menu_title"
              $capitalize={capitalize}
            >
              {capitalize ? applicationName.toLowerCase() : applicationName}
            </AppName>
          </AppIdentifier>
          {availableFields && onSelectField && (
            <FieldMenu
              availableFields={availableFields}
              onSelect={onSelectField}
              currentField={currentField}
              showAccessITLink={showAccessITLink}
            />
          )}
          {isFetching && <CircularProgress size={16} />}
        </AppAndFieldContainer>
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
