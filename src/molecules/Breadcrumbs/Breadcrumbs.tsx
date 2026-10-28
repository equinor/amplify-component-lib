import { ComponentPropsWithRef } from 'react';

import { Breadcrumbs as EDSBreadcrumbs } from '@equinor/eds-core-react';

import styled from 'styled-components';

// EDS combines line-height: 1 with overflow: hidden, which cuts off descenders (g, p, y)
const Breadcrumb = styled(EDSBreadcrumbs.Breadcrumb)`
  && {
    line-height: 1.25;
  }
`;

export const Breadcrumbs = (
  props: ComponentPropsWithRef<typeof EDSBreadcrumbs>
) => <EDSBreadcrumbs {...props} />;

Breadcrumbs.Breadcrumb = Breadcrumb;
