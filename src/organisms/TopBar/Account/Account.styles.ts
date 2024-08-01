import { Chip } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import { animation, spacings } from 'src/atoms/style';

import styled from 'styled-components';

const { colors, shape } = tokens;

export const ProfileButton = styled.button`
  border-radius: 50%;
  padding: 0;
  outline-offset: ${spacings.x_small};
  background: none;
  cursor: pointer;
  &:focus {
    outline: 2px dashed ${colors.interactive.primary__resting.rgba};
  }
`;

export const Container = styled.div`
  padding: ${spacings.medium} ${spacings.small} 0 ${spacings.small};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacings.small};
  > div:first-child {
    border: 1px solid ${colors.text.static_icons__primary_white.rgba};
    border-radius: 50%;
  }
`;

export const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RolesContainer = styled.section`
  display: flex;
  gap: ${spacings.small};
  margin-top: ${spacings.small};
`;

export const RoleChip = styled(Chip)`
  background: ${colors.ui.background__light.rgba};
  border: 1px solid ${colors.ui.background__medium.rgba};
  color: ${colors.text.static_icons__default.rgba};
`;

export const ButtonWrapper = styled.div`
  display: grid;
  margin-top: ${spacings.x_large};
  justify-content: center;
`;

export const ImpersonateButton = styled.button`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: ${spacings.medium_small};
  width: 100%;
  padding: ${spacings.small};
  border-radius: ${shape.button.borderRadius};
  background: ${colors.ui.background__light.rgba};
  transition: background ${animation.transitionMS};
  > span {
    color: ${colors.interactive.primary__resting.rgba};
  }
  > svg {
    fill: ${colors.interactive.primary__resting.rgba};
  }
  &:hover {
    background: ${colors.ui.background__medium.rgba};
  }
`;
