import { Dispatch, FC, SetStateAction } from 'react';

import { Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { FeedbackType } from './FeedbackForm';

import styled from 'styled-components';

const { spacings } = tokens;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacings.comfortable.small};
`;

interface SelectTypeProps {
  setSelectedType: Dispatch<SetStateAction<FeedbackType | undefined>>;
}

const SelectType: FC<SelectTypeProps> = ({ setSelectedType }) => {
  return (
    <div>
      <Wrapper>
        <Button onClick={() => setSelectedType(FeedbackType.ERROR)}>
          Report error
        </Button>
        <Button onClick={() => setSelectedType(FeedbackType.INQUIRY)}>
          General inquiry
        </Button>
      </Wrapper>
    </div>
  );
};

export default SelectType;
