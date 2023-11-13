import { FC } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { clear } from '@equinor/eds-icons';

import {
  ChipContainer,
  Container,
  Dot,
  Icon,
  StyledChip,
} from './ReleaseNotesTypes.styles';
import {
  ReleaseNotesTypesProps,
  RELEASENOTETYPES_INFORMATION,
} from './ReleaseNotesTypes.types';

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
