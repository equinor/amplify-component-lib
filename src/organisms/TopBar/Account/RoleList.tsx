import { FC } from 'react';

import { Divider, Typography } from '@equinor/eds-core-react';

import { colors, spacings } from 'src/atoms/style';

import styled from 'styled-components';

const Container = styled.div`
  margin-top: calc(
    ${spacings.medium} - ${spacings.small}
  ); // small is the flex gap above this component
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  width: 100%;
  > hr {
    margin: ${spacings.small} 0;
  }
`;

const Content = styled.ul`
  max-height: 135px;
  margin: 0;
  overflow-y: auto;
  padding: 0 ${spacings.small} 0 ${spacings.large};
  list-style: square;
  > li::marker {
    color: ${colors.text.static_icons__secondary.rgba};
  }
`;

interface RoleListProps {
  roles: { value: string; label: string }[];
}

export const RoleList: FC<RoleListProps> = ({ roles }) => (
  <Container>
    <Typography variant="h6">App Access</Typography>
    <Divider />
    <Content>
      {roles
        .toSorted((a, b) => a.label.localeCompare(b.label))
        .map((role) => (
          <Typography
            variant="body_long"
            color={colors.text.static_icons__secondary.rgba}
            as="li"
            key={role.value}
          >
            {role.label}
          </Typography>
        ))}
    </Content>
    <Divider />
  </Container>
);
