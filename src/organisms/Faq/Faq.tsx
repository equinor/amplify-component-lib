import { FC } from 'react';

import { Typography } from '@equinor/eds-core-react';

import { Container } from './Faq.styles';
import { Header } from './Header';
import { Category } from 'src/organisms/Faq/Category/Category';

export const Faq: FC = () => {
  return (
    <Container>
      <Typography variant="h1" bold>
        FAQ
      </Typography>
      <Header />
      <Category />
      <Category />
      <Category />
      <Category />
    </Container>
  );
};
