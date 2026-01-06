import { FC } from 'react';

import { spacings } from 'src/atoms';
import { SkeletonBase } from 'src/molecules';

import styled from 'styled-components';

const Wrapper = styled.div`
  padding: ${spacings.medium};
  display: flex;
`;

const TextSkeleton = styled(SkeletonBase)`
  height: 24px;
  width: 46%;
`;

export const SelectItemSkeleton: FC = () => {
  return (
    <Wrapper data-testid="select-item-skeleton">
      <TextSkeleton />
    </Wrapper>
  );
};
