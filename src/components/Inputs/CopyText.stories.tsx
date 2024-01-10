import React from 'react';

import { Typography } from '@equinor/eds-core-react';
import { Meta, StoryFn } from '@storybook/react';

import CopyText, { CopyTextProps } from './CopyText';

import styled from 'styled-components';

export default {
  title: 'Inputs/CopyText',
  component: CopyText,
  args: {
    textToCopy: 'Some text',
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
