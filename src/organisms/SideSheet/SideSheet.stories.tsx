import { ReactElement, useState } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { close, dashboard, edit, star_outlined } from '@equinor/eds-icons';
import { Meta, StoryObj } from '@storybook/react-vite';

import { SideSheet } from './SideSheet';
import { SideSheetProps } from './SideSheet.types';
import { colors } from 'src/atoms/style';
import { Button } from 'src/molecules/Button/Button';
import { SideBar } from 'src/organisms/SideBar';
import { Template } from 'src/organisms/Template/Template';
import { TopBar } from 'src/organisms/TopBar';
import { ReleaseNotesProvider } from 'src/providers/ReleaseNotesProvider';
import { SideBarProvider } from 'src/providers/SideBarProvider';

import { expect, userEvent, waitFor, within } from 'storybook/test';

function StoryComponent(props: SideSheetProps) {
  const [open, setOpen] = useState(false);

  const handleOnClose = () => {
    setOpen(false);
  };

  return (
    <ReleaseNotesProvider>
      <Template>
        <TopBar applicationIcon="acquire" applicationName="Acquire">
          <TopBar.Actions>
            <TopBar.Account />
            <TopBar.Resources />
          </TopBar.Actions>
        </TopBar>
        <Template.Container>
          <SideBarProvider>
            <SideBar
              createLabel="Create something"
              onCreate={() => console.log('Created 🖋')}
            >
              <SideBar.Item name="Dashboard" icon={dashboard} />
            </SideBar>
          </SideBarProvider>

          <Template.Content $open={false}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Button
                onClick={() => {
                  setOpen((prev) => !prev);
                }}
              >
                Toggle side sheet
              </Button>
              <SideSheet {...props} open={open} onClose={handleOnClose} />
            </div>
          </Template.Content>
        </Template.Container>
      </Template>
    </ReleaseNotesProvider>
  );
}

const meta: Meta<typeof SideSheet> = {
  title: 'Organisms/SideSheet',
  component: SideSheet,
  parameters: {
    design: {
      type: 'figma',
      url: '',
    },
    layout: 'centered',
    router: {
      initialEntries: ['/'],
      routes: ['/'],
    },
  },
  args: {
    title: 'Title',
    type: 'standard',
    open: true,
  },
};
function FloatingStoryWrapper({ children }: { children: ReactElement }) {
  return (
    <ReleaseNotesProvider>
      <div style={{ height: '500px', position: 'relative' }}>
        <div
          style={{
            height: '64px',
            width: '100%',
            background: colors.ui.background__default.rgba,
            borderBottom: `1px solid ${colors.ui.background__medium.rgba}`,
            zIndex: 10000,
          }}
        />
        <div style={{ width: '100%', position: 'relative' }}>{children}</div>
      </div>
    </ReleaseNotesProvider>
  );
}

function StatefulModalWrapper(props: SideSheetProps) {
  const [open, setOpen] = useState(false);

  return (
    <FloatingStoryWrapper>
      <div>
        <div style={{ padding: '1rem' }}>
          <Button onClick={() => setOpen((prev) => !prev)}>
            Toggle side sheet
          </Button>
        </div>
        <SideSheet {...props} open={open} onClose={() => setOpen(false)} />
      </div>
    </FloatingStoryWrapper>
  );
}

export default meta;
type Story = StoryObj<typeof SideSheet>;

export const Standard: Story = {
  args: {
    type: 'standard',
  },
  play: async ({ canvasElement, context }) => {
    const canvas = within(canvasElement);
    const { title } = context.args;

    await expect(
      canvas.getByRole('heading', { name: title as string, level: 2 })
    ).toBeInTheDocument();

    const closeIconPath = canvas.getByTestId('eds-icon-path');
    await expect(closeIconPath).toHaveAttribute('d', close.svgPathData);

    await userEvent.click(canvas.getByRole('button'));
  },
};

export const StandardWithHeaderElements: Story = {
  args: {
    type: 'standard',
    headerElements: (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="ghost_icon">
          <Icon data={star_outlined} />
        </Button>
        <Button variant="ghost_icon">
          <Icon data={edit} />
        </Button>
      </div>
    ),
  },
  play: async ({ canvasElement, context }) => {
    const canvas = within(canvasElement);
    const { title } = context.args;

    await expect(
      canvas.getByRole('heading', { name: title as string, level: 2 })
    ).toBeInTheDocument();

    const iconPaths = canvas.getAllByTestId('eds-icon-path');
    await expect(iconPaths[0]).toHaveAttribute('d', star_outlined.svgPathData);
    await expect(iconPaths[1]).toHaveAttribute('d', edit.svgPathData);
    await expect(iconPaths[2]).toHaveAttribute('d', close.svgPathData);

    // Close button is the last button in the header
    const buttons = canvas.getAllByRole('button');
    await userEvent.click(buttons[buttons.length - 1]);
  },
};

export const Modal: Story = {
  args: {
    type: 'modal',
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: (Story) => (
    <FloatingStoryWrapper>
      <Story />
    </FloatingStoryWrapper>
  ),
  play: async ({ canvasElement, context }) => {
    const canvas = within(canvasElement);
    const { title } = context.args;

    await expect(
      canvas.getByRole('heading', { name: title as string, level: 2 })
    ).toBeInTheDocument();

    const closeIconPath = canvas.getByTestId('eds-icon-path');
    await expect(closeIconPath).toHaveAttribute('d', close.svgPathData);

    await userEvent.click(canvas.getByRole('button'));
  },
};
export const ModalWithScrim: Story = {
  args: {
    type: 'modal',
    withScrim: true,
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: (Story) => (
    <FloatingStoryWrapper>
      <Story />
    </FloatingStoryWrapper>
  ),
  play: async ({ canvasElement, context }) => {
    const canvas = within(canvasElement);
    const { title } = context.args;

    await expect(
      canvas.getByRole('heading', { name: title as string, level: 2 })
    ).toBeInTheDocument();

    const closeIconPath = canvas.getByTestId('eds-icon-path');
    await expect(closeIconPath).toHaveAttribute('d', close.svgPathData);

    // Close via the close button
    await userEvent.click(canvas.getByRole('button'));
  },
};

export const Floating: Story = {
  args: {
    type: 'floating',
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: (Story) => (
    <FloatingStoryWrapper>
      <Story />
    </FloatingStoryWrapper>
  ),
  play: async ({ canvasElement, context }) => {
    const canvas = within(canvasElement);
    const { title } = context.args;

    await expect(
      canvas.getByRole('heading', { name: title as string, level: 2 })
    ).toBeInTheDocument();

    const closeIconPath = canvas.getByTestId('eds-icon-path');
    await expect(closeIconPath).toHaveAttribute('d', close.svgPathData);

    await userEvent.click(canvas.getByRole('button'));
  },
};

export const Stateful: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    type: 'modal',
  },
  render: StoryComponent,
  play: async ({ canvasElement, context }) => {
    const canvas = within(canvasElement);
    const { title } = context.args;

    // Sheet is closed initially
    await expect(
      canvas.queryByRole('heading', { name: title as string, level: 2 })
    ).not.toBeInTheDocument();

    // Open the sheet
    await userEvent.click(
      canvas.getByRole('button', { name: /toggle side sheet/i })
    );

    // Title is visible after opening
    await expect(
      canvas.getByRole('heading', { name: title as string, level: 2 })
    ).toBeInTheDocument();

    // Close the sheet via the close button
    const closeButton = canvas.getByLabelText(/close side sheet/i);
    await userEvent.click(closeButton);

    // Sheet is closed after clicking close
    await waitFor(() => {
      expect(
        canvas.queryByRole('heading', { name: title as string, level: 2 })
      ).not.toBeInTheDocument();
    });
  },
};

export const StatefulModal: Story = {
  args: {
    type: 'modal',
  },
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => <StatefulModalWrapper {...args} />,
  play: async ({ canvasElement, context }) => {
    const canvas = within(canvasElement);
    const { title } = context.args;

    // Sheet is closed initially
    await expect(
      canvas.queryByRole('heading', { name: title as string, level: 2 })
    ).not.toBeInTheDocument();

    // Open the sheet
    await userEvent.click(
      canvas.getByRole('button', { name: /toggle side sheet/i })
    );

    // Title and close icon are visible
    await expect(
      canvas.getByRole('heading', { name: title as string, level: 2 })
    ).toBeInTheDocument();

    const closeIconPath = canvas.getByTestId('eds-icon-path');
    await expect(closeIconPath).toHaveAttribute('d', close.svgPathData);

    // Close via the close button
    const buttons = canvas.getAllByRole('button');
    await userEvent.click(buttons[buttons.length - 1]);

    await waitFor(() => {
      expect(
        canvas.queryByRole('heading', { name: title as string, level: 2 })
      ).not.toBeInTheDocument();
    });
  },
};

export const StatefulModalWithScrim: Story = {
  args: {
    type: 'modal',
    withScrim: true,
  },
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => <StatefulModalWrapper {...args} />,
  play: async ({ canvasElement, context }) => {
    const canvas = within(canvasElement);
    const { title } = context.args;

    // Sheet is closed initially
    await expect(
      canvas.queryByRole('heading', { name: title as string, level: 2 })
    ).not.toBeInTheDocument();

    // Open the sheet
    await userEvent.click(
      canvas.getByRole('button', { name: /toggle side sheet/i })
    );

    // Title and close icon are visible
    await expect(
      await canvas.findByRole('heading', { name: title as string, level: 2 })
    ).toBeInTheDocument();

    const closeIconPath = canvas.getByTestId('eds-icon-path');
    await expect(closeIconPath).toHaveAttribute('d', close.svgPathData);

    // Close by clicking the scrim backdrop
    await userEvent.click(canvas.getByTestId('side-sheet-scrim'));

    await waitFor(() => {
      expect(
        canvas.queryByRole('heading', { name: title as string, level: 2 })
      ).not.toBeInTheDocument();
    });

    // Re-open and verify close button also dismisses the sheet
    await userEvent.click(
      canvas.getByRole('button', { name: /toggle side sheet/i })
    );

    await expect(
      await canvas.findByRole('heading', { name: title as string, level: 2 })
    ).toBeInTheDocument();

    const buttonsAfterReopen = canvas.getAllByRole('button');
    await userEvent.click(buttonsAfterReopen[buttonsAfterReopen.length - 1]);

    await waitFor(() => {
      expect(
        canvas.queryByRole('heading', { name: title as string, level: 2 })
      ).not.toBeInTheDocument();
    });
  },
};
