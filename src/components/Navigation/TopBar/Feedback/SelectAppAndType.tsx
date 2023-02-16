import { FC, useState } from 'react';

import {
  Autocomplete,
  AutocompleteChanges,
  Button,
} from '@equinor/eds-core-react';

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

interface SelectAppAndTypeProps {
  test?: string;
}

const SelectAppAndType: FC<SelectAppAndTypeProps> = ({ test }) => {
  const apps = ['Recap', 'Pressure', 'Qualification Logging', 'Amplify Portal'];
  const [selectedApp, setSelectedApp] = useState('Recap');
  return (
    <Wrapper>
      <Autocomplete
        options={apps}
        label="Select application"
        selectedOptions={[selectedApp ?? '']}
        initialSelectedOptions={['Recap']}
        onOptionsChange={(change: AutocompleteChanges<string>) =>
          change.selectedItems[0] && setSelectedApp(change.selectedItems[0])
        }
      />
      <ButtonWrapper>
        <Button>Bug</Button>
        <Button>General feedback</Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default SelectAppAndType;
