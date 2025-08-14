import { Meta, StoryFn } from '@storybook/react-vite';

import {
  AllowedColors,
  AppBaseProps,
  colorMap,
} from 'src/molecules/ApplicationIcon/ApplicationIconNew/ApplicationIconNew.utils';
import { ApplicationIconNewBase } from 'src/molecules/ApplicationIcon/ApplicationIconNew/ApplicationIconNewBase';
import { embark } from 'src/molecules/ApplicationIcon/ApplicationIconNew/ApplicationIconNewData/ApplicationIconNewCollection';

import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  min-height: 512px;
  justify-content: center;
  align-items: center;
`;

const meta: Meta<typeof ApplicationIconNewBase> = {
  title: 'Molecules/ApplicationIcon/ApplicationIconNew/ApplicationIconNewBase',
  component: ApplicationIconNewBase,
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
};

export default meta;

// Define the primary story
export const Primary: StoryFn<AppBaseProps> = (args) => {
  return (
    <StyledWrapper>
      <ApplicationIconNewBase {...args} appIconData={embark.svgPathData} />
    </StyledWrapper>
  );
};
