import { TextField, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { spacings, colors, shape } = tokens;

// FeedbackForm.tsx
export const Container = styled.div`
  width: 700px;
  height: fit-content;
  padding: 0 ${spacings.comfortable.medium} ${spacings.comfortable.medium}
    ${spacings.comfortable.medium};
`;

// FeedbackFormInner.tsx
export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacings.comfortable.medium};
  height: 100%;
  width: 100%;
  :first-child {
    grid-column: 1 / 3;
  }
`;

export const BugReportQuestions = styled.div``;

export const UploadInfo = styled.div`
  grid-column: 1/3;
  display: flex;
  gap: ${spacings.comfortable.small};
  height: fit-content;
  align-self: flex-end;
  align-items: center;
  background-color: ${colors.ui.background__info.hex};
  padding: ${spacings.comfortable.medium_small};
  border-radius: ${shape.button.borderRadius};
`;

export const FeedbackDescription = styled(TextField)`
  grid-column: 1/3;
`;

export const ReportLocationText = styled(Typography)`
  grid-column: 1/3;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${spacings.comfortable.medium};
  grid-column: 1/3;
`;
