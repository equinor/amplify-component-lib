import { InformationalNoticeProps } from './InformationalNotice';
import { colors, spacings } from 'src/atoms/style';

import styled, { css } from 'styled-components';

const CONTAINER_PADDINGS: Record<
  NonNullable<InformationalNoticeProps['spacing']>,
  {
    padding: string;
    gap: string;
  }
> = {
  compact: {
    gap: spacings.medium_small,
    padding: spacings.small,
  },
  comfortable: {
    gap: spacings.medium,
    padding: spacings.medium_small,
  },
};

interface ContainerProps {
  $color: InformationalNoticeProps['color'];
  $spacing: InformationalNoticeProps['spacing'];
}

export const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: auto 1fr;
  background: ${({ $color }) =>
    $color === 'white'
      ? colors.ui.background__default.rgba
      : colors.ui.background__light.rgba};
  ${({ $spacing }) => {
    const { gap, padding } = CONTAINER_PADDINGS[$spacing || 'comfortable'];

    return css`
      padding: ${padding};
      gap: ${gap};
    `;
  }}
`;
