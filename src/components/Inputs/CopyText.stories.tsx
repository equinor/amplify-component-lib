import React from 'react';

import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { Meta, StoryFn } from '@storybook/react';

import CopyText, { CopyTextProps } from './CopyText';

import styled from 'styled-components';

const { colors } = tokens;

export default {
  title: 'Inputs/CopyText',
  component: CopyText,
  args: {
    textToCopy: 'Some text',
    hoverBackground: colors.ui.background__light.hex,
  },
  parameters: {
    backgrounds: {
      default: 'Equinor off-white',
      values: [
        {
          name: 'Equinor off-white',
          value: colors.ui.background__light.hex,
        },
      ],
    },
  },
} as Meta;

const Container = styled.div`
  display: flex;
`;

export const Primary: StoryFn<CopyTextProps> = (args) => (
  <Container>
    <CopyText {...args}>
      <Typography>Some text</Typography>
    </CopyText>
  </Container>
);
