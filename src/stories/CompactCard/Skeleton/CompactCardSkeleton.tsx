import React from 'react';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';

const { colors, spacings, elevation, shape } = tokens;

const FolderSkeleton = styled.div`
  background: ${colors.ui.background__default.hex};
  box-shadow: ${elevation.none};
  border-radius: ${shape.corners.borderRadius};
  padding: ${spacings.comfortable.medium};
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 80% 20%;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.small};
`;

const Right = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Label = styled.div`
  height: 10px;
  width: 80%;
  background: ${colors.ui.background__light.hex};
  border-radius: ${shape.circle.borderRadius};
`;

const Title = styled.div`
  height: 20px;
  width: 40%;
  background: ${colors.ui.background__light.hex};
  border-radius: ${shape.circle.borderRadius};
`;

const Status = styled.div`
  height: 30px;
  width: 30px;
  background: ${colors.ui.background__light.hex};
  border-radius: ${shape.rounded.borderRadius};
  margin-left: auto;
`;

const CompactCardSkeleton: React.FC = () => {
  return (
    <FolderSkeleton>
      <Left>
        <Label />
        <Title />
      </Left>
      <Right>
        <Status />
      </Right>
    </FolderSkeleton>
  );
};

export default CompactCardSkeleton;
