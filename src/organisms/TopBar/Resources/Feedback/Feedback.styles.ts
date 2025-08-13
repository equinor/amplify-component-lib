import { Typography } from '@equinor/eds-core-react';

import { colors, shape, spacings } from 'src/atoms/style';

import styled from 'styled-components';

// General
export const ContentWrapper = styled.div`
  width: 700px;
  height: fit-content;
  padding: 0 ${spacings.medium} ${spacings.medium} ${spacings.medium};
`;

// FeedbackForm.tsx
export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacings.medium};
  height: 100%;
  width: 100%;
`;

export const UploadInfo = styled.div`
  grid-column: 1/3;
  display: flex;
  gap: ${spacings.small};
  height: fit-content;
  align-self: flex-end;
  align-items: center;
  background-color: ${colors.ui.background__info.rgba};
  padding: ${spacings.medium_small};
  border-radius: ${shape.button.borderRadius};
`;
export const LockedFormWarning = styled.div`
  grid-column: 1/3;
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: ${spacings.small};
  height: fit-content;
  align-items: center;
  background-color: ${colors.ui.background__warning.rgba};
  padding: ${spacings.medium_small};
  border-radius: ${shape.button.borderRadius};
`;

export const ReportLocationText = styled(Typography)`
  grid-column: 1/3;
`;

export const Actions = styled.div`
  grid-column: 1/3;
  display: flex;
  justify-content: space-between;
  > div {
    display: flex;
    gap: ${spacings.medium};
  }
`;
