import { Typography } from '@equinor/eds-core-react';
import { info_circle, pipe_support, save, tune } from '@equinor/eds-icons';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { BaseChipProps, Chip } from './Chip';
import { InteractiveChipProps } from './InteractiveChip';
import { colors } from 'src/atoms/style/colors';
import page from 'src/molecules/Chip/Chips.docs.mdx';
import { Stack } from 'src/storybook';

import { action } from 'storybook/actions';
import styled from 'styled-components';

const handleDelete = action('onDelete');
const handleClick = action('onClick');

const meta: Meta<typeof Chip> = {
  title: 'Molecules/Chips',
  component: Chip,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?node-id=2382-84328&m=dev',
    },
    docs: {
      page,
      source: {
        excludeDecorators: true,
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <Stack
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          }}
        >
          <Story />
        </Stack>
      );
    },
  ],
  argTypes: {
    disabled: {
      control: 'boolean',
      name: 'Disabled',
      defaultValue: false,
    },
    variant: {
      control: {
        type: 'radio',
        options: ['default', 'white', 'warning', 'error'],
      },
      name: 'Variant',
      defaultValue: 'active',
    },
    children: {
      control: 'radio',
      options: ['Short Text', 'Long Text'],
      mapping: {
        'Short Text': 'Chip Text',
        'Long Text': 'Some Long Chip Text',
      },
      defaultValue: 'Short Text',
    },
    onClick: {
      control: 'radio',

      options: ['none', 'Can be clicked'],
      defaultValue: 'none',
      mapping: {
        none: undefined,
        'Can be clicked': handleClick,
      },
      description:
        'Sets the onClick action to be undefined, or sends the handleClick-action',
    },
    onDelete: {
      control: 'radio',
      options: ['none', 'Can be deleted'],
      mapping: {
        none: undefined,
        'Can be deleted': handleDelete,
      },
      description:
        'Sets the onDelete action to be undefined, or sends the handleDelete-action, if both onClick and onDelete are present, onDelete is executed',
      defaultValue: 'none',
    },
    leadingIconData: {
      control: 'select',
      options: ['none', 'info_circle', 'pipe_support', 'save', 'tune'],
      mapping: {
        none: undefined,
        info_circle: info_circle,
        pipe_support: pipe_support,
        save: save,
        tune: tune,
      },
      description:
        'List only represent a few examples of icons, any Icon from EDS can be used',
      defaultValue: 'none',
    },
  },
};

export default meta;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 1fr repeat(4, auto);
  gap: 16px;
  align-items: center;
  justify-items: center;

  > section {
    display: flex;
    justify-content: flex-end;
    justify-self: flex-end;
    align-items: center;
    gap: 4px;
    svg {
      fill: ${colors.text.static_icons__default.rgba};
    }
    > p {
      color: ${colors.text.static_icons__default.rgba};
      text-transform: capitalize;
      text-align: center;
    }
    &.header {
      justify-self: center;
      flex-direction: column;
      align-self: flex-end;
      &:first-child {
        grid-column: 2;
      }
    }
  }
`;

const RowHeader = () => (
  <svg
    width="24"
    height="40"
    viewBox="0 0 24 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M-8.74228e-07 20C-8.50087e-07 20.5523 0.447714 21 0.999999 21L4 21L4 27L4 29L4 31.8715C4 36.3607 7.58172 40 12 40L22.9839 40C23.5451 40 24 39.5451 24 38.9839C24 38.4228 23.5451 37.9679 22.9839 37.9679L12 37.9679C8.68629 37.9679 6 35.2384 6 31.8715L6 29L6 27L6 13L6 11L6 8.12851C6 4.76157 8.68629 2.03213 12 2.03213L22.9839 2.03213C23.5451 2.03213 24 1.57722 24 1.01606C24 0.454905 23.5451 -1.02919e-06 22.9839 -1.00466e-06L12 -5.24537e-07C7.58172 -3.31408e-07 4 3.63926 4 8.12851L4 11L4 13L4 19L0.999999 19C0.447714 19 -8.98369e-07 19.4477 -8.74228e-07 20ZM5 31.8715C5 35.8235 8.14897 39 12 39L22.9839 39L22.987 38.9998L22.9882 38.9997L22.9899 38.9991C22.9899 38.9991 22.9931 38.9975 22.9953 38.9953C22.9975 38.9931 22.9991 38.9899 22.9991 38.9899L22.9997 38.9882L22.9999 38.9863L23 38.9839L22.9999 38.9811L22.9997 38.9796L22.9991 38.978C22.9991 38.978 22.9975 38.9748 22.9953 38.9726C22.9931 38.9704 22.9899 38.9687 22.9899 38.9687L22.9882 38.9682C22.9882 38.9682 22.9864 38.9679 22.9839 38.9679L12 38.9679C8.11904 38.9679 5 35.7756 5 31.8715ZM5 8.12851C5 4.17646 8.14897 1 12 0.999999L22.9839 0.999999C22.9864 0.999999 22.9882 1.00034 22.9882 1.00034L22.9899 1.00085C22.9899 1.00085 22.9931 1.00252 22.9953 1.0047C22.9975 1.00688 22.9991 1.01012 22.9991 1.01012L22.9997 1.01177L22.9999 1.01374L23 1.01606C23 1.01849 22.9997 1.02036 22.9997 1.02036L22.9991 1.02201C22.9991 1.02201 22.9975 1.02524 22.9953 1.02742C22.9943 1.02838 22.9932 1.02924 22.9922 1.02991L22.9899 1.03128L22.9882 1.03179C22.9882 1.03179 22.9864 1.03213 22.9839 1.03213L12 1.03213C8.11904 1.03213 5 4.22437 5 8.12851Z"
    />
  </svg>
);

const ColumnHeader = () => (
  <svg
    width="89"
    height="24"
    viewBox="0 0 89 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M45 0C44.4477 0 44 0.447715 44 1V4H13H8.12851C3.63926 4 0 7.58172 0 12V22.9839C0 23.5451 0.454908 24 1.01606 24C1.57722 24 2.03213 23.5451 2.03213 22.9839V12C2.03213 8.68629 4.76157 6 8.12851 6H13H76H80.8715C84.2384 6 86.9679 8.68629 86.9679 12V22.9839C86.9679 23.5451 87.4228 24 87.9839 24C88.5451 24 89 23.5451 89 22.9839V12C89 7.58172 85.3607 4 80.8715 4H76H46V1C46 0.447715 45.5523 0 45 0ZM8.12851 5C4.17646 5 1 8.14897 1 12V22.9839L1.00017 22.987L1.00034 22.9882L1.00085 22.9899C1.00085 22.9899 1.00252 22.9931 1.0047 22.9953C1.00689 22.9975 1.01012 22.9991 1.01012 22.9991L1.01177 22.9997L1.01374 22.9999L1.01606 23L1.01892 22.9999L1.02036 22.9997L1.02201 22.9991C1.02201 22.9991 1.02524 22.9975 1.02742 22.9953C1.0296 22.9931 1.03128 22.9899 1.03128 22.9899L1.03179 22.9882C1.03179 22.9882 1.03213 22.9864 1.03213 22.9839V12C1.03213 8.11904 4.22437 5 8.12851 5ZM80.8715 5C84.8235 5 88 8.14897 88 12V22.9839C88 22.9864 87.9997 22.9882 87.9997 22.9882L87.9991 22.9899C87.9991 22.9899 87.9975 22.9931 87.9953 22.9953C87.9931 22.9975 87.9899 22.9991 87.9899 22.9991L87.9882 22.9997L87.9863 22.9999L87.9839 23L87.9817 22.9999L87.9796 22.9997L87.978 22.9991C87.978 22.9991 87.9748 22.9975 87.9726 22.9953C87.9704 22.9931 87.9687 22.9899 87.9687 22.9899L87.9682 22.9882L87.968 22.9869L87.9679 22.9839V12C87.9679 8.11904 84.7756 5 80.8715 5Z"
    />
  </svg>
);

type Story = StoryObj<typeof Chip>;

export const DefaultChip: Story = {
  args: {
    children: 'Chip Text',
    onClick: handleClick,
  },
};

export const ReadOnlyChip: Story = {
  args: {
    children: 'Chip Text',
  },
};

const CHIP_VARIANTS: BaseChipProps['variant'][] = [
  'default',
  'warning',
  'error',
  'white',
];

const Template: StoryFn<InteractiveChipProps> = (args) => (
  <Grid>
    <section className="header">
      <Typography variant="ingress">Read only</Typography>
      <ColumnHeader />
    </section>
    <section className="header">
      <Typography variant="ingress">Clickable</Typography>
      <ColumnHeader />
    </section>
    <section className="header">
      <Typography variant="ingress">Deletable</Typography>
      <ColumnHeader />
    </section>
    <section className="header">
      <Typography variant="ingress">Selected</Typography>
      <ColumnHeader />
    </section>
    <section className="header">
      <Typography variant="ingress">
        Selected+
        <br />
        Disabled
      </Typography>
      <ColumnHeader />
    </section>
    <section className="header">
      <Typography variant="ingress">Disabled</Typography>
      <ColumnHeader />
    </section>
    {CHIP_VARIANTS.flatMap((variant) => [
      <section key={`${variant}-header`}>
        <Typography variant="ingress">{variant}</Typography>
        <RowHeader />
      </section>,
      <Chip
        key={`${variant}-readonly`}
        {...args}
        leadingIconData={undefined}
        onClick={undefined}
        onDelete={undefined}
        variant={variant}
      />,
      <Chip
        key={`${variant}-clickable`}
        {...args}
        leadingIconData={undefined}
        onClick={handleClick}
        onDelete={undefined}
        variant={variant}
      />,
      <Chip
        key={`${variant}-deletable`}
        {...args}
        leadingIconData={undefined}
        onClick={undefined}
        onDelete={handleDelete}
        variant={variant}
      />,
      <Chip
        key={`${variant}-selected`}
        {...args}
        leadingIconData={undefined}
        selected
        variant={variant}
      />,
      <Chip
        key={`${variant}-selected-disabled`}
        {...args}
        leadingIconData={undefined}
        selected
        disabled
        variant={variant}
      />,
      <Chip
        key={`${variant}-disabled`}
        {...args}
        leadingIconData={undefined}
        disabled
        variant={variant}
      />,
    ])}
  </Grid>
);

export const ChipVariantsWithStates = Template.bind({});
ChipVariantsWithStates.args = {
  children: 'Chip Text',
  leadingIconData: save,
  onClick: handleClick,
};
