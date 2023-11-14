import { ReactNode } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { faker } from '@faker-js/faker';
import { StoryFn } from '@storybook/react';

import PageMenuProvider, {
  PageMenuItemType,
} from '../../../providers/PageMenuProvider';
import PageMenu from './PageMenu';

import styled from 'styled-components';

const { colors } = tokens;

export default {
  title: 'Navigation/PageMenu',
  component: PageMenu,
  argTypes: {
    items: { control: 'array' },
    onlyShowSelectedChildren: { control: 'boolean' },
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
    onlyShowSelectedChildren: false,
  },
};

const Container = styled.div`
  display: flex;
  position: relative;
  gap: 1rem;
  width: 100%;
  > .page-menu {
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
      > div {
        padding-bottom: 20%;
      }
    }
  }
`;

function Section({
  label,
  value,
  color,
  children,
}: {
  label: string;
  value: string;
  color: string;
  children?: ReactNode;
}) {
  return (
    <div style={{ background: color }}>
      <Typography variant="h1" key={value} id={value}>
        {label}
      </Typography>
      {children}
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

const ITEMS_WITH_CHILDREN: PageMenuItemType[] = [
  {
    label: '2023',
    value: 'year2023',
    children: [
      { label: 'January', value: 'year2023--january' },
      { label: 'February', value: 'year2023--february' },
      { label: 'March', value: 'year2023--march' },
      { label: 'April', value: 'year2023--april' },
      { label: 'May', value: 'year2023--may' },
      { label: 'June', value: 'year2023--june' },
    ],
  },
  {
    label: '2022',
    value: 'year2022',
    children: [
      { label: 'January', value: 'year2022--january' },
      { label: 'February', value: 'year2022--february' },
      { label: 'March', value: 'year2022--march' },
      { label: 'April', value: 'year2022--april' },
      { label: 'May', value: 'year2022--may' },
      { label: 'June', value: 'year2022--june' },
    ],
  },
];

export const WithChildren: StoryFn = (args) => {
  return (
    <PageMenuProvider items={ITEMS_WITH_CHILDREN}>
      <Container>
        <PageMenu {...args} />
        <section>
          {ITEMS_WITH_CHILDREN.map((item) => (
            <Section
              key={item.value}
              label={item.label}
              value={item.value}
              color={faker.color.rgb()}
            >
              {item.children?.map((child) => (
                <Section
                  key={child.value}
                  label={child.label}
                  value={child.value}
                  color={faker.color.rgb()}
                />
              ))}
            </Section>
          ))}
        </section>
      </Container>
    </PageMenuProvider>
  );
};
