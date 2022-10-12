import { FC, ReactNode } from 'react';

import styled from 'styled-components';

type LabelGroupProps = {
  inputId: string;
  children: ReactNode;
};

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
`;

const LabelGroup: FC<LabelGroupProps> = ({ inputId, ...props }) => (
  <StyledLabel htmlFor={inputId}>{props.children}</StyledLabel>
);

export default LabelGroup;
