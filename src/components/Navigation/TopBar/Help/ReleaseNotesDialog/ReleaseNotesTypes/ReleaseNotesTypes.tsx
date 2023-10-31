import { FC } from 'react';

import { Icon as EDSIcon, Typography } from '@equinor/eds-core-react';
import { clear } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { spacings, shape, colors } = tokens;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.medium};
`;

const ChipContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

interface ChipProps {
  $active: boolean;
}

const StyledChip = styled.span<ChipProps>`
  font-family: 'Equionor', sans-serif;
  font-size: 12px;
  border-radius: ${shape.rounded.borderRadius};
  background-color: ${({ $active}) =>
    $active
      ? colors.ui.background__light.hex
      : colors.ui.background__default.hex};
  color: black;
  padding: 4px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  grid-gap: ${spacings.comfortable.small};

  > p {
    line-height: normal;
    height: min-content;
    font-size: 12px;
  }
`;

interface DotProps {
  $dotColor: string;
}

const Dot = styled.span<DotProps>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ $dotColor }) => $dotColor};
  position: relative;
`;

const Icon = styled(EDSIcon)`
  &:hover {
    cursor: pointer !important;
    background: ${colors.interactive.primary__hover_alt.hex};
    border-radius: ${shape.rounded.borderRadius};
  }
`;

type ReleaseNoteTypeInformation = {
  [key: string]: {
    dotColor: string;
  };
};

export const RELEASENOTETYPES_INFORMATION: ReleaseNoteTypeInformation = {
  Feature: {
    dotColor: '#0084C4',
  },
  Improvement: {
    dotColor: '#FF9200',
  },
  'Bug fix': {
    dotColor: '#EB0000',
  },
};

interface ReleaseNotesTypesProps {
  name: string;
  onClick?: () => void;
  active?: boolean;
  showIcon: boolean;
}

const ReleaseNotesTypes: FC<ReleaseNotesTypesProps> = ({
  name,
  onClick,
  active = false,
  showIcon = true,
}) => {
  const releaseNoteInfo = RELEASENOTETYPES_INFORMATION[name];

  return (
    <Container>
      <ChipContainer>
        <StyledChip onClick={onClick} $active={active}>
          <Dot $dotColor={releaseNoteInfo.dotColor} />
          <Typography group="ui" variant="chip__badge">
            {name}
          </Typography>
          {showIcon && <Icon data={clear} size={16} />}
        </StyledChip>
      </ChipContainer>
    </Container>
  );
};

export default ReleaseNotesTypes;
