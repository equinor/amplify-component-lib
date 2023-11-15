import { FC } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { clear } from '@equinor/eds-icons';

import { Dot, StyledChip } from './ReleaseNotesTypes.styles';
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
    <StyledChip
      variant="ghost"
      onClick={onClick}
      $active={active}
      className={`release-notes-chip-${name}`}
    >
      <Dot $dotColor={releaseNoteInfo.dotColor} />
      <Typography group="ui" variant="chip__badge">
        {name}
      </Typography>
      {showIcon && <Icon data={clear} size={16} />}
    </StyledChip>
  );
};

export default ReleaseNotesTypes;
