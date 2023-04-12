import { Typography } from '@equinor/eds-core-react';
import { Story } from '@storybook/react';

import PageMenuProvider from '../../providers/PageMenuProvider';
import PageMenu from './PageMenu';

import styled from 'styled-components';

export default {
  title: 'Inputs/PageMenu',
  component: PageMenu,
  argTypes: {
    items: { control: 'array' },
  },
  args: {
    items: [
      {
        label: 'First section',
        value: 'id-1',
      },
      {
        label: 'Second section',
        value: 'id-2',
      },
      {
        label: 'Third section',
        value: 'id-3',
      },
    ],
  },
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  > div:first-child {
    position: fixed;
    top: 12px;
    left: 12px;
  }
  h1 {
    margin-bottom: 50vh;
    margin-left: 50%;
  }
`;

export const Primary: Story = (args) => {
  return (
    <PageMenuProvider items={args.items}>
      <Container>
        <PageMenu />
        {args.items.map((item: { value: string; label: string }) => (
          <Typography variant="h1" key={item.value} id={item.value}>
            {item.label}
          </Typography>
        ))}
      </Container>
    </PageMenuProvider>
  );
};
