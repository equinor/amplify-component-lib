import { render, screen, userEvent } from '../../../tests/test-utils';
import Settings, { ISettingsProps } from './Settings';

test('Settings renders as expected', async () => {
  const theme = 'light';
  const setTheme = vi.fn();
  const settingsOptions: ISettingsProps = {
    allSettings: [
      {
        title: 'Theme',
        type: theme,
        onChange: setTheme,
        items: [
          {
            label: 'Light Mode',
            name: 'theme-group',
            value: 'light',
          },
          {
            label: 'Dark Mode',
            name: 'theme-group',
            value: 'dark',
            disabled: true,
          },
        ],
      },
    ],
  };

  render(<Settings allSettings={settingsOptions.allSettings} />);

  const user = userEvent.setup();

  const menuButton = screen.getByRole('button');
  await user.click(menuButton);

  expect(screen.getByText('Settings')).toBeVisible();
  const lightRadioButton = screen.getByRole('radio', { name: /light mode/i });

  expect(lightRadioButton).toBeChecked();
});

test('Radios are disabled according to prop', async () => {
  const theme = 'light';
  const setTheme = vi.fn();
  const settingsOptions: ISettingsProps = {
    allSettings: [
      {
        title: 'Theme',
        type: theme,
        onChange: setTheme,
        items: [
          {
            label: 'Light Mode',
            name: 'theme-group',
            value: 'light',
          },
          {
            label: 'Dark Mode',
            name: 'theme-group',
            value: 'light',
            disabled: true,
          },
        ],
      },
    ],
  };

  render(<Settings allSettings={settingsOptions.allSettings} />);

  const user = userEvent.setup();

  const menuButton = await screen.findByRole('button');

  await user.click(menuButton);

  const darkRadioButton = await screen.findByRole('radio', {
    name: /dark mode/i,
  });

  expect(darkRadioButton).toBeDisabled();
});

test('Settings renders as expected when opened/closed', async () => {
  const theme = 'light';
  const setTheme = vi.fn();
  const settingsOptions: ISettingsProps = {
    allSettings: [
      {
        title: 'Theme',
        type: theme,
        onChange: setTheme,
        items: [
          {
            label: 'Light Mode',
            name: 'theme-group',
            value: 'light',
          },
          {
            label: 'Dark Mode',
            name: 'theme-group',
            value: 'light',
            disabled: true,
          },
        ],
      },
    ],
  };

  render(<Settings allSettings={settingsOptions.allSettings} />);

  const user = userEvent.setup();

  const menuButton = screen.getByRole('button');

  await user.click(menuButton);

  const lightRadioButton = screen.getByRole('radio', { name: /light mode/i });

  expect(lightRadioButton).toBeChecked();
  expect(lightRadioButton).toBeInTheDocument();
  await user.click(menuButton);

  expect(
    screen.queryByRole('radio', { name: /light mode/i })
  ).not.toBeInTheDocument();
  await user.click(menuButton);
  await user.click(document.body);

  expect(
    screen.queryByRole('radio', { name: /light mode/i })
  ).not.toBeInTheDocument();
});

test('Calls onChange when using radio buttons in settings menu', async () => {
  const theme = 'light';
  const setTheme = vi.fn();
  const settingsOptions: ISettingsProps = {
    allSettings: [
      {
        title: 'Theme',
        type: theme,
        onChange: setTheme,
        items: [
          {
            label: 'Light Mode',
            name: 'theme-group',
            value: 'light',
          },
          {
            label: 'Dark Mode',
            name: 'theme-group',
            value: 'dark',
          },
        ],
      },
    ],
  };

  render(<Settings allSettings={settingsOptions.allSettings} />);

  const user = userEvent.setup();

  const menuButton = screen.getByRole('button');

  await user.click(menuButton);

  const lightRadioButton = screen.getByRole('radio', { name: /light mode/i });

  expect(lightRadioButton).toBeChecked();

  const darkRadioButton = screen.getByRole('radio', { name: /dark mode/i });

  expect(darkRadioButton).not.toBeChecked();

  await user.click(darkRadioButton);

  expect(setTheme).toHaveBeenCalledTimes(1);
});

test('Renders correctly with color boxes', async () => {
  const theme = 'light';
  const setTheme = vi.fn();
  const settingsOptions: ISettingsProps = {
    allSettings: [
      {
        title: 'Theme',
        type: theme,
        onChange: setTheme,
        items: [
          {
            label: 'Light Mode',
            name: 'theme-group',
            colorBox: '#ffffff',
            value: 'light',
          },
          {
            label: 'Dark Mode',
            name: 'theme-group',
            colorBox: '#000000',
            value: 'dark',
          },
        ],
      },
    ],
  };

  render(<Settings allSettings={settingsOptions.allSettings} />);

  const user = userEvent.setup();

  const menuButton = screen.getByRole('button');

  await user.click(menuButton);

  for (const item of settingsOptions.allSettings[0].items) {
    expect(screen.getByTestId(`colorbox-${item.colorBox}`)).toBeInTheDocument();
  }
});

test('Renders correctly with texts', async () => {
  const theme = 'light';
  const setTheme = vi.fn();
  const settingsOptions: ISettingsProps = {
    allSettings: [
      {
        title: 'Theme',
        type: theme,
        onChange: setTheme,
        items: [
          {
            label: 'Light Mode',
            name: 'theme-group',
            text: 'light-text',
            value: 'light',
          },
          {
            label: 'Dark Mode',
            name: 'theme-group',
            text: 'dark-text',
            value: 'dark',
          },
        ],
      },
    ],
  };

  render(<Settings allSettings={settingsOptions.allSettings} />);

  const user = userEvent.setup();

  const menuButton = screen.getByRole('button');

  await user.click(menuButton);

  for (const item of settingsOptions.allSettings[0].items) {
    expect(screen.getByText(item.text ?? '')).toBeInTheDocument();
  }
});

test('Renders correctly with elements', async () => {
  const theme = 'light';
  const setTheme = vi.fn();
  const settingsOptions: ISettingsProps = {
    allSettings: [
      {
        title: 'Theme',
        type: theme,
        onChange: setTheme,
        items: [
          {
            label: 'Light Mode',
            name: 'theme-group',
            element: <p>light-element</p>,
            value: 'light',
          },
          {
            label: 'Dark Mode',
            name: 'theme-group',
            element: <p>dark-element</p>,
            value: 'dark',
          },
        ],
      },
    ],
  };

  render(<Settings allSettings={settingsOptions.allSettings} />);

  const user = userEvent.setup();

  const menuButton = screen.getByRole('button');

  await user.click(menuButton);

  for (const item of settingsOptions.allSettings[0].items) {
    expect(screen.getByText(`${item.value}-element`)).toBeInTheDocument();
  }
});
