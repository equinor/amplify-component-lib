import { Icon } from '@equinor/eds-core-react';
import { save } from '@equinor/eds-icons';
import { Meta, StoryFn } from '@storybook/react-vite';

import { Badge, BadgeProps } from 'src/molecules/Badge/Badge';
import page from 'src/molecules/Badge/Badge.docs.mdx';
import { Stack } from 'src/storybook';

const icons = {
  save,
};

Icon.add(icons);

const meta: Meta<typeof Badge> = {
  title: 'Molecules/Badge',
  component: Badge,
  parameters: {
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
            display: 'grid',
            gridGap: '32px',
            gridTemplateColumns: 'repeat(4, auto)',
          }}
        >
          <Story />
        </Stack>
      );
    },
  ],
};

export default meta;

export const Example: StoryFn<BadgeProps> = () => (
  <>
    <Badge value={1} />
    <Badge value={2} variant={'light'} />
    <Badge value={3} variant={'danger'} />
    <Badge value={4} variant={'empty'} />
  </>
);
