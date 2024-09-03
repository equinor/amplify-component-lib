import { FC, ReactElement, useMemo, useState } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { TypographyVariants } from '@equinor/eds-core-react/dist/types/components/Typography/Typography.tokens';
import { check } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { spacings } from 'src/atoms/style';

import styled from 'styled-components';

const { colors, shape } = tokens;

interface ContainerProps {
  $clickable: boolean;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  gap: ${spacings.small};
  align-items: center;
  white-space: nowrap;
  ${(props) =>
    props.$clickable &&
    `
    &:hover {
        cursor: pointer;
    }
  `}
`;

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
    ${(props) =>
      (props.$filled ?? props.$outlined)
        ? colors.interactive.primary__resting.rgba
        : colors.interactive.disabled__text.rgba};
  background: ${(props) =>
    props.$filled ? colors.interactive.primary__resting.rgba : 'none'};
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

interface StepProps {
  currentIndex: number;
  setCurrentIndex: (value: number) => void;
  index: number;
  onlyShowCurrentStepLabel?: boolean;
  children?: string;
}

const Step: FC<StepProps> = ({
  currentIndex,
  setCurrentIndex,
  index,
  onlyShowCurrentStepLabel = false,
  children,
}) => {
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const StepIcon = useMemo((): ReactElement => {
    if (index >= currentIndex) {
      return (
        <IconWrapper $filled={index === currentIndex}>
          <Typography variant="caption">{index + 1}</Typography>
        </IconWrapper>
      );
    }
    return (
      <IconWrapper $outlined data-testid="wrapper">
        <Icon data={check} color={colors.interactive.primary__resting.rgba} />
      </IconWrapper>
    );
  }, [index, currentIndex]);

  const textVariant = useMemo((): TypographyVariants => {
    if (index < currentIndex) return 'body_short';
    return 'body_short_bold';
  }, [currentIndex, index]);

  const textColor = useMemo((): string | undefined => {
    if (index > currentIndex) return colors.interactive.disabled__text.rgba;
    return colors.text.static_icons__default.rgba;
  }, [currentIndex, index]);

  const handleOnClick = () => {
    if (index < currentIndex) {
      setCurrentIndex(index);
    }
  };

  return (
    <Container
      data-testid="step"
      ref={(ref: HTMLDivElement | null) => {
        if (containerRef === null && ref !== null) {
          setContainerRef(ref);
        }
      }}
      style={
        containerRef !== null && !onlyShowCurrentStepLabel
          ? {
              width: `calc(${containerRef.clientWidth}px)`,
            }
          : undefined
      }
      $clickable={index < currentIndex}
      onClick={handleOnClick}
    >
      {StepIcon}
      {(!onlyShowCurrentStepLabel || currentIndex === index) && (
        <Typography variant={textVariant} color={textColor}>
          {children}
        </Typography>
      )}
    </Container>
  );
};

export default Step;
