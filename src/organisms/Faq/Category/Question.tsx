import { FC, useState } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { chevron_down, chevron_up } from '@equinor/eds-icons';
import { Faq, FaqService } from '@equinor/subsurface-app-management';

import { animation, colors, shape, spacings } from 'src/atoms/style';
import { formatDate } from 'src/atoms/utils/date';
import { Button } from 'src/molecules/Button/Button';
import { RichTextDisplay } from 'src/molecules/RichTextDisplay/RichTextDisplay';

import { AnimatePresence, motion } from 'motion/react';
import styled from 'styled-components';

const Container = styled.div`
  background: ${colors.ui.background__default.rgba};
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  padding: ${spacings.medium};
  border: 1px solid ${colors.ui.background__heavy.rgba};
  border-radius: ${shape.corners.borderRadius};
  cursor: pointer;
  transition: border-color ${animation.transitionMS};
  > button {
    margin-left: ${spacings.medium};
    transition: background ${animation.transitionMS};
  }
  &:hover {
    border-color: ${colors.interactive.primary__resting.rgba};
    > button {
      background: ${colors.interactive.primary__hover_alt.rgba};
    }
  }
`;

export const Question: FC<Faq> = ({ question, answer, createdDate }) => {
  const [open, setOpen] = useState(false);
  const handleOnToggleOpen = () => setOpen((prev) => !prev);

  return (
    <Container onClick={handleOnToggleOpen}>
      <Typography variant="h4">{question}</Typography>
      <Typography variant="caption">{formatDate(createdDate)}</Typography>
      <Button variant="ghost_icon">
        <Icon data={open ? chevron_up : chevron_down} />
      </Button>
      <AnimatePresence>
        {open && (
          <motion.div
            style={{ overflow: 'hidden' }}
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
          >
            <RichTextDisplay
              value={answer}
              onImageRead={FaqService.getFaqImage}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};
