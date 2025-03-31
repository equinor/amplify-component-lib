import { ComponentType, FC, useState } from 'react';

import { new_label, person, star_outlined } from '@equinor/eds-icons';
import { Meta, StoryObj } from '@storybook/react';

import { ToggleGroup as ToggleGroupProps } from './ToggleGroup.types';
import { ToggleGroup as ToggleGroupComponent } from '.';
import { ToggleGroupOption } from 'src/organisms/ToggleGroup/ToggleGroupOption';

interface StoryComponentProps {
  variant: ToggleGroupProps['variant'];
  withIcons?: boolean;
  onlyIcons?: boolean;
  disabled?: boolean;
}

const ToggleGroup: FC<StoryComponentProps> = ({
  variant,
  withIcons = false,
  onlyIcons = false,
  disabled = false,
}) => {
  const [recentlyPublished, setRecentlyPublished] = useState(false);
  const [myFiles, setMyFiles] = useState(true);
  const [favourites, setFavourites] = useState(false);

  return (
    <ToggleGroupComponent variant={variant}>
      <ToggleGroupComponent.Option
        onToggle={setRecentlyPublished}
        checked={recentlyPublished}
        disabled={disabled}
        {...(onlyIcons
          ? {
              icon: new_label,
            }
          : {
              label: 'Recently published',
              icon: withIcons ? new_label : undefined,
            })}
      />
      <ToggleGroupComponent.Option
        onToggle={setMyFiles}
        checked={myFiles}
        {...(onlyIcons
          ? {
              icon: person,
            }
          : {
              label: 'My files',
              icon: withIcons ? person : undefined,
            })}
      />
      <ToggleGroupComponent.Option
        onToggle={setFavourites}
        checked={favourites}
        {...(onlyIcons
          ? {
              icon: star_outlined,
            }
          : {
              label: 'Favourites',
              icon: withIcons ? star_outlined : undefined,
            })}
      />
    </ToggleGroupComponent>
  );
};

const meta: Meta = {
  title: 'Organisms/ToggleGroup',
  component: ToggleGroup,
  argTypes: {
    variant: {
      control: 'radio',
      options: ['outlined', 'filled', 'ghost'],
    },
    withIcons: {
      description: 'This is only used in the story',
      control: 'boolean',
    },
  },
  subcomponents: {
    'ToggleGroup.Option': ToggleGroupOption as ComponentType<unknown>,
  },
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: '',
    },
  },
  args: {
    withIcons: true,
  },
};

export default meta;
type Story = StoryObj<StoryComponentProps>;

export const Outlined: Story = {
  args: {
    variant: 'outlined',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
};

export const OutlinedWithDisabled: Story = {
  args: {
    variant: 'outlined',
    disabled: true,
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
  },
};

export const FilledWithDisabled: Story = {
  args: {
    variant: 'filled',
    disabled: true,
  },
};

export const OnlyIconsFilled: Story = {
  args: {
    onlyIcons: true,
    variant: 'filled',
  },
};
export const OnlyIconsOutlined: Story = {
  args: {
    onlyIcons: true,
    variant: 'outlined',
  },
};
