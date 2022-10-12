import React, { FC } from 'react';

import { tokens } from '@equinor/eds-tokens';

import SkeletonBase from '../../SkeletonBase';

import styled from 'styled-components';

const { spacings, colors, elevation, shape } = tokens;

const Card = styled.div`
  padding: ${spacings.comfortable.medium};
  width: 240px;
  background: ${colors.ui.background__default.hex};
  box-shadow: ${elevation.raised};
  border-radius: ${shape.corners.borderRadius};
  display: grid;
  grid-template-columns: 80% 20%;
  justify-content: space-between;
  align-items: center;
`;

const Header = styled(SkeletonBase)`
  height: 12px;
  margin-bottom: 4px;
  width: 25%;
  border-radius: ${shape.circle.borderRadius};
`;

const Name = styled(SkeletonBase)`
  width: 80%;
  margin-top: 4px;
  height: 20px;
  border-radius: ${shape.circle.borderRadius};
`;

const Icon = styled(SkeletonBase)`
  width: 25px;
  height: 25px;
  justify-self: center;
  border-radius: ${shape.circle.borderRadius};
`;

const FieldCardSkeleton: FC = () => {
  return (
    <Card role="busy">
      <div>
        <Header />
        <Name />
      </div>
      <Icon />
    </Card>
  );
};

export default FieldCardSkeleton;
