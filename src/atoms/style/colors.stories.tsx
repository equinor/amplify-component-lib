import { FC } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { colors } from './colors';
import { spacings } from './spacings';
import { RichTextDisplay } from 'src/molecules/RichTextDisplay/RichTextDisplay';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacings.large};
  > section {
    display: flex;
    flex-direction: column;
    margin-top: ${spacings.large};
    > h5 {
      text-transform: capitalize;
    }
  }
`;

const DataVizColorWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const computedStyles = getComputedStyle(document.body.parentElement!);

interface ColorBlockProps {
  $background: string;
}

const ColorBlock = styled.div<ColorBlockProps>`
  width: 14rem;
  padding: ${spacings.small};
  height: 5rem;
  background: ${({ $background }) => $background};
  > p {
    font-weight: bold;
    color: ${({ $background }) => {
      // Magic code to make text color (name of color) change to white/black depending on what the background is
      // See here: https://css-tricks.com/switch-font-color-for-different-backgrounds-with-css/
      const variableName = $background.split(',')[0].replace('var(', '');
      // console.log(variableName);
      const variable = computedStyles.getPropertyValue(variableName);
      // console.log(variable);
      let split = $background
        .split('rgba')[1]
        .split(',')
        .map((s) => s.replaceAll(/[() ]/g, ''));

      if (variable) {
        split = variable.split(',').map((s) => s.replaceAll(/[()rgba ]/g, ''));
      }
      const red = Number(split[0]) * 0.2126;
      const green = Number(split[1]) * 0.7152;
      const blue = Number(split[2]) * 0.0722;
      const sum = red + green + blue;
      const perceivedLightness = sum / 255;
      if (perceivedLightness > 0.5) {
        return 'black';
      }
      return 'white';
    }};
  }
`;

const ColorPreview: FC = () => {
  return (
    <Container>
      {Object.keys(colors).map((colorCategory) => (
        <section key={colorCategory}>
          <Typography variant="h5">{colorCategory}</Typography>
          <Container>
            {Object.keys(colors[colorCategory as keyof typeof colors])
              .sort()
              .map((color) => {
                const category = colors[colorCategory as keyof typeof colors];
                const colorObject = category[
                  color as keyof typeof category
                ] as { rgba: string };

                if (colorCategory === 'dataviz') {
                  const casted = colorObject as unknown as {
                    default: string;
                    darker: string;
                    lighter: string;
                  };

                  return (
                    <DataVizColorWrapper key={color}>
                      {Object.keys(casted).map((dataVizKey) => (
                        <ColorBlock
                          key={dataVizKey}
                          $background={
                            casted[dataVizKey as keyof typeof casted]
                          }
                        >
                          <Typography>
                            {color} {dataVizKey}
                          </Typography>
                        </ColorBlock>
                      ))}
                    </DataVizColorWrapper>
                  );
                }

                return (
                  <ColorBlock
                    key={color}
                    id={color}
                    $background={colorObject.rgba}
                  >
                    <Typography>{color}</Typography>
                  </ColorBlock>
                );
              })}
          </Container>
        </section>
      ))}
    </Container>
  );
};

const meta: Meta = {
  title: 'Atoms/Style/Colors',
  component: ColorPreview,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: '',
    },
  },
  args: {},
};

export default meta;

export const Preview: StoryObj = {
  args: {},
};

export const DarkTheme: StoryFn = () => (
  <div>
    <Typography variant="h3">Dark theme / light theme</Typography>
    <Typography>
      For the dark/light theme switching to work you need to be using the rgba
      color tokens, hex or any other will not work
    </Typography>

    <Typography>
      To use the dark theme variables in specific containers you can do this
    </Typography>
    <br />
    <RichTextDisplay
      value={`<pre><code>import { Theme, colors } from "@equinor/amplify-component-lib";

&lt;div data-theme={Theme.Dark}&gt;
  &lt;Typography color={colors.text.static_icons__primary_white.rgba}&gt;
    Text
  &lt;/Typography&gt;
&lt;/div&gt; </code></pre>`}
    />

    <br />
    <br />
    <br />

    <Typography variant="h3">Using the ThemeProvider</Typography>
    <Typography>
      If you want to use them across an entire app the ThemeProvider is the
      easiest solution. To be able to switch themes you should add the Settings
      component in the topbar like this (ThemeProvider needed in
      src/providers/Providers.tsx):
      <RichTextDisplay
        value={`<pre><code># src/components/ApplicationTopBar/Content/Settings.tsx
export const Settings: FC = () =&gt; {
  const { theme, setTheme } = useThemeProvider();

  const settingsOptions: SettingsSection[] = [
    {
      title: 'Theme',
      value: theme,
      onChange: (value: string) =&gt; setTheme(value as Theme),
      items: [
        {
          label: 'Light Mode',
          name: 'theme-group',
          value: Theme.LIGHT,
          colorBox: '#ffffff',
        },
        {
          label: 'Dark Mode',
          name: 'theme-group',
          value: Theme.DARK,
          colorBox: '#243746',
        },
      ],
    },
  ];

  return &lt;TopBar.Settings allSettings={settingsOptions} /&gt;;
};
</code></pre>`}
      />
    </Typography>
  </div>
);
