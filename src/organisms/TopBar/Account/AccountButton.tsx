import { forwardRef } from 'react';

import { useActiveImpersonationUser } from './ImpersonateMenu/hooks/useActiveImpersonationUser';
import { ProfileButton } from './Account.styles';
import { ImpersonateAvatar } from './ImpersonateAvatar';
import { colors, spacings, useAuth } from 'src/atoms';
import { Chip, ProfileAvatar } from 'src/molecules';

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacings.xx_small};
`;

const ImpersonationRoleChip = styled(Chip)`
  background: ${colors.interactive.warning__resting.rgba};
  outline: none;
  padding: 0;
`;

interface AccountButtonProps {
  onClick: () => void;
}

export const AccountButton = forwardRef<HTMLButtonElement, AccountButtonProps>(
  ({ onClick }, ref) => {
    const { account, photo } = useAuth();
    const { data: activeImpersonationUser } = useActiveImpersonationUser();
    const impersonationRoles = activeImpersonationUser?.roles.sort() ?? [];

    return (
      <Wrapper>
        {impersonationRoles.at(0) && (
          <ImpersonationRoleChip>{impersonationRoles[0]}</ImpersonationRoleChip>
        )}
        {impersonationRoles.length > 1 && (
          <ImpersonationRoleChip>
            {`+${impersonationRoles.length - 1}`}
          </ImpersonationRoleChip>
        )}
        <ProfileButton ref={ref} onClick={onClick}>
          {activeImpersonationUser ? (
            <ImpersonateAvatar size={36} />
          ) : (
            <ProfileAvatar size={36} name={account?.name} url={photo} />
          )}
        </ProfileButton>
      </Wrapper>
    );
  }
);

AccountButton.displayName = 'AccountButton';
