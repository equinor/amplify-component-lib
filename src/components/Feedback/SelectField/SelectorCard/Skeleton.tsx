import React from 'react';

import { Card } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import SkeletonBase from '../../SkeletonBase';

import styled from 'styled-components';
const { spacings, elevation, shape } = tokens;

const StyledCard = styled(Card)`
  position: absolute;
  left: 50%;
  top: 50%;
  max-height: 60vh;
  min-height: 150px;
  transform: translate(-50%, -50%);
  width: 25rem;
  align-items: center;
  padding: ${spacings.comfortable.large};
  box-shadow: ${elevation.raised};
  border-radius: ${shape.corners.borderRadius};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const InputBox = styled(SkeletonBase)`
  width: calc((25rem - 2 * ${spacings.comfortable.large}) * 0.8);
  height: calc(${shape.button.minHeight});
`;
const ButtonBox = styled(SkeletonBase)`
  width: ${shape.icon_button.minWidth};
  height: ${shape.icon_button.minHeight};

  border-radius: ${shape.icon_button.borderRadius};
`;

const SelectorSkeleton = () => {
  return (
    <StyledCard>
      <InputBox />
      <ButtonBox />
    </StyledCard>
  );
};

export default SelectorSkeleton;
