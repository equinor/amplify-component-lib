import { FC, useLayoutEffect, useRef, useState } from 'react';

import { Button as EDSbutton, Icon, Typography } from '@equinor/eds-core-react';
import { arrow_drop_down, arrow_drop_up } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import ReleaseNotesTypes from '../ReleaseNotesTypes/ReleaseNotesTypes';
import TextContent from '../TextContent';
import { ReleaseNote } from 'src/api/models/ReleaseNote';
import { date } from 'src/utils';

import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';

const { spacings, shape, elevation } = tokens;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: ${spacings.comfortable.xx_large};
  background-color: #fff;
  box-shadow: ${elevation.raised};
  border-radius: ${shape.corners.borderRadius};
  overflow: hidden;
  max-width: 1100px;
  width: calc(100% - ${spacings.comfortable.xx_large} * 2);
`;

const TopContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  justify-items: end;
  padding-top: 0;
  padding-bottom: ${spacings.comfortable.medium_small};
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${spacings.comfortable.medium};
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${spacings.comfortable.small};
  align-items: center;
`;

const ReleaseNoteTypeContainer = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: 'Equionor', sans-serif;
  font-size: 16px;
  font-weight: 500;
  padding: 0px;

  > p {
    line-height: normal;
    height: min-content;
  }
`;

interface BtnContainerProps {
  $open: boolean;
}

const BtnContainer = styled.div<BtnContainerProps>`
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: ${spacings.comfortable.large};
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 20%
  );
  // Remove padding when setting width
  width: calc(100% - (${spacings.comfortable.large}) * 2);
`;

const Button = styled(EDSbutton)`
  width: auto;
  font-size: 14px;
  padding: ${spacings.comfortable.small};
  border-radius: 5px;
  &:hover {
    border-radius: 5px;
    align-items: center;
  }
`;

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
