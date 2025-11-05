import { type FC, useRef, useState } from 'react';

import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { chevron_down, chevron_up } from '@equinor/eds-icons';
import { FaqService } from '@equinor/subsurface-app-management';
import { useLocation } from '@tanstack/react-router';

import { FaqDto } from '../../Faq.utils';
import {
  Container,
  ExpandWrapper,
  Header,
  TopRight,
  Wrapper,
} from './Question.styles';
import { formatDate } from 'src/atoms';
import { usePrefetchRichTextImages } from 'src/atoms/hooks/usePrefetchRichTextImages';
import { RichTextDisplay } from 'src/molecules';

import { AnimatePresence } from 'framer-motion';

export const Question: FC<FaqDto> = ({ id, question, createdDate, answer }) => {
  usePrefetchRichTextImages({
    richTextValues: [answer ?? ''],
    onImageRead: (path) => FaqService.getFaqImage(path),
  });
  const { hash } = useLocation();
  const initialHeight = useRef(hash.includes(id.toString()) ? 'auto' : 0);
  const [expanded, setExpanded] = useState(hash.includes(id.toString()));

  const handleOnToggleExpanded = () => {
    if (initialHeight.current === 'auto') {
      initialHeight.current = 0;
    }
    setExpanded((prev) => !prev);
  };

  return (
    <Wrapper>
      <Container>
        <Header>
          <Typography id={`faq-${id}`} variant="h4">
            {question}
          </Typography>
        </Header>
        <TopRight>
          <Typography group="paragraph" variant="caption">
            {formatDate(createdDate)}
          </Typography>
          <Button
            variant="ghost_icon"
            onClick={handleOnToggleExpanded}
            data-testid="toggle-open"
            aria-label={
              expanded
                ? `Collapse answer to: ${question}`
                : `Expand answer to: ${question}`
            }
          >
            <Icon data={expanded ? chevron_up : chevron_down} />
          </Button>
        </TopRight>
        <AnimatePresence>
          {expanded && (
            <ExpandWrapper
              initial={{ height: initialHeight.current }}
              exit={{ height: 0 }}
              animate={{ height: 'auto' }}
            >
              <RichTextDisplay
                value={answer}
                onImageRead={(path) => FaqService.getFaqImage(path)}
                padding="none"
              />
            </ExpandWrapper>
          )}
        </AnimatePresence>
      </Container>
    </Wrapper>
  );
};
