import { forwardRef, ReactNode, useRef, useState } from 'react';

import { Typography } from '@equinor/eds-core-react';
import {
  ReleaseNote as ReleaseNoteDto,
  ReleaseNotesService,
} from '@equinor/subsurface-app-management';

import { RELEASE_NOTE_RICH_TEXT_COLLAPSED_HEIGHT } from './ReleaseNote.constants';
import { timeToRead, usingReleaseNoteDate } from './ReleaseNote.utils';
import { ToggleExpanded } from './ToggleExpanded';
import { colors, shape, spacings } from 'src/atoms/style';
import { formatDate, getImagesFromRichText } from 'src/atoms/utils';
import { RichTextDisplay } from 'src/molecules/RichTextDisplay/RichTextDisplay';
import { MetaTags } from 'src/organisms/ReleaseNote/MetaTags';

import { motion } from 'motion/react';
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
  width: 100%;
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

export type ReleaseNoteProps = {
  actionMenu?: ReactNode;
  expanded?: boolean;
} & ReleaseNoteDto;

export const ReleaseNote = forwardRef<HTMLDivElement, ReleaseNoteProps>(
  (
    {
      applicationName,
      releaseDate,
      createdDate,
      tags,
      version,
      title,
      body,
      actionMenu,
      expanded = false,
    },
    ref
  ) => {
    const usingDate = usingReleaseNoteDate({ releaseDate, createdDate });
    const initialHeight = useRef(
      expanded ? 'auto' : RELEASE_NOTE_RICH_TEXT_COLLAPSED_HEIGHT
    );
    const [isExpanded, setIsExpanded] = useState(expanded);
    const [needsShowMore, setNeedsShowMore] = useState(
      getImagesFromRichText(body).length > 0
    );
    const resizeObserver = useRef(
      new ResizeObserver((entries) => {
        if (
          entries.at(0) &&
          entries[0].target.scrollHeight >
            RELEASE_NOTE_RICH_TEXT_COLLAPSED_HEIGHT
        ) {
          setNeedsShowMore(true);
        }
      })
    );

    const handleOnToggleExpand = () => {
      setIsExpanded((prev) => !prev);
    };

    const handleOnSetRef = (element: HTMLDivElement | null) => {
      if (element) {
        resizeObserver.current.observe(element);
      }
    };

    return (
      <Container
        ref={ref}
        style={{ paddingBottom: isExpanded ? spacings.medium : undefined }}
      >
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
              {formatDate(usingDate)}
              {version ? ` ・ ${version}` : ''} ・ {timeToRead(body)}
            </Typography>
          </HeaderLeft>
          <MetaTags tags={tags}>{actionMenu}</MetaTags>
        </Header>
        <Typography variant="h4">{title}</Typography>
        <motion.div
          ref={handleOnSetRef}
          initial={{
            height: initialHeight.current,
          }}
          animate={{
            height: isExpanded
              ? 'auto'
              : RELEASE_NOTE_RICH_TEXT_COLLAPSED_HEIGHT,
          }}
          style={{
            overflow: isExpanded ? 'auto' : undefined,
            marginBottom:
              isExpanded && needsShowMore
                ? `calc(${spacings.medium} + ${shape.button.minHeight})`
                : undefined,
          }}
        >
          <RichTextDisplay
            value={body}
            onImageRead={ReleaseNotesService.getReleaseNoteImage}
            padding="none"
          />
        </motion.div>
        {needsShowMore && !expanded && (
          <ToggleExpanded
            expanded={isExpanded}
            onToggleExpanded={handleOnToggleExpand}
          />
        )}
      </Container>
    );
  }
);

ReleaseNote.displayName = 'ReleaseNote';
