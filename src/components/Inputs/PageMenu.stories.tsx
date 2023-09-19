import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { StoryFn } from '@storybook/react';

import PageMenuProvider from '../../providers/PageMenuProvider';
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
  position: relative;
  gap: 1rem;
  width: 100%;
  > div {
    position: sticky;
    top: 12px;
    left: 12px;
    height: fit-content;
  }
  > section {
    max-height: 50rem;
    overflow: auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    > div {
      padding-bottom: 100vh;
      width: 100%;
      h1 {
        color: white;
      }
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
  return (
    <div style={{ background: color }}>
      <Typography variant="h1" key={value} id={value}>
        {label}
      </Typography>
    </div>
  );
}

export const Primary: StoryFn = (args) => {
  return (
    <PageMenuProvider items={args.items}>
      <Container>
        <PageMenu />
        <section>
          {args.items.map((item: any) => (
            <Section key={item.value} {...item} />
          ))}
        </section>
      </Container>
    </PageMenuProvider>
  );
};
