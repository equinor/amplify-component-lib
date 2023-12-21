import { FC, useState } from 'react';

import { Divider, Icon, Typography } from '@equinor/eds-core-react';
import { arrow_forward } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { fallback } from '../../../../Icons/ApplicationIcon/ApplicationIconCollection';

import styled from 'styled-components';

const { spacings, colors, shape } = tokens;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 8px;
  text-decoration: none;
  gap: ${spacings.comfortable.medium};
  cursor: pointer;
  margin-bottom: ${spacings.comfortable.medium};

  &:hover {
    background-color: #f7f7f7;
    border-radius: ${shape.corners.borderRadius};
  }
`;

const ContentInfo = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  width: 100%;
  align-items: center;
  gap: ${spacings.comfortable.medium_small};
`;

interface TutorialDialogProps {
  description: string;
  steps: string;
  duration: string;
}

const TutorialDialog: FC<TutorialDialogProps> = ({
  description,
  steps,
  duration,
}) => {
  // TODO: FIX LOGIC AND HOW TO SEND IN TUTORIALS
  const [currentPage, setCurrentPage] = useState(true);
  const [otherPages, setOtherPages] = useState(false);

  return (
    <Wrapper>
      {currentPage && (
        <>
          <Typography style={{ fontSize: '10px' }}>ON CURRENT PAGE </Typography>
          <ContentInfo>
            <Icon data={fallback} />
            <div>
              <Typography group="paragraph" variant="caption">
                {' '}
                {description}
              </Typography>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Typography
                  group="navigation"
                  variant="label"
                  color={colors.text.static_icons__secondary.hex}
                >
                  {steps}
                </Typography>
                <Typography
                  group="navigation"
                  variant="label"
                  color={colors.text.static_icons__secondary.hex}
                >
                  {duration}
                </Typography>
              </div>
            </div>
            <Icon
              data={arrow_forward}
              size={24}
              color={colors.interactive.primary__resting.hsla}
            />
          </ContentInfo>
        </>
      )}
      {otherPages && (
        <>
          <Typography style={{ fontSize: '10px' }}>ON OTHER PAGES </Typography>
          <ContentInfo>
            <Icon data={fallback} />
            <div>
              <Typography group="paragraph" variant="caption">
                {description}
              </Typography>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Typography
                  group="navigation"
                  variant="label"
                  color={colors.text.static_icons__secondary.hex}
                >
                  {steps}
                </Typography>
                <Typography
                  group="navigation"
                  variant="label"
                  color={colors.text.static_icons__secondary.hex}
                >
                  {duration}
                </Typography>
              </div>
            </div>
            <Icon
              data={arrow_forward}
              size={24}
              color={colors.interactive.primary__resting.hsla}
            />
          </ContentInfo>
        </>
      )}
    </Wrapper>
  );
};

export default TutorialDialog;
