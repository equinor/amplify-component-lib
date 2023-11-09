import { FC, useLayoutEffect, useRef, useState } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { arrow_drop_down, arrow_drop_up } from '@equinor/eds-icons';

import ReleaseNotesTypes from '../ReleaseNotesTypes/ReleaseNotesTypes';
import TextContent from '../TextContent';
import {
  BtnContainer,
  Button,
  Container,
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
  const [contentHeight, setContentHeigt] = useState<number>(0);

  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.clientHeight;
      setContentHeigt(height);
    }
  }, [showFullContent]);

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
            <TitleContainer>
              <Typography group="paragraph" variant="overline">
                {date.formatDate(createdDate, {
                  format: 'DD. month YYYY',
                })}
              </Typography>
              <Typography group="paragraph" variant="overline">
                {version}
              </Typography>
            </TitleContainer>

            <RightContainer>
              {tags?.map((tag) => {
                return (
                  <ReleaseNoteTypeContainer key={tag}>
                    <ReleaseNotesTypes
                      name={tag}
                      active={true}
                      showIcon={false}
                    />
                  </ReleaseNoteTypeContainer>
                );
              })}
            </RightContainer>
          </TopContainer>
          <div style={{ marginBottom: '48px' }}>
            <Typography group="heading" variant="h3">
              {title}
            </Typography>
          </div>
          <div ref={contentRef} style={{ marginBottom: '50px' }}>
            <TextContent text={body ?? ''} />
          </div>
          <BtnContainer $open={contentHeight > 250}>
            {contentHeight > 250 && (
              <Button variant="ghost_icon" onClick={toggleContent}>
                {showFullContent ? (
                  <>
                    <Typography style={{ fontSize: '14px' }} color=" #007079">
                      Read less
                    </Typography>
                    <Icon data={arrow_drop_up} />
                  </>
                ) : (
                  <>
                    <Typography style={{ fontSize: '14px' }} color=" #007079;">
                      Read more
                    </Typography>
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
