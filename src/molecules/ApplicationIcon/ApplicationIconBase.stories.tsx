// Import necessary modules from Storybook
import { Meta, StoryFn } from '@storybook/react';

import { embark } from './ApplicationIconData/ApplicationIconCollection'; // Adjust imports as per your icons collection
// Import the component and its props
import { AllowedColors, AppBaseProps, colorMap } from './ApplicationIcon.utils';
import NewApplicationIconBase from './ApplicationIconBase';
import ApplicationIconBase from './ApplicationIconBase';

import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  min-height: 512px;
  justify-content: center;
  align-items: center;
`;

// Define the default export with title and component
export default {
  title: 'Molecules/ApplicationIcon/ApplicationIconBase',
  component: NewApplicationIconBase,
  argTypes: {
    size: {
      control: {
        type: 'range',
        min: 16,
        max: 512,
        step: 16,
        defaultValue: 512,
      },
      name: 'Size',
      description: 'Set the size of the app icon.',
    },
    rotationVariant: {
      control: { type: 'range', min: 0, max: 3, step: 1, defaultValue: 0 },
      name: 'RotationVariant.',
      description: 'Determine which rotation the app icon should be in.',
    },
    color: {
      options: Object.keys(colorMap) as AllowedColors[], // Use keys of colorMap as options
      control: {
        type: 'radio',
      },
      name: 'Color',
      defaultValue: 'blue',
    },
    animationState: {
      options: ['none', 'hoverable', 'animated', 'loading'],
      control: {
        type: 'radio',
      },
      name: 'Animation State',
      description: 'Set the animation state of the icon.',
      defaultValue: 'none',
    },
  },
} as Meta;

// Define the primary story
export const Primary: StoryFn<AppBaseProps> = (args) => {
  return (
    <StyledWrapper>
      <ApplicationIconBase {...args} appIconData={embark.svgPathData} />
    </StyledWrapper>
  );
};
