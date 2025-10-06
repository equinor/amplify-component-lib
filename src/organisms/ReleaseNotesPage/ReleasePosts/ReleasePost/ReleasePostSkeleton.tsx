import { type FC, useRef } from 'react';

import { colors, shape, spacings } from 'src/atoms/style';
import { SkeletonBase } from 'src/molecules/Skeleton/SkeletonBase/SkeletonBase';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${colors.ui.background__default.rgba};
  border: 1px solid ${colors.ui.background__heavy.rgba};
  width: 100%;
  padding: ${spacings.medium};
  border-radius: ${shape.corners.borderRadius};
  gap: ${spacings.xx_large};
  height: 300px;
  > header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div {
      display: flex;
      gap: ${spacings.small};
    }
  }
  > section {
    display: flex;
    flex-direction: column;
    gap: ${spacings.small};
  }
`;

const AppName = styled(SkeletonBase)`
  border-radius: ${shape.corners.borderRadius};
  height: 0.875rem;
  width: 4rem;
`;

const ChipSkeleton = styled(SkeletonBase)`
  border-radius: ${shape.rounded.borderRadius};
  width: 5rem;
  height: 24px;
`;

const Line = styled(SkeletonBase)`
  border-radius: ${shape.corners.borderRadius};
  height: 16px;
  width: 4rem;
`;

export const ReleasePostSkeleton: FC = () => {
  const lines = useRef(
    Array.from({ length: 7 })
      .fill(0)
      .map(() => `${Math.random() * 400 + 100}px`)
  );

  return (
    <Container>
      <header>
        <AppName />
        <div>
          <ChipSkeleton />
          <ChipSkeleton />
        </div>
      </header>
      <section>
        {lines.current.map((lineWidth, index) => (
          <Line
            key={`line-skeleton-${index.toString()}`}
            style={{ width: lineWidth }}
          />
        ))}
      </section>
    </Container>
  );
};
