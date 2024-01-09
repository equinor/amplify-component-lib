import { FC } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { spacings } = tokens;

interface DefaultNotificationProps {
  message?: string;
}

const DeafultNotification: FC<DefaultNotificationProps> = ({ message }) => {
  return (
    <>
      <Typography group="table" variant="cell_text">
        {message}
      </Typography>
    </>
  );
};

export default DeafultNotification;
