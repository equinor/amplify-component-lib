import { Breadcrumbs as EDSBreadcrumbs } from '@equinor/eds-core-react';

import styled from 'styled-components';

// EDS combines line-height: 1 with overflow: hidden, which cuts off descenders (g, p, y)
export const Breadcrumbs = styled(EDSBreadcrumbs)`
  && li:not([aria-hidden]) > * {
    line-height: 1.25;
  }
`;
