import { Button, Chip, Icon } from '@equinor/eds-core-react';
import { account_circle, info_circle, more_vertical } from '@equinor/eds-icons';
import { details } from '@equinor/eds-icons';
import { Meta, StoryFn } from '@storybook/react';

import DataCard from './DataCard';

import styled from 'styled-components';

const icons = [account_circle, info_circle, more_vertical, details];
export default {
  title: 'DataDisplay/DataCard',
  component: DataCard,
  argTypes: {
    headerText: { control: 'text' },
    title: { control: 'text' },
    rightIcon: {
      control: 'select',
      options: ['account_circle', 'more_vertical', 'details', 'info_circle'],
    },
    tooltipOnTitle: { control: 'boolean' },
    hasBodyChip: { control: 'boolean' },
    hasBodyButton: { control: 'boolean' },
    bodyChipText: { control: 'text' },
    bodyButtonIcon: {
      control: 'select',
      options: ['more_vertical', 'details', 'info_circle'],
    },
  },
  args: {
    headerText: 'PETROPHYSICIST',
    title: 'Composite',
    rightIcon: 'account_circle',
    tooltipOnTitle: true,
    hasBodyChip: true,
    bodyChipText: 'Responsible user',
    hasBodyButton: true,
    bodyButtonIcon: 'more_vertical',
  },
} as Meta;

const DataTypeCardBody = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 4em;
`;

export const Primary: StoryFn = (args) => {
  const body = (
    <DataTypeCardBody>
      {args.hasBodyChip && <Chip>{args.bodyChipText}</Chip>}
      {args.hasBodyButton && (
        <Button variant="ghost_icon">
          <Icon
            data={icons.find((item) => item.name === args.bodyButtonIcon)}
          />
        </Button>
      )}
    </DataTypeCardBody>
  );
  return (
    <div style={{ width: '300px' }}>
      <DataCard
        headerText={args.headerText}
        title={args.title}
        rightIcon={icons.find((item) => item.name === args.rightIcon)}
        tooltipOnTitle={args.tooltipOnTitle}
        body={body}
      />
    </div>
  );
};
