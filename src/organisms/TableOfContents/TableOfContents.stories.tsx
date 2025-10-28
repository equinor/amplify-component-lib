import { ReactNode } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { faker } from '@faker-js/faker';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import {
  TableOfContents,
  TableOfContentsProps,
} from 'src/organisms/TableOfContents/TableOfContents';
import {
  TableOfContentsItemType,
  TableOfContentsProvider,
  TableOfContentsProviderProps,
} from 'src/providers/TableOfContentsProvider';

import { expect, within } from 'storybook/test';
import styled from 'styled-components';

const { colors } = tokens;

const meta: Meta = {
  title: 'Organisms/TableOfContents',
  component: TableOfContents,
  parameters: {
    router: {
      initialEntries: ['/'],
      routes: ['/'],
    },
  },
  argTypes: {
    items: { control: 'object' },
    onlyShowSelectedChildren: { control: 'boolean' },
    variant: { control: 'radio', items: ['border', 'buttons'] },
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
    onlyShowSelectedChildren: false,
    variant: 'buttons',
  },
};

export default meta;

const Container = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: minmax(auto, 200px) 1fr;
  gap: 1rem;
  > .page-menu {
    position: sticky;
    top: 12px;
    left: 12px;
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

const HorizontalContainer = styled.div`
  display: grid;
  position: relative;
  grid-template-row: auto 1fr;
  gap: 1rem;
  > .page-menu {
    position: sticky;
    top: 12px;
    left: 12px;
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

const COLORS = [
  colors.infographic.substitute__blue_ocean.rgba,
  colors.infographic.substitute__blue_sky.rgba,
  colors.infographic.substitute__blue_overcast.rgba,
];

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

type StoryProps = TableOfContentsProviderProps & TableOfContentsProps;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  render: (args) => {
    return (
      <TableOfContentsProvider items={args.items}>
        <Container>
          <TableOfContents mode={args.mode} />
          <section>
            {args.items.map((item, index) => (
              <Section
                key={item.value}
                label={item.label}
                value={item.value}
                color={COLORS[index]}
              />
            ))}
          </section>
        </Container>
      </TableOfContentsProvider>
    );
  },
  play: async ({ canvas, args }) => {
    for (const item of args.items) {
      expect(canvas.getByRole('button', { name: item.label }));
    }
  },
};

export const Horizontal: Story = {
  render: (args) => {
    return (
      <TableOfContentsProvider items={args.items}>
        <HorizontalContainer>
          <TableOfContents mode="horizontal" />
          <section>
            {args.items.map((item, index) => (
              <Section
                key={item.value}
                label={item.label}
                value={item.value}
                color={COLORS[index]}
              />
            ))}
          </section>
        </HorizontalContainer>
      </TableOfContentsProvider>
    );
  },
};

const ITEMS_WITH_CHILDREN: TableOfContentsItemType[] = [
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

export const WithChildren: Story = {
  render: (args) => {
    return (
      <TableOfContentsProvider items={ITEMS_WITH_CHILDREN}>
        <Container>
          <TableOfContents {...args} />
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
      </TableOfContentsProvider>
    );
  },
  play: async ({ canvas }) => {
    for (const parent of ITEMS_WITH_CHILDREN) {
      const parentElement = canvas.getByRole('button', { name: parent.label });
      await expect(parentElement).toBeInTheDocument();
      const parentContainer = parentElement.parentElement!;
      for (const child of parent.children ?? []) {
        await expect(
          within(parentContainer).getByRole('button', { name: child.label })
        ).toBeInTheDocument();
      }
    }
  },
};

const ITEMS_WITH_CHILDREN_DISABLED: TableOfContentsItemType[] = [
  {
    label: '2023',
    value: 'year2023',
    children: [
      { label: 'January', value: 'year2023--january' },
      { label: 'February', value: 'year2023--february' },
      { label: 'March', value: 'year2023--march' },
      { label: 'April', value: 'year2023--april', disabled: true },
      { label: 'May', value: 'year2023--may' },
      { label: 'June', value: 'year2023--june' },
    ],
  },
  {
    label: '2022',
    value: 'year2022',
    children: [
      { label: 'January', value: 'year2022--january' },
      { label: 'February', value: 'year2022--february', disabled: true },
      { label: 'March', value: 'year2022--march' },
      { label: 'April', value: 'year2022--april', disabled: true },
      { label: 'May', value: 'year2022--may' },
      { label: 'June', value: 'year2022--june' },
    ],
  },
];

export const WithChildrenAndDisabled: Story = {
  render: (args) => {
    return (
      <TableOfContentsProvider items={ITEMS_WITH_CHILDREN_DISABLED}>
        <Container>
          <TableOfContents {...args} />
          <section>
            {ITEMS_WITH_CHILDREN_DISABLED.map((item) => (
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
      </TableOfContentsProvider>
    );
  },
  play: async ({ canvas }) => {
    for (const parent of ITEMS_WITH_CHILDREN_DISABLED) {
      const parentElement = canvas.getByRole('button', {
        name: parent.label,
      }).parentElement!;
      for (const child of parent.children ?? []) {
        const childElement = within(parentElement).getByRole('button', {
          name: child.label,
        });
        if (child.disabled) {
          await expect(childElement).toBeDisabled();
        } else {
          await expect(childElement).not.toBeDisabled();
        }
      }
    }
  },
};

const firstParentId = `1${faker.database.mongodbObjectId()}`;
const secondParentId = `2${faker.database.mongodbObjectId()}`;

const ITEMS_WITH_CHILDREN_AND_LONG_LABEL = [
  {
    label: '2023',
    value: `firstParentId`,
    children: [
      { label: 'January', value: `${firstParentId}--january` },
      { label: 'February', value: `${firstParentId}--february` },
      { label: 'March', value: `${firstParentId}--march` },
      { label: 'April', value: `${firstParentId}--april` },
      { label: 'May', value: `${firstParentId}--may` },
      { label: 'June', value: `${firstParentId}--june` },
    ],
  },
  {
    label: '2022',
    value: firstParentId,
    children: [
      { label: 'January', value: `${secondParentId}--january` },
      { label: 'February', value: `${secondParentId}--february` },
      { label: 'March', value: `${secondParentId}--march` },
      { label: 'April', value: `${secondParentId}--april` },
      { label: 'May', value: `${secondParentId}--may` },
      { label: 'June', value: `${secondParentId}--june` },
    ],
  },
  {
    label: '2021',
    value: 'year2021',
    children: [
      {
        label:
          'Ridiculously long label to highlight how width is shared even though this is sometimes hidden',
        value: 'year2021--july',
      },
    ],
  },
];

export const WithChildrenAndOnlyShowSelectedChildrenSharedWidth: Story = {
  render: (args) => {
    return (
      <TableOfContentsProvider items={ITEMS_WITH_CHILDREN_AND_LONG_LABEL}>
        <Container>
          <TableOfContents {...args} onlyShowSelectedChildren />
          <section>
            {ITEMS_WITH_CHILDREN_AND_LONG_LABEL.map((item) => (
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
      </TableOfContentsProvider>
    );
  },
  play: async ({ canvas }) => {
    for (const [
      index,
      parent,
    ] of ITEMS_WITH_CHILDREN_AND_LONG_LABEL.entries()) {
      const parentElement = canvas.getByRole('button', { name: parent.label });
      await expect(parentElement).toBeInTheDocument();
      const wrapper = parentElement.parentElement!;
      for (const child of parent.children ?? []) {
        if (index === 0) {
          // is selected
          await expect(
            within(wrapper).getByRole('button', { name: child.label })
          ).toBeInTheDocument();
        } else {
          await expect(
            within(wrapper).queryByRole('button', { name: child.label })
          ).not.toBeInTheDocument();
        }
      }
    }
  },
};

export const WithChildrenAndCounts: StoryFn<StoryProps> = (args) => {
  return (
    <TableOfContentsProvider
      items={ITEMS_WITH_CHILDREN.map((item) => ({
        ...item,
        count: Math.ceil(Math.random() * 10),
        children:
          item.children?.map((child) => ({
            ...child,
            count: Math.ceil(Math.random() * 10),
          })) ?? [],
      }))}
    >
      <Container>
        <TableOfContents {...args} />
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
    </TableOfContentsProvider>
  );
};

export const HorizontalCount: StoryFn<StoryProps> = () => {
  return (
    <TableOfContentsProvider
      items={ITEMS_WITH_CHILDREN.map((item, index) => ({
        ...item,
        count: Math.ceil(Math.random() * 13),
        disabled: index === 1,
        children:
          item.children?.map((child) => ({
            ...child,
            count: Math.ceil(Math.random() * 10),
          })) ?? [],
      }))}
    >
      <HorizontalContainer>
        <TableOfContents mode="horizontal" />
        <section>
          {ITEMS_WITH_CHILDREN.map((item, index) => (
            <Section
              key={item.value}
              label={item.label}
              value={item.value}
              color={COLORS[index]}
            />
          ))}
        </section>
      </HorizontalContainer>
    </TableOfContentsProvider>
  );
};
