import { FC } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { arrow_forward } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { tutorialOptions } from './TutorialInfoDialog';
import { FeedBackIcon } from 'src/molecules/FeedBackIcon/FeedBackIcon';

import styled from 'styled-components';

const { spacings, colors, shape } = tokens;

const ContentInfo = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  width: 100%;
  align-items: center;
  gap: ${spacings.comfortable.medium_small};
  padding: ${spacings.comfortable.small};
  &:hover {
    background-color: #f7f7f7;
    border-radius: ${shape.corners.borderRadius};
  }
`;

export const TutorialItem: FC<tutorialOptions> = ({
  onClick,
  description,
  steps,
  duration,
}) => {
  return (
    <ContentInfo onClick={onClick}>
      <FeedBackIcon name="positive" variant="filled" />
      <div>
        <Typography group="paragraph" variant="caption">
          {description}
        </Typography>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Typography
            group="navigation"
            variant="label"
            color={colors.text.static_icons__secondary.rgba}
          >
            {steps}
          </Typography>
          <Typography
            group="navigation"
            variant="label"
            color={colors.text.static_icons__secondary.rgba}
          >
            {duration}
          </Typography>
        </div>
      </div>
      <Icon
        data={arrow_forward}
        size={24}
        color={colors.interactive.primary__resting.rgba}
      />
    </ContentInfo>
  );
};
