import { FC } from 'react';

import { Button, Typography } from '@equinor/eds-core-react';

import { spacings } from 'src/atoms/style/spacings';
import { useStartImpersonation } from 'src/organisms/TopBar/Account/Impersonate/hooks/useStartImpersonation';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${spacings.medium};
  width: 20rem;
`;

const Section = styled.section`
  display: flex;
  justify-content: flex-end;
  gap: ${spacings.small};
`;

interface ActionsProps {
  selectedUniqueName: string;
  onCancel: () => void;
}

export const Actions: FC<ActionsProps> = ({ selectedUniqueName, onCancel }) => {
  const { mutateAsync, isPending } = useStartImpersonation();

  const handleOnStartImpersonate = async () => {
    await mutateAsync(selectedUniqueName);
    onCancel();
  };
  return (
    <Container>
      <Typography variant="body_short">
        By selecting a user to impersonate, you will view the contents of this
        app as if you would be that user.
      </Typography>
      <Section>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={handleOnStartImpersonate}
          disabled={selectedUniqueName !== ''}
        >
          Impersonate
        </Button>
      </Section>
    </Container>
  );
};
