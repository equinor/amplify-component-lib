import {
  account_circle,
  dashboard,
  info_circle,
  list,
  platform,
  settings,
  star_outlined,
  time,
  view_module,
} from '@equinor/eds-icons';
import { Meta, StoryObj } from '@storybook/react-vite';

import { Guidelines } from '.';

export default {
  title: 'Organisms/TopBar/Guidelines',
  component: Guidelines,
} as Meta;

import { GuidelineSections } from './Guidelines';
import { colors } from 'src/atoms/style';

import { expect, userEvent } from 'storybook/test';

const sections: GuidelineSections[] = [
  {
    sectionName: 'Top bar',
    items: [
      {
        title: 'Field Selector',
        icon: platform,
        color: colors.interactive.primary__resting.hex,
      },
      {
        title: 'Guidelines',
        icon: info_circle,
        color: colors.interactive.primary__resting.hex,
      },
      {
        title: 'Settings',
        icon: settings,
        color: colors.interactive.primary__resting.hex,
      },
      {
        title: 'Account',
        icon: account_circle,
        color: colors.interactive.primary__resting.hex,
      },
    ],
  },
  {
    sectionName: 'Data display',
    items: [
      {
        title: 'Grid View',
        icon: view_module,
        color: colors.interactive.primary__resting.hex,
      },
      {
        title: 'List View',
        icon: list,
        color: colors.interactive.primary__resting.hex,
      },
    ],
  },
  {
    sectionName: 'Navigation rail',
    items: [
      {
        title: 'Dashboard',
        icon: dashboard,
        color: colors.interactive.primary__resting.hex,
      },
      {
        title: 'Recently Updated',
        icon: time,
        color: colors.interactive.primary__resting.hex,
      },
      {
        title: 'Favourites',
        icon: star_outlined,
        color: colors.interactive.primary__resting.hex,
      },
    ],
  },
];

type Story = StoryObj<typeof Guidelines>;

export const Primary: Story = {
  args: {
    sections,
  },
  play: async ({ canvas, args }) => {
    const { sections } = args;

    const button = canvas.getByTestId('show-hide-button');
    await userEvent.click(button);

    const sectionsElements = await canvas.findAllByTestId('guidelines-section');

    for (const [index, section] of sectionsElements.entries()) {
      await expect(section).toContainElement(
        canvas.getByText(sections[index].sectionName)
      );
      for (const item of sections[index].items) {
        if ('title' in item) {
          await expect(section).toContainElement(canvas.getByText(item.title));
        }
      }
    }

    await userEvent.click(button);
    for (const section of sectionsElements) {
      await expect(section).not.toBeVisible();
    }
  },
};

export const WithColorBoxes: Story = {
  args: {
    sections: sections.map((section) => ({
      ...section,
      items: section.items.map((item) => ({
        ...item,
        colorBox: true,
      })),
    })),
  },
  play: async ({ canvas, args }) => {
    const { sections } = args;

    const button = canvas.getByTestId('show-hide-button');
    await userEvent.click(button);

    const sectionsElements = await canvas.findAllByTestId('guidelines-section');

    for (const [index, section] of sectionsElements.entries()) {
      await expect(section).toContainElement(
        canvas.getByText(sections[index].sectionName)
      );
      for (const item of sections[index].items) {
        if ('title' in item) {
          await expect(section).toContainElement(canvas.getByText(item.title));
          await expect(section).toContainElement(
            canvas.getByTestId(`color-box-${item.title}`)
          );
        }
      }
    }
  },
};
