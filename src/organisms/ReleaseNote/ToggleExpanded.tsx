import { FC } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { arrow_drop_down, arrow_drop_up } from '@equinor/eds-icons';

import { colors, spacings } from 'src/atoms/style';
import { Button } from 'src/molecules/Button/Button';

import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  gap: ${spacings.medium};
  padding: ${spacings.medium};
  background: linear-gradient(
    color-mix(in srgb, ${colors.ui.background__default.rgba} 10%, transparent)
      0%,
    ${colors.ui.background__default.rgba} 15%
  );
  width: 100%;
`;

interface ToggleExpandedProps {
  expanded: boolean;
  onToggleExpanded: () => void;
}

export const ToggleExpanded: FC<ToggleExpandedProps> = ({
  expanded,
  onToggleExpanded,
}) => {
  return (
    <Container>
      <Button variant="ghost" onClick={onToggleExpanded}>
        Show {expanded ? 'less' : 'more'}
        <Icon data={expanded ? arrow_drop_up : arrow_drop_down} />
      </Button>
    </Container>
  );
};
