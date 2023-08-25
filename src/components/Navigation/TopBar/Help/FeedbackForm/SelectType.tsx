import { Dispatch, FC, SetStateAction } from 'react';

import { Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { FeedbackEnum } from './FeedbackForm.types';

import styled from 'styled-components';

const { spacings } = tokens;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacings.comfortable.small};
`;

interface SelectTypeProps {
  setSelectedType: Dispatch<SetStateAction<FeedbackEnum | undefined>>;
}

const SelectType: FC<SelectTypeProps> = ({ setSelectedType }) => {
  return (
    <Wrapper>
      <Button onClick={() => setSelectedType(FeedbackEnum.ERROR)}>
        Report error
      </Button>
      <Button onClick={() => setSelectedType(FeedbackEnum.INQUIRY)}>
        General inquiry
      </Button>
    </Wrapper>
  );
};

export default SelectType;
