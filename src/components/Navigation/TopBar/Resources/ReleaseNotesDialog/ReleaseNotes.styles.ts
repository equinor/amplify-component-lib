import { Dialog } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { spacings } from 'src/style';

import styled from 'styled-components';

const { colors } = tokens;

const StyledDialog = styled(Dialog)`
  background-color: ${colors.ui.background__light.rgba};
  width: 85vw;
  height: 85vh;
  display: flex;
  flex-direction: column;
  padding-left: ${spacings.large}; // Due to where we've put the scroll bar, we will fix the right padding in a different element
  overflow: hidden;
`;

const Wrapper = styled.div`
  min-width: calc(100% - 73px - 48px);
  padding-bottom: 64px;
  display: flex;
  column-gap: ${spacings.xx_large};
`;

const LeftContainer = styled.div`
  top: 0px;
  position: sticky;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  > div {
    display: flex;
    flex-direction: column;
    min-width: 200px;
    @media (max-width: 1000px) {
      max-width: 150px;
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: ${spacings.xx_large};
  width: 100%;
`;
const ScrollWrapper = styled.div`
  height: fit-content;
  overflow-y: auto;
  padding-bottom: ${spacings.xxx_large};
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 168px;
`;

export {
  Content,
  LeftContainer,
  LoadingWrapper,
  ScrollWrapper,
  StyledDialog,
  Wrapper,
};
