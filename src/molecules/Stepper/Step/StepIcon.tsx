import { FC } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { check } from '@equinor/eds-icons';

import { colors, shape } from 'src/atoms/style';
import { useStepper } from 'src/providers/StepperProvider';

import styled from 'styled-components';

interface IconWrapperProps {
  $filled?: boolean;
  $outlined?: boolean;
}

const IconWrapper = styled.span<IconWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
  border-radius: ${shape.circle.borderRadius};
  border: 2px solid
    ${({ $filled, $outlined }) =>
      ($filled ?? $outlined)
        ? colors.interactive.primary__resting.rgba
        : colors.interactive.disabled__text.rgba};
  background: ${({ $filled }) =>
    $filled ? colors.interactive.primary__resting.rgba : 'none'};
  > p {
    // Ensure text icons are not squished
    padding: 8px;
    color: ${(props) =>
      props.$filled
        ? colors.text.static_icons__primary_white.rgba
        : colors.interactive.disabled__text.rgba};
  }
  > svg {
    transform: scale(0.9);
  }
`;

interface StepIconProps {
  index: number;
}

export const StepIcon: FC<StepIconProps> = ({ index }) => {
  const { currentStep } = useStepper();

  if (index >= currentStep) {
    return (
      <IconWrapper $filled={index === currentStep}>
        <Typography variant="caption">{index + 1}</Typography>
      </IconWrapper>
    );
  }

  return (
    <IconWrapper $outlined data-testid="wrapper">
      <Icon data={check} color={colors.interactive.primary__resting.rgba} />
    </IconWrapper>
  );
};
