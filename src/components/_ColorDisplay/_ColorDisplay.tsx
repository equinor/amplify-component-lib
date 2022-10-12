import React, { FC } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { colors } = tokens;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

interface ColorBoxProps {
  color: string;
}

const ColorBox = styled.div<ColorBoxProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 200px;
  height: 200px;
  margin: 5px;
  border: 1px solid black;
  background-color: ${(props) => props.color};
`;

interface colorType {
  hex: string;
  hsla: string;
  rgba: string;
}

interface colorList {
  [key: string]: colorType;
}

interface ColorModuleProps {
  title: string;
  colors: colorList;
}

const ColorModule: FC<ColorModuleProps> = ({ title, colors }) => (
  <>
    <Typography variant="h2">{title}</Typography>
    <Wrapper>
      {Object.entries(colors).map(([key, value]) => {
        return (
          <ColorBox key={key} color={value.hsla}>
            <Typography variant="cell_text_bold" group="table">
              {key}
            </Typography>
            <Typography variant="cell_text" group="table">
              {value.hsla}
            </Typography>
            <Typography variant="cell_text" group="table">
              {value.hex}
            </Typography>
          </ColorBox>
        );
      })}
    </Wrapper>
  </>
);

const ColorDisplay: React.FC = () => {
  return (
    <>
      <ColorModule title="infographic" colors={colors.infographic} />
      <ColorModule title="interactive" colors={colors.interactive} />
      <ColorModule title="logo" colors={colors.logo} />
      <ColorModule title="text" colors={colors.text} />
      <ColorModule title="ui" colors={colors.ui} />
    </>
  );
};

export default ColorDisplay;
