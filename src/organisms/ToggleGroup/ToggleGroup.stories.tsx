import { FC, useState } from 'react';

import { new_label, person, star_outlined } from '@equinor/eds-icons';
import { Meta, StoryObj } from '@storybook/react-vite';

import { ToggleGroup as ToggleGroupProps } from './ToggleGroup.types';
import { ToggleGroup as ToggleGroupComponent } from '.';
import { colors } from 'src/atoms/style';
import type { TooltipProps } from 'src/molecules/Tooltip/Tooltip';

import { expect, screen, userEvent, waitFor } from 'storybook/test';

interface StoryComponentProps extends ToggleGroupProps {
  withIcons?: boolean;
  onlyIcons?: boolean;
  withTooltips?: boolean;
  tooltipPlacement?: TooltipProps['placement'];
  disabled?: boolean;
}

const ToggleGroup: FC<StoryComponentProps> = ({
  variant,
  matchParentHeight,
  matchParentWidth,
  withIcons = false,
  onlyIcons = false,
  withTooltips = false,
  tooltipPlacement,
  disabled = false,
}) => {
  const [recentlyPublished, setRecentlyPublished] = useState(false);
  const [myFiles, setMyFiles] = useState(true);
  const [favourites, setFavourites] = useState(false);

  return (
    <div
      style={{
        height: matchParentHeight ? '48px' : undefined,
        width: matchParentWidth ? '100%' : undefined,
        outline:
          matchParentHeight || matchParentWidth
            ? `1px solid ${colors.ui.background__medium.rgba}`
            : undefined,
        outlineOffset:
          matchParentHeight || matchParentWidth ? '10px' : undefined,
      }}
    >
      <ToggleGroupComponent
        variant={variant}
        matchParentHeight={matchParentHeight}
        matchParentWidth={matchParentWidth}
      >
        <ToggleGroupComponent.Option
          onToggle={setRecentlyPublished}
          checked={recentlyPublished}
          disabled={disabled}
          {...(onlyIcons
            ? {
                icon: new_label,
                tooltip: withTooltips ? 'Recently published' : undefined,
                tooltipPlacement,
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
                tooltip: withTooltips ? 'My files' : undefined,
                tooltipPlacement,
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
                tooltip: withTooltips ? 'Favourites' : undefined,
                tooltipPlacement,
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
    tooltipPlacement: {
      description:
        'Passed to each ToggleGroup.Option, not to the ToggleGroup container.',
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      if: { arg: 'withTooltips', truthy: true },
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

export const WithTooltipPlacement: Story = {
  args: {
    onlyIcons: true,
    withTooltips: true,
    tooltipPlacement: 'bottom',
    variant: 'outlined',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Hover an icon to show its tooltip. Use the tooltipPlacement control to compare the four ACL placements: top, bottom, left, and right.',
      },
      source: {
        code: `<ToggleGroup variant="outlined">
  <ToggleGroup.Option
    icon={new_label}
    tooltip="Recently published"
    tooltipPlacement="bottom"
    checked={recentlyPublished}
    onToggle={setRecentlyPublished}
  />
  <ToggleGroup.Option
    icon={person}
    tooltip="My files"
    tooltipPlacement="bottom"
    checked={myFiles}
    onToggle={setMyFiles}
  />
</ToggleGroup>`,
      },
    },
  },
  play: async ({ canvas }) => {
    const icon = canvas.getAllByTestId('eds-icon-path')[0];
    await userEvent.hover(icon);
    const tooltip = await screen.findByRole('tooltip');
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveTextContent('Recently published');

    await userEvent.unhover(icon);
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  },
};

export const MatchParentHeight: Story = {
  args: {
    variant: 'outlined',
    matchParentHeight: true,
  },
};

export const MatchParentWidth: Story = {
  args: {
    variant: 'outlined',
    matchParentWidth: true,
  },
};
