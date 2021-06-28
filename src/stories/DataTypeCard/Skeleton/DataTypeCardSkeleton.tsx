import React from "react";
import styled from "styled-components";
import { tokens } from "@equinor/eds-tokens";
import "./animation.css";

const { colors, spacings, elevation, shape } = tokens;

const TaskSkeleton = styled.div`
  background: ${colors.ui.background__default.hex};
  box-shadow: ${elevation.raised};
  border-radius: ${shape.corners.borderRadius};
  padding: ${spacings.comfortable.medium};
  height: 100%;
  width: 100%;
  display: flex;
  gap: ${spacings.comfortable.large};
  flex-direction: column;
`;

const Top = styled.div`
  display: flex;
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

const Bottom = styled.div`
  display: flex;
  margin-top: auto;
  align-items: baseline;
`;

const Assigned = styled.div`
  background: ${colors.ui.background__light.hex};
  height: 30px;
  width: 115px;
  border-radius: ${shape.circle.borderRadius};
`;

const Button = styled.div`
  background: ${colors.ui.background__light.hex};
  height: 40px;
  width: 12px;
  border-radius: ${shape.circle.borderRadius};
  margin-right: ${spacings.comfortable.small};
  margin-left: auto;
`;

const DataTypeCardSkeleton: React.FC = () => {
  return (
    <TaskSkeleton>
      <Top>
        <Title className="skeleton-loading" />
        <Status className="skeleton-loading" />
      </Top>
      <Bottom>
        <Assigned className="skeleton-loading" />
        <Button className="skeleton-loading" />
      </Bottom>
    </TaskSkeleton>
  );
};

export default DataTypeCardSkeleton;
