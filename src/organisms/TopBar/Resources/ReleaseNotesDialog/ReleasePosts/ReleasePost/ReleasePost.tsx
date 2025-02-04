import { FC, useRef, useState } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { arrow_drop_down, arrow_drop_up } from '@equinor/eds-icons';
import { ReleaseNote } from '@equinor/subsurface-app-management';

import { ReleaseNotesTypes } from '../../ReleaseNotesTypes/ReleaseNotesTypes';
import { ReleaseNoteType } from '../../ReleaseNotesTypes/ReleaseNotesTypes.types';
import {
  AccordionText,
  BodyContainer,
  BtnContainer,
  Button,
  Container,
  HeadingContainer,
  ReleaseNoteTypeContainer,
  RightContainer,
  TitleContainer,
  TopContainer,
} from './ReleasePost.styles';
import { formatDate } from 'src/atoms';
import { RichTextDisplay } from 'src/molecules';
import { releaseNoteImageRead } from 'src/organisms/TopBar/Resources/ReleaseNotesDialog/ReleasePosts/ReleasePost/ReleasePost.utils';

import { motion } from 'framer-motion';

export const ReleasePost: FC<ReleaseNote> = ({
  createdDate,
  version,
  releaseDate,
  tags,
  title,
  body,
}) => {
  const [showFullContent, setShowFullContent] = useState<boolean>(false);
  const [needsShowMoreButton, setNeedsShowMoreButton] = useState(false);
  /* v8 ignore start */
  const resizeObserver = useRef<ResizeObserver>(
    new ResizeObserver((entries) => {
      // Since we only ever observer 1 element we can safely access [0]
      const { height } = entries[0].contentRect;
      setNeedsShowMoreButton(height > 108);
    })
  );

  const handleOnNewRef = (element: HTMLDivElement | null) => {
    if (element) {
      resizeObserver.current.observe(element);
    }
  };
  /* v8 ignore end */

  const toggleContent = () => {
    setShowFullContent((prev) => !prev);
  };
  const buttonText = showFullContent ? 'Read less' : 'Read more';

  return (
    <Container data-testid="release-post">
      <motion.div
        initial={{
          height: '250px',
        }}
        animate={{
          height: showFullContent ? 'auto' : '250px',
        }}
      >
        <TopContainer>
          <HeadingContainer>
            <Typography group="paragraph" variant="overline">
              {formatDate(releaseDate ? releaseDate : createdDate, {
                format: 'DD. month YYYY',
              })}
            </Typography>
            <Typography group="paragraph" variant="overline">
              {version}
            </Typography>
          </HeadingContainer>

          <RightContainer>
            {tags?.map((tag) => {
              return (
                <ReleaseNoteTypeContainer key={tag}>
                  <ReleaseNotesTypes
                    name={tag as ReleaseNoteType}
                    active={true}
                    showIcon={false}
                  />
                </ReleaseNoteTypeContainer>
              );
            })}
          </RightContainer>
        </TopContainer>
        <TitleContainer>
          <Typography group="heading" variant="h3">
            {title}
          </Typography>
        </TitleContainer>
        <BodyContainer ref={handleOnNewRef}>
          <RichTextDisplay value={body} onImageRead={releaseNoteImageRead} />
        </BodyContainer>
        <BtnContainer $open={needsShowMoreButton}>
          {needsShowMoreButton && (
            <Button variant="ghost_icon" onClick={toggleContent}>
              {showFullContent ? (
                <>
                  <AccordionText>{buttonText}</AccordionText>
                  <Icon data={arrow_drop_up} />
                </>
              ) : (
                <>
                  <AccordionText>{buttonText}</AccordionText>
                  <Icon data={arrow_drop_down} />
                </>
              )}
            </Button>
          )}
        </BtnContainer>
      </motion.div>
    </Container>
  );
};
