import { ReactElement, useState } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { dashboard, edit, star_outlined } from '@equinor/eds-icons';
import { Meta, StoryObj } from '@storybook/react-vite';

import { SideSheet } from './SideSheet';
import { colors } from 'src/atoms/style';
import { Button } from 'src/molecules/Button/Button';
import { SideBar } from 'src/organisms/SideBar';
import { SideSheetProps } from 'src/organisms/SideSheet/SideSheet.types';
import { Template } from 'src/organisms/Template/Template';
import { TopBar } from 'src/organisms/TopBar';
import { ReleaseNotesProvider } from 'src/providers/ReleaseNotesProvider';
import { SideBarProvider } from 'src/providers/SideBarProvider';

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

export default meta;
type Story = StoryObj<typeof SideSheet>;

export const Standard: Story = {
  args: {
    type: 'standard',
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
};

export const Stateful: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    type: 'modal',
  },
  render: StoryComponent,
};
