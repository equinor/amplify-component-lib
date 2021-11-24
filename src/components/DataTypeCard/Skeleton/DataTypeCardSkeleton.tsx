import React from 'react';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import './animation.css';
import { Card as EDSCard } from '@equinor/eds-core-react';

const { colors, spacings, elevation, shape } = tokens;

const Card = styled(EDSCard)`
  box-shadow: ${elevation.raised};
  grid-gap: 0px;
`;

const Header = styled(Card.Header)`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  & > :not(:first-child) {
    margin-left: 0 !important;
    padding: ${spacings.comfortable.small};
  }
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

const DataTypeCardSkeleton: React.FC = () => {
  return (
    <Card>
      <Header>
        <Card.HeaderTitle>
          <Top>
            <Title className="skeleton-loading" />
            <Status className="skeleton-loading" />
          </Top>
        </Card.HeaderTitle>
      </Header>
      <Header>
        <Card.HeaderTitle>
          <Top>
            <Title className="skeleton-loading" />
            <Status className="skeleton-loading" />
          </Top>
        </Card.HeaderTitle>
      </Header>
    </Card>
  );
};

export default DataTypeCardSkeleton;
