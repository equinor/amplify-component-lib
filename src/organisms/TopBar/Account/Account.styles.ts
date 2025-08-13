import { animation, colors, shape, spacings } from 'src/atoms/style';
import { Chip } from 'src/molecules/Chip/Chip';

import styled from 'styled-components';

export const ProfileButton = styled.button`
  border-radius: 50%;
  padding: 0;
  outline-offset: ${spacings.x_small};
  background: none;
  cursor: pointer;
`;

export const Container = styled.div`
  padding: ${spacings.medium} ${spacings.medium} 0 ${spacings.medium};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacings.small};
`;

export const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonWrapper = styled.div`
  display: grid;
  margin-top: ${spacings.x_large};
  justify-content: center;
`;
export const OpenImpersonationMenuButton = styled.button`
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
    background: ${colors.interactive.primary__hover_alt.rgba};
  }
`;

export const RolesContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 350px;
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  gap: ${spacings.small};
  margin-top: ${spacings.small};
`;

export const RoleChip = styled(Chip)`
  background: ${colors.ui.background__light.rgba};
  border: 1px solid ${colors.ui.background__medium.rgba};
  color: ${colors.text.static_icons__default.rgba};
`;
