import { FC } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { Meta, StoryObj } from '@storybook/react';

import { colors, spacings } from 'src/atoms';

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
  width: 12rem;
  padding: ${spacings.small};
  height: 5rem;
  background: ${({ $background }) => $background};
  > p {
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
            {Object.keys(colors[colorCategory as keyof typeof colors]).map(
              (color) => {
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
              }
            )}
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

export const Default: StoryObj = {
  args: {},
};
