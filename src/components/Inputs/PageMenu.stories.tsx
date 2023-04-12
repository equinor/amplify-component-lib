import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { Story } from '@storybook/react';

import PageMenuProvider, {
  usePageMenu,
} from '../../providers/PageMenuProvider';
import PageMenu from './PageMenu';

import styled from 'styled-components';

const { colors } = tokens;

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
        color: colors.infographic.substitute__blue_ocean.hex,
      },
      {
        label: 'Second section',
        value: 'id-2',
        color: colors.infographic.substitute__blue_sky.hex,
      },
      {
        label: 'Third section',
        value: 'id-3',
        color: colors.infographic.substitute__blue_overcast.hex,
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
  > div:not(:first-child) {
    padding-bottom: 100vh;
    width: calc(100% - 10rem);
    margin-left: 10rem;
    h1 {
      color: white;
    }
  }
`;

function Section({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  const { setItemRef } = usePageMenu();
  return (
    <div style={{ background: color }}>
      <Typography
        variant="h1"
        ref={(current) => setItemRef(current, value)}
        key={value}
        id={value}
      >
        {label}
      </Typography>
    </div>
  );
}

export const Primary: Story = (args) => {
  return (
    <PageMenuProvider items={args.items}>
      <Container>
        <PageMenu />
        {args.items.map((item: any) => (
          <Section key={item.value} {...item} />
        ))}
      </Container>
    </PageMenuProvider>
  );
};
