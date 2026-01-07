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
  padding: ${spacings.small} ${spacings.x_small} ${spacings.small}
    ${spacings.medium};

  ${({ $withBorders }) => {
    if ($withBorders) {
      return css`
        border-bottom: 1px solid ${colors.ui.background__heavy.rgba};
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
  $withContentPaddingY: boolean;
  $withContentPaddingX: boolean;
}

export const DialogContent = styled(
  EDSDialog.CustomContent
)<DialogContentProps>`
  min-height: unset;
  overflow: auto;
  ${({ $withContentPaddingX, $withContentPaddingY }) => {
    return css`
      padding: ${$withContentPaddingY ? spacings.medium : 0}
        ${$withContentPaddingX ? spacings.medium : 0};
    `;
  }}
`;
export const DialogActions = styled(EDSDialog.Actions)<StyledDialogProps>`
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
        border-top: 1px solid ${colors.ui.background__heavy.rgba};
      `;
    }
    return css`
      border-top: none;
    `;
  }}
`;

export const AdditionalInfoBanner = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${spacings.medium};
  padding: ${spacings.medium};
  background-color: ${colors.ui.background__info.rgba};
`;

export const InfoIconWrapper = styled.div`
  display: flex;
  align-items: center;
`;
