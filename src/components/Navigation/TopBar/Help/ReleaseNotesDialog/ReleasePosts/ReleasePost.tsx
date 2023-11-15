import { FC, useState } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { arrow_drop_down, arrow_drop_up } from '@equinor/eds-icons';

import ReleaseNotesTypes from '../ReleaseNotesTypes/ReleaseNotesTypes';
import { ReleaseNoteType } from '../ReleaseNotesTypes/ReleaseNotesTypes.types';
import TextContent from '../TextContent';
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
import { ReleaseNote } from 'src/api/models/ReleaseNote';
import { date } from 'src/utils';

import { AnimatePresence, motion } from 'framer-motion';

const ReleasePost: FC<ReleaseNote> = ({
  createdDate,
  version,
  tags,
  title,
  body,
}) => {
  const [showFullContent, setShowFullContent] = useState<boolean>(false);
  const [needsShowMoreButton, setNeedsShowMoreButton] = useState(false);

  const handleOnNewRef = (element: HTMLDivElement | null) => {
    if (element) {
      const { clientHeight } = element;
      setNeedsShowMoreButton(clientHeight > 108);
    }
  };

  const toggleContent = () => {
    setShowFullContent((prev) => !prev);
  };

  return (
    <Container>
      <AnimatePresence>
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
                    <AccordionText>Read less</AccordionText>
                    <Icon data={arrow_drop_up} />
                  </>
                ) : (
                  <>
                    <AccordionText>Read more</AccordionText>
                    <Icon data={arrow_drop_down} />
                  </>
                )}
              </Button>
            )}
          </BtnContainer>
        </motion.div>
      </AnimatePresence>
    </Container>
  );
};

export default ReleasePost;
