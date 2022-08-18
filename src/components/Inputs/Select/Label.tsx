import { FC, memo } from 'react';

import styled from 'styled-components';

type LabelProps = {
  label: string;
  required?: boolean | undefined;
};

const Wrapper = styled.span`
  font-family: var(--font-main);
  padding-bottom: 4px;
`;

const Label: FC<LabelProps> = ({ label, required }) => {
  const requiredIcon = required ? (
    <span style={{ color: 'red' }}>*</span>
  ) : null;
  return (
    <Wrapper>
      {label}
      {requiredIcon}
    </Wrapper>
  );
};

export default memo(Label);
