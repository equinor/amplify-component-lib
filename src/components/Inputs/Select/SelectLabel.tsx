import { FC, ReactNode } from 'react';

import Label from './Label';
import LabelGroup from './LabelGroup';

import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

interface SelectLabelProps {
  id: string;
  label: string;
  required?: boolean | undefined;
  children: ReactNode;
}

const SelectLabel: FC<SelectLabelProps> = ({
  id,
  label,
  required,
  children,
}) => {
  return (
    <Wrapper>
      <LabelGroup inputId={id}>
        <Label label={label} required={required} />
      </LabelGroup>
      {children}
    </Wrapper>
  );
};

export default SelectLabel;
