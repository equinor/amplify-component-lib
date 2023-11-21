import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import LockedInputTooltip from './components/FeedbackForm/LockedInputTooltip';

import styled from 'styled-components';

const { spacings, colors, shape } = tokens;

// General
export const ContentWrapper = styled.div`
  width: 700px;
  height: fit-content;
  padding: 0 ${spacings.comfortable.medium} ${spacings.comfortable.medium}
    ${spacings.comfortable.medium};
`;

// FeedbackForm.tsx
export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacings.comfortable.medium};
  height: 100%;
  width: 100%;
`;

export const BugReportQuestions = styled.div`
  grid-column: 1 / 3;
`;

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

export const FeedbackTitleTooltip = styled(LockedInputTooltip)`
  grid-column: 1/3;
`;
export const FeedbackDescriptionTooltip = styled(LockedInputTooltip)`
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
