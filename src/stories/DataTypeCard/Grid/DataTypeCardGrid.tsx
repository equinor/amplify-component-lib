import { Button, Chip, Icon } from "@equinor/eds-core-react";
import { more_vertical } from "@equinor/eds-icons";
import styled from "styled-components";
import DataTypeCard from "../DataTypeCard";
import DataTypeCardSkeleton from "../Skeleton/DataTypeCardSkeleton";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 12px;

  @media (max-width: 1920px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: 1500px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1285px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const DataTypeCardBody = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 4em;
`;

export interface DataTypeCardGridProps {
  skelleton: boolean;
}

const DataTypeCardGrid: React.FC<DataTypeCardGridProps> = ({ skelleton }) => (
  <Container>
    {new Array(17).fill(0).map((value, index) => {
      return skelleton ? (
        <DataTypeCardSkeleton key={value + index} />
      ) : (
        <DataTypeCard
          key={value + index}
          datatype={{ dataType: "dataType", discipline: "discipline" }}
          body={
            <DataTypeCardBody>
              <Chip>{"Responsible user"}</Chip>
              <Button variant="ghost_icon">
                <Icon data={more_vertical} />
              </Button>
            </DataTypeCardBody>
          }
        />
      );
    })}
  </Container>
);

export default DataTypeCardGrid;
