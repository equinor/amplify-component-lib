import { FC } from 'react';

import {
  Button as EDSButton,
  DotProgress,
  Icon,
  Typography,
} from '@equinor/eds-core-react';
import {
  arrow_forward,
  assignment_user,
  do_not_disturb,
} from '@equinor/eds-icons';

import { useActiveImpersonationUser } from './ImpersonateMenu/hooks/useActiveImpersonationUser';
import { useStopImpersonation } from './ImpersonateMenu/hooks/useStopImpersonation';
import { OpenImpersonationMenuButton } from './Account.styles';
import { colors, spacings } from 'src/atoms/style';

import styled from 'styled-components';

const EndImpersonationButton = styled(EDSButton)`
  margin-top: ${spacings.large};
  width: 100%;
  height: 48px;
  svg {
    fill: ${colors.interactive.danger__resting.rgba};
  }
`;

interface ImpersonateButtonProps {
  onOpenImpersonateMenu: () => void;
  onClose: () => void;
}

export const ImpersonateButton: FC<ImpersonateButtonProps> = ({
  onOpenImpersonateMenu,
  onClose,
}) => {
  const { data: activeImpersonationUser } = useActiveImpersonationUser();
  const { mutateAsync: endImpersonation, isPending } = useStopImpersonation();

  const handleOnEndImpersonation = async () => {
    await endImpersonation();
    onClose();
  };

  if (activeImpersonationUser && isPending) {
    return (
      <EndImpersonationButton variant="outlined" color="danger">
        <DotProgress />
      </EndImpersonationButton>
    );
  }

  if (activeImpersonationUser)
    return (
      <EndImpersonationButton
        variant="outlined"
        color="danger"
        onClick={handleOnEndImpersonation}
      >
        <Icon data={do_not_disturb} />
        End impersonation
      </EndImpersonationButton>
    );

  return (
    <OpenImpersonationMenuButton onClick={onOpenImpersonateMenu}>
      <Icon data={assignment_user} />
      <Typography variant="button" group="navigation" as="span">
        Impersonate
      </Typography>
      <Icon data={arrow_forward} />
    </OpenImpersonationMenuButton>
  );
};
