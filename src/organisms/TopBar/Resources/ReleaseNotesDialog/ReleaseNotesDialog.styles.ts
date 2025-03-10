import { Dialog } from '@equinor/eds-core-react';

import { colors, spacings } from 'src/atoms/style';

import styled from 'styled-components';

export const StyledDialog = styled(Dialog)`
  background-color: ${colors.ui.background__light.rgba};
  width: 1280px;
  height: 85vh;
  display: flex;
  flex-direction: column;
  padding: ${spacings.xxx_large};
  overflow: hidden;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 168px;
`;

export const AllReleaseNotesWrapper = styled.div`
  align-self: center;
  justify-self: flex-end;
  margin-top: auto;
  margin-bottom: calc((${spacings.xxx_large} * -1) + ${spacings.medium});
`;
