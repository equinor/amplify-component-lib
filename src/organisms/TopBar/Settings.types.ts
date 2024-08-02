import { ReactElement } from 'react';

interface GenericSettingsSectionItem {
  label: string;
  name: string;
  colorBox?: string;
  element?: ReactElement;
  text?: string;
  disabled?: boolean;
}

interface GenericSettingsSection {
  title: string;
}

// Forcing use of string or number here still works with enums

type StringSettingsSection = GenericSettingsSection & {
  value: string;
  onChange?: (val: string) => void;
  items: (GenericSettingsSectionItem & {
    value: string;
  })[];
};

type NumberSettingsSection = GenericSettingsSection & {
  value: number;
  onChange?: (val: number) => void;
  items: (GenericSettingsSectionItem & {
    value: number;
  })[];
};

export type SettingsSection = StringSettingsSection | NumberSettingsSection;
