import React, { forwardRef, ReactNode } from 'react';

import { Typography } from '@equinor/eds-core-react';

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
import { ApplicationIcon } from 'src/molecules/ApplicationIcon/ApplicationIcon';

export type TopBarBaseProps = {
  applicationIcon: string;
  applicationName: string;
  /** @deprecated - Not needed anymore, clicking header wil go to '/' by default */
  onHeaderClick?: () => void;
  /** @param - Path when clicking header */
  headerLink?: string;
  environment?: EnvironmentType;
  isFetching?: boolean;
  capitalize?: boolean;
  children: ReactNode;
  availableFields?: Field[];
  onSelectField?: (selectedField: Field) => void;
  currentField?: Field;
  showAccessITLink?: boolean;
  itemNameSingular?: string; // Defaults to 'field'
} & React.HTMLAttributes<HTMLElement>;

export const TopBar = forwardRef<HTMLDivElement, TopBarBaseProps>(
  (
    {
      id,
      children,
      headerLink,
      applicationIcon,
      applicationName,
      environment,
      isFetching = false,
      capitalize = false,
      availableFields,
      onSelectField,
      currentField,
      showAccessITLink,
      itemNameSingular,
    },
    ref
  ) => (
    <Bar ref={ref}>
      <AppAndFieldContainer id={id}>
        <AppIdentifier tabIndex={0} to={headerLink || '/'}>
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
            itemNameSingular={itemNameSingular}
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
  )
);

TopBar.displayName = 'TopBar';
