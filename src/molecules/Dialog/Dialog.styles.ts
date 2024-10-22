import { Dialog as EDSDialog } from '@equinor/eds-core-react';

import { colors } from 'src/atoms/style/colors';
import { spacings } from 'src/atoms/style/spacings';

import styled, { css } from 'styled-components';

interface StyledDialogProps {
  $withBorders: boolean;
}

export const DialogElement = styled(EDSDialog)`
  grid-gap: 0;
`;
export const DialogTitle = styled(EDSDialog.Title)<StyledDialogProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${spacings.medium};

  ${({ $withBorders }) => {
    if ($withBorders) {
      return css`
        border-bottom: 1px solid ${colors.ui.background__medium.rgba};
      `;
    }
    return '';
  }}
  > section {
    display: flex;
    flex-direction: column;
  }
`;

interface DialogContentProps {
  $withContentPadding: boolean;
}

export const DialogContent = styled(
  EDSDialog.CustomContent
)<DialogContentProps>`
  min-height: unset;
  overflow: auto;
  ${({ $withContentPadding }) => {
    if ($withContentPadding) {
      return css`
        padding: ${spacings.medium};
      `;
    }
    return css`
      padding: 0;
    `;
  }}
`;
export const DialogActions = styled(EDSDialog.Actions)<StyledDialogProps>`
  border-top: 1px solid ${colors.ui.background__medium.rgba};
  display: grid;
  grid-template-columns: auto auto auto;
  padding-top: ${spacings.medium};
  width: 100%;

  > section {
    display: flex;
    gap: ${spacings.small};
  }

  > section#dialog-actions-left {
    grid-column: 1;
  }

  > section#dialog-actions-center {
    grid-column: 2;
    justify-content: center;
  }

  > section#dialog-actions-right {
    grid-column: 3;
    justify-content: flex-end;
  }

  ${({ $withBorders }) => {
    if ($withBorders) {
      return css`
        border-top: 1px solid ${colors.ui.background__medium.rgba};
      `;
    }
    return css`
      border-top: none;
    `;
  }}
`;
