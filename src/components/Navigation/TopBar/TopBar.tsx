import React, { forwardRef, ReactNode } from 'react';

import { Typography } from '@equinor/eds-core-react';

import ApplicationIcon from '../../Icons/ApplicationIcon/ApplicationIcon';
import {
  AppAndFieldContainer,
  AppIdentitfier,
  AppName,
  Bar,
  CircularProgress,
  EnvironmentTag,
} from './TopBar.styles';
import FieldSelector from 'src/components/Navigation/TopBar/FieldSelector';
import { EnvironmentType } from 'src/types/Environment';
import { Field } from 'src/types/Field';

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
          <AppIdentitfier onClick={onHeaderClick} tabIndex={0}>
            <ApplicationIcon name={applicationIcon} size={36} withHover />
            <AppName
              group="navigation"
              variant="menu_title"
              $capitalize={capitalize}
            >
              {capitalize ? applicationName.toLowerCase() : applicationName}
            </AppName>
          </AppIdentitfier>
          {availableFields && onSelectField && (
            <FieldSelector
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
