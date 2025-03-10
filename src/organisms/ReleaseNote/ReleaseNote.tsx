import { FC, ReactNode, useRef, useState } from 'react';

import { Typography } from '@equinor/eds-core-react';
import {
  ReleaseNote as ReleaseNoteDto,
  ReleaseNotesService,
} from '@equinor/subsurface-app-management';

import { RELEASE_NOTE_RICH_TEXT_COLLAPSED_HEIGHT } from './ReleaseNote.constants';
import { timeToRead } from './ReleaseNote.utils';
import { ToggleExpanded } from './ToggleExpanded';
import { formatRelativeDateTime, shape } from 'src/atoms';
import { colors, spacings } from 'src/atoms/style';
import { RichTextDisplay } from 'src/molecules';
import { MetaTags } from 'src/organisms/ReleaseNote/MetaTags';

import { motion } from 'framer-motion';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${spacings.medium};
  position: relative;
  background: ${colors.ui.background__default.rgba};
  border: 1px solid ${colors.ui.background__heavy.rgba};
  border-radius: ${shape.corners.borderRadius};
  min-width: 800px;
  overflow: hidden;
  > h4 {
    margin-top: ${spacings.large};
    margin-bottom: ${spacings.medium};
  }
  padding-bottom: calc(
    68px + ${spacings.medium}
  ); // Space for the expand button
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLeft = styled.section`
  display: flex;
  gap: ${spacings.medium};
  align-items: center;
`;

type ReleaseNoteProps = {
  actionMenu?: ReactNode;
  startExpanded?: boolean;
} & ReleaseNoteDto;

export const ReleaseNote: FC<ReleaseNoteProps> = ({
  applicationName,
  releaseDate,
  createdDate,
  tags,
  title,
  body,
  actionMenu,
  startExpanded = false,
}) => {
  const usingDate = releaseDate ?? createdDate;
  const initialHeight = useRef(
    startExpanded ? 'auto' : RELEASE_NOTE_RICH_TEXT_COLLAPSED_HEIGHT
  );
  const [expanded, setExpanded] = useState(startExpanded);

  const handleOnToggleExpand = () => {
    setExpanded((prev) => !prev);
    if (initialHeight.current === 'auto') {
      initialHeight.current = RELEASE_NOTE_RICH_TEXT_COLLAPSED_HEIGHT;
    }
  };

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <Typography
            variant="caption"
            color={colors.text.static_icons__secondary.rgba}
          >
            {applicationName}
          </Typography>
          <Typography
            variant="overline"
            color={colors.text.static_icons__tertiary.rgba}
          >
            {formatRelativeDateTime(usingDate)}・{timeToRead(body)}
          </Typography>
        </HeaderLeft>
        <MetaTags tags={tags}>{actionMenu}</MetaTags>
      </Header>
      <Typography variant="h4">{title}</Typography>
      <motion.div
        initial={{
          height: initialHeight.current,
        }}
        animate={{
          height: expanded ? 'auto' : RELEASE_NOTE_RICH_TEXT_COLLAPSED_HEIGHT,
        }}
      >
        <RichTextDisplay
          value={body}
          onImageRead={ReleaseNotesService.getReleaseNoteImage}
          padding="none"
        />
      </motion.div>
      <ToggleExpanded
        expanded={expanded}
        onToggleExpanded={handleOnToggleExpand}
      />
    </Container>
  );
};
