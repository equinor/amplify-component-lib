import { FC, useState } from 'react';

import { new_label, person, star_outlined } from '@equinor/eds-icons';
import { Meta, StoryObj } from '@storybook/react-vite';

import { ToggleGroup as ToggleGroupProps } from './ToggleGroup.types';
import { ToggleGroup as ToggleGroupComponent } from '.';
import { colors } from 'src/atoms';

interface StoryComponentProps {
  variant: ToggleGroupProps['variant'];
  matchParentHeight: ToggleGroupProps['matchParentHeight'];
  withIcons?: boolean;
  onlyIcons?: boolean;
  disabled?: boolean;
}

const ToggleGroup: FC<StoryComponentProps> = ({
  variant,
  matchParentHeight,
  withIcons = false,
  onlyIcons = false,
  disabled = false,
}) => {
  const [recentlyPublished, setRecentlyPublished] = useState(false);
  const [myFiles, setMyFiles] = useState(true);
  const [favourites, setFavourites] = useState(false);

  return (
    <div
      style={{
        height: '48px',
        outline: matchParentHeight
          ? `1px solid ${colors.ui.background__medium.rgba}`
          : undefined,
        outlineOffset: matchParentHeight ? '10px' : undefined,
      }}
    >
      <ToggleGroupComponent
        variant={variant}
        matchParentHeight={matchParentHeight}
      >
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
    </div>
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
    matchParentHeight: {
      description: 'Parent height in storybook is 48px',
      control: 'boolean',
    },
    withIcons: {
      description: 'This is only used in the story',
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?node-id=16934-23362&m=dev',
    },
    docs: {
      source: {
        language: 'tsx',
        code: `<ToggleGroup variant="outlined|filled">
  <ToggleGroup.Option
    label="My files"
    icon={person} // IconData type
    onToggle={setMyFiles}
    checked={myFiles} 
    disabled={disabled} 
  />
  // at least 2
  ...
</ToggleGroup>
        `,
      },
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

export const MatchParentHeight: Story = {
  args: {
    variant: 'outlined',
    matchParentHeight: true,
  },
};
