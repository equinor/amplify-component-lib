import { SkeletonBase } from './SkeletonBase/SkeletonBase';
import { shape, spacings } from 'src/atoms/style';

import styled from 'styled-components';

export const SkeletonField = styled(SkeletonBase)`
  position: absolute;
  left: ${spacings.small};
  border-radius: ${shape.corners.borderRadius};
  transform: translateY(${spacings.x_small});
  height: 100%;
  top: 0;
`;
