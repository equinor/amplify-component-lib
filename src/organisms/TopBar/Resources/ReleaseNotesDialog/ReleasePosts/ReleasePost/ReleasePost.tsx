import { FC, useState } from 'react';

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
import { TextContent } from './TextContent';
import { date } from 'src/atoms/utils';

import { motion } from 'framer-motion';

export const ReleasePost: FC<ReleaseNote> = ({
  createdDate,
  version,
  tags,
  title,
  body,
}) => {
  const [showFullContent, setShowFullContent] = useState<boolean>(false);
  const [needsShowMoreButton, setNeedsShowMoreButton] = useState(false);

  // TODO: Could not get the test to work properly (get the height from the element), created a task for it (BUG 438384 in Azure board)
  /* c8 ignore start */
  const handleOnNewRef = (element: HTMLDivElement | null) => {
    if (element) {
      const { clientHeight } = element;
      setNeedsShowMoreButton(clientHeight > 108);
    }
  };
  /* c8 ignore end */

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
              {date.formatDate(createdDate, {
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
          <TextContent text={body ?? ''} />
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
