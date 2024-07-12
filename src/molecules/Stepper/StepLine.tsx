import { FC, useMemo } from 'react';

import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { colors } = tokens;

interface LineProps {
  $background: string;
}

const Line = styled.hr<LineProps>`
  height: 1px;
  width: 100%;
  background: ${(props) => props.$background};
  border: none;
  margin: 0;
`;

interface StepLineProps {
  done: boolean;
}

const StepLine: FC<StepLineProps> = ({ done }) => {
  const background = useMemo((): string => {
    if (done) return colors.interactive.primary__resting.rgba;
    return colors.interactive.disabled__text.rgba;
  }, [done]);
  return <Line $background={background} />;
};

export default StepLine;
